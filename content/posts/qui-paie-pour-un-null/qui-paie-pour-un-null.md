---
title: "Qui paie pour un null ?"
date: 2026-09-15T12:00:00+02:00
description: "Une fonction d'eMush de dix lignes qui peut planter en production, et trois façons de traiter un `null` : le vérifier, lever une exception ou renvoyer un objet par défaut."
toc: false
tags:
  - php
  - software-engineering
---

Dix lignes de PHP, rien d'anormal à la lecture. Et pourtant, elles peuvent faire planter le jeu en production.

Elles viennent d'eMush, un jeu multijoueur open source écrit en PHP. Leur dernière version ne contient plus aucune vérification de `null`, alors qu'un joueur peut toujours ne pas avoir la compétence qu'elles cherchent.

Le point de départ, c'est une discussion sur le Discord du projet, en juillet 2024. Un contributeur se demandait si on cherchait toujours à se passer de `null`, et un autre pensait que j'étais revenu sur cette décision.

Absolument pas.

Le problème est simple. Une méthode de recherche qui ne trouve rien renvoie souvent `null`. Chaque fonction qui l'appelle doit alors s'en souvenir, et rien, dans son propre code, ne le lui rappelle.

Alors, combien ce `null` coûte-t-il à chaque appelant ? Et comment le traiter quand l'absence de la valeur fait partie des règles ? 🤔

## Une fonction sans rien d'anormal

Cette fonction renvoie le coût en points de compétence d'une action, ou `null` si l'action n'en coûte pas :

```php
private function getSkillPointCost(Player $currentPlayer, ActionConfig $action, ActionSkillPointRule $skillPointCostRule): ?int
{
    $skill = $currentPlayer->getSkillByName($skillPointCostRule->skill);
    if ($skill->getSkillPoints() > 0) {
        return 1;
    }

    return null;
}
```

À la lecture, aucun problème. Sauf que `getSkillByName` renvoie `null` quand le joueur n'a pas la compétence demandée. L'appel à `getSkillPoints()` échoue, et le jeu plante en production.

Ce genre de plantage est déjà arrivé sur eMush.

C'est le premier coût de `null` : l'absence sort de `getSkillByName` et voyage jusqu'à l'appelant, sans que rien, dans ces dix lignes, ne la signale.

## Vérifier `null` dans l'appelant

