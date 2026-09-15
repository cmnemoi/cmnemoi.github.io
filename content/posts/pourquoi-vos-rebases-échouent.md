---
title: "Trois façons de rater un rebase (et la séquence que j'utilise)"
date: 2025-06-06T23:16:41+02:00
toc: false
images:
tags:
  - git
---

Un [rebase](https://git-scm.com/docs/git-rebase) rejoue les commits d'une branche par-dessus une autre, pour intégrer ses nouveautés sans commit de fusion. Les trois erreurs qui suivent concernent tout projet où les branches de fonctionnalité sont rebasées sur une branche principale : `develop` ici, souvent `main` ailleurs.

J'ai d'abord rédigé ces conseils pour les contributeurs d'[eMush](https://gitlab.com/eternaltwin/mush/mush), un jeu en ligne open source, avant de les compléter en juin 2025.

Prenons une branche `ma-branche`, créée à partir de `develop`. Pendant que nous travaillons dessus, d'autres merge requests sont fusionnées dans `develop`, et nous voulons les intégrer avant la relecture.

## Rebaser la bonne branche

`git rebase develop` rejoue les commits de la branche *courante* par-dessus `develop`. La commande doit donc être lancée depuis `ma-branche`. Lancée depuis `develop`, elle n'a aucun effet utile.

## Rebaser sur une version à jour de `develop`

Il est très possible que la copie locale de `develop` ne corresponde plus à celle du serveur. Il est plus sûr de rebaser sur `origin/develop`, une *branche de suivi distante* (*remote-tracking branch*) : la copie de l'état du serveur que le dernier `git fetch` a récupérée.

## Pousser depuis un terminal

J'ai ajouté ce point en juin 2025. Lorsque l'on pousse une branche rebasée avec le bouton d'un IDE (VSCode, PHPStorm…), je ne saurais pas expliquer précisément ce qu'il se passe. Je constate seulement que cela ne fonctionne pas : l'historique devient chaotique. Il faut donc impérativement pousser depuis un terminal.

## La séquence que j'utilise

```bash
git fetch
git checkout ma-branche
git rebase origin/develop
git push --force-if-includes --force-with-lease
```

D'après la [documentation de `git push`](https://git-scm.com/docs/git-push), `--force-with-lease` refuse la mise à jour si quelqu'un a poussé sur la branche distante depuis notre dernier `fetch`, et `--force-if-includes` exige en plus que l'état distant ait été intégré localement. Avec cette séquence, je n'ai jamais rencontré de problème.

Lorsqu'une branche contient beaucoup de commits, il m'est arrivé de les regrouper d'abord en un seul avec un rebase interactif (`git rebase -i`), pour avoir moins de conflits à résoudre.

## Références

- *git-rebase*, documentation officielle de Git. https://git-scm.com/docs/git-rebase
- *git-push*, documentation officielle de Git. https://git-scm.com/docs/git-push