Un analyseur statique comme [Psalm](https://psalm.dev/) détecte cette erreur. La correction la plus directe : vérifier que la compétence n'est pas `null`.

```php
private function getSkillPointCost(Player $currentPlayer, ActionConfig $action, ActionSkillPointRule $skillPointCostRule): ?int
{
    $skill = $currentPlayer->getSkillByName($skillPointCostRule->skill);
    if ($skill != null && $skill->getSkillPoints() > 0) {
        return 1;
    }

    return null;
}
```

Depuis PHP 8, l'[opérateur *nullsafe*](https://www.php.net/manual/fr/language.oop5.basic.php#language.oop5.basic.nullsafe) `?->` écrit la même vérification de façon un peu plus lisible. Si l'objet est `null`, l'appel renvoie `null` au lieu d'échouer.

```php
private function getSkillPointCost(Player $currentPlayer, ActionConfig $action, ActionSkillPointRule $skillPointCostRule): ?int
{
    $skill = $currentPlayer->getSkillByName($skillPointCostRule->skill);
    if ($skill?->getSkillPoints() > 0) {
        return 1;
    }

    return null;
}
```

Ici, la vérification ne gêne pas trop la lecture. Selon les règles du jeu, un joueur peut très bien ne pas avoir la compétence demandée : `$skill` est parfois `null`, et le code le dit.

Le plantage a disparu. Mais la vérification reste à écrire et à relire dans chaque fonction qui appelle `getSkillByName`. Psalm l'impose, `?->` la raccourcit, aucun des deux ne la supprime.

Que l'outil force à traiter le cas n'est d'ailleurs pas mon argument principal. Ce qui compte pour moi, c'est de garder ces vérifications aux seuls endroits où elles sont indispensables, pour que le code reste simple à comprendre.

Et quand `null` n'est pas censé arriver, la vérification coûte encore plus cher.

## Quand l'absence n'est pas prévue

Si on ne s'attend pas à `null`, il faut lever soi-même une exception, pour déboguer ou pour informer l'utilisateur. C'est ce que fait l'action `Land`, qui fait atterrir un patrouilleur dans le vaisseau :

```php
protected function applyEffect(ActionResult $result): void
{
    $patrolShip = $this->target;

    $daedalus = $patrolShip->getDaedalus();

    $patrolShipMechanic = $patrolShip->getMechanicByName(EquipmentMechanicEnum::PATROL_SHIP);
    if ($patrolShipMechanic === null) {
        throw new \RuntimeException('Patrol ship mechanic not found');
    }

    $patrolShipDockingPlace = $daedalus->getPlaceByName($patrolShipMechanic->getDockingPlace());
    if ($patrolShipDockingPlace === null) {
        throw new \RuntimeException('Docking place not found');
    }

    // ...make patrol ship land
}
```

La moitié de la méthode vérifie des cas qui ne devraient jamais arriver. C'est ce qui me gêne : on ne voit plus l'atterrissage.

Voici la même action, quand les méthodes de recherche lèvent elles-mêmes l'exception :

```php
protected function applyEffect(ActionResult $result): void
{
    $patrolShip = $this->target;

    $daedalus = $patrolShip->getDaedalus();

    $patrolShipMechanic = $patrolShip->getMechanicByNameOrThrow(EquipmentMechanicEnum::PATROL_SHIP);
    $patrolShipDockingPlace = $daedalus->getPlaceByNameOrThrow($patrolShipMechanic->getDockingPlace());

    // ...make patrol ship land
}
```

`getMechanicByNameOrThrow` fait la même recherche que `getMechanicByName`, mais lève une exception au lieu de renvoyer `null`. L'échec reste immédiat et visible, comme le veut le principe du [*fail fast*](https://www.martinfowler.com/ieeeSoftware/failFast.pdf).

Ce qui change, c'est l'endroit où l'absence est traitée : une fois, dans la méthode qui cherche la valeur, et plus dans chaque action qui l'utilise.

Cette solution convient à une absence anormale. Pas à `getSkillPointCost`, où un joueur sans la compétence est un cas prévu : lever une exception y interromprait une action parfaitement légitime.

## Revenir à la compétence absente

Dans beaucoup de cas, `null` est inutile. Au lieu de `null`, le joueur pourrait renvoyer une compétence « par défaut », qui remplit la même fonction sans ses inconvénients. C'est le patron de conception [*Null Object*](https://en.wikipedia.org/wiki/Null_object_pattern) :

```php
public function getSkillByNameOrDefault(SkillEnum $skillName): Skill
{
    return $this->skills->filter(fn (Skill $skill) => $skill->getName() === $skillName)->first() ?? new Skill(SkillEnum::NULL); // ou Skill::createDefault() / Skill::createNull()
}
```

`getSkillPointCost` devient :

```php
private function getSkillPointCost(Player $currentPlayer, ActionConfig $action, ActionSkillPointRule $skillPointCostRule): ?int
{
    $skill = $currentPlayer->getSkillByNameOrDefault($skillPointCostRule->skill);
    if ($skill->getSkillPoints() > 0) {
        return 1;
    }

    return null;
}
```

On peut imaginer que les valeurs par défaut de `Skill` lui donnent zéro point de compétence. Tout continue alors de fonctionner, sans risque de plantage en production et sans vérification de `null`.

À un nom de méthode près, c'est la toute première version. Le code qu'on voulait écrire au départ.

L'absence est toujours là, mais elle est traitée une fois, dans `getSkillByNameOrDefault`. Plus aucun appelant n'en paie le prix.

## Choisir la valeur par défaut dès l'entité

Le même raisonnement vaut plus en amont, quand on définit les attributs d'une entité. Il faut souvent se demander si `null` est la seule valeur par défaut possible. Le nom d'une compétence, par exemple, peut être une chaîne vide (`''`) plutôt que `null`.

Après quelques tests, je ne vois que les attributs qui pointent vers d'autres entités pour lesquels `null` est obligatoire, à cause de l'ORM.

## Où garder `null`

Vingt minutes après la discussion, le contributeur qui avait posé la question annonçait avoir remplacé ce qu'il aurait mis à `null` par une entité avec des paramètres par défaut.

Je pense donc qu'il faut éviter `null` le plus en amont possible, en cherchant des valeurs par défaut non `null` pour les entités. Quand une recherche peut échouer, l'absence se traite dans la méthode de recherche elle-même :
- une exception si elle est anormale ;
- un objet par défaut si les règles la prévoient.

Et si on utilise `null`, je le garde dans les parties techniques de l'application, comme l'infrastructure ou les relations qu'impose l'ORM. Loin du code métier, qui est déjà assez complexe comme ça.

![À gauche, le code technique (base de données, entités, repositories), où `null` est admis. À droite, le code métier (services, actions, contrôleurs), où il est interdit. Les méthodes getOrThrow et getOrDefault font passer les valeurs de l'un à l'autre.](schema-null.png)

Les méthodes `...OrThrow` et `...OrDefault` se trouvent exactement sur cette frontière. Ce sont elles qui transforment une valeur éventuellement `null` en une valeur que le code métier peut utiliser sans vérification.

Si vous voulez parler de la gestion de `null` dans votre code, d'ingénierie logicielle, de ML engineering ou d'IA générative, écrivez-moi sur [LinkedIn](https://www.linkedin.com/in/madi-mnemoi-charles-meldhine-python/).

## Références

- Psalm, *Psalm - a static analysis tool for PHP*, psalm.dev. https://psalm.dev/
- *Méthodes et propriétés nullsafe*, manuel PHP. https://www.php.net/manual/fr/language.oop5.basic.php#language.oop5.basic.nullsafe
- Jim Shore, *Fail Fast*, IEEE Software, 2004. https://www.martinfowler.com/ieeeSoftware/failFast.pdf
- *Null object pattern*, Wikipedia. https://en.wikipedia.org/wiki/Null_object_pattern
