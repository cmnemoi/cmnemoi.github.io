---
title: "Vos rebases échouent ? Le rebase n’y est pas toujours pour quelque chose"
date: 2025-06-06T23:16:41+02:00
description: "Trois erreurs qui font échouer le rebase d’une branche, dont une que je ne sais toujours pas expliquer, et les quatre commandes que j’utilise."
toc: false
images:
tags:
  - git
---

Pendant près de trois ans, j'ai vu des contributeurs expérimentés finir avec un historique incohérent après un rebase, sans comprendre pourquoi. Et je ne sais toujours pas l'expliquer entièrement 😅

Le scénario est toujours le même. Vous rebasez votre branche sur `develop`, vous poussez, et la merge request se retrouve avec des conflits imprévus et un historique chaotique.

Ça se passait sur [eMush](https://gitlab.com/eternaltwin/mush/mush), un jeu en ligne open source que je développe depuis 2022. Début 2024, j'ai rédigé pour les contributeurs une liste des erreurs qui mènent à ce résultat. Elle en comptait deux.

La troisième m'a pris bien plus de temps à trouver, parce que la cause n'était pas dans le rebase lui-même.

Prenons une branche `ma-branche`, créée à partir de `develop`. Pendant qu'on travaille dessus, d'autres merge requests sont fusionnées dans `develop`, et on veut les intégrer avant la relecture. C'est le rôle du [rebase](https://git-scm.com/docs/git-rebase) : rejouer les commits de `ma-branche` par-dessus la dernière version de `develop`, sans commit de fusion.

## Rebaser la bonne branche

`git rebase develop` rejoue les commits de la branche *courante* par-dessus `develop`. Il faut donc lancer la commande depuis `ma-branche`. Depuis `develop`, elle n'a aucun effet utile.

Et même lancée au bon endroit, elle rebase sur `develop` tel que votre machine le connaît.

## Rebaser sur une version à jour de `develop`

Votre copie locale de `develop` peut très bien ne plus correspondre à celle du serveur. Il est plus sûr de rebaser sur `origin/develop`, une *branche de suivi distante* (*remote-tracking branch*) : la copie de l'état du serveur récupérée par le dernier `git fetch`.

Une fois la branche rebasée, ses commits ont été réécrits. Un `git push` classique est refusé, il faut forcer la mise à jour de la branche distante.

C'est là que se produit la troisième erreur.

## Pousser depuis un terminal

Quand on pousse une branche rebasée avec le bouton d'un IDE (VSCode, PHPStorm…), je ne saurais pas dire précisément ce qu'il se passe. Je constate seulement que ça ne marche pas : l'historique devient chaotique.

Mon conseil : poussez toujours depuis un terminal.

## La séquence que j'utilise

```bash
git fetch
git checkout ma-branche
git rebase origin/develop
git push --force-if-includes --force-with-lease
```

Chaque commande écarte une des trois erreurs :
- `git fetch` met `origin/develop` à jour ;
- `git checkout` vous place sur la branche à rebaser ;
- le push forcé part d'un terminal.

D'après la [documentation de `git push`](https://git-scm.com/docs/git-push), `--force-with-lease` refuse la mise à jour si quelqu'un a poussé sur la branche distante depuis votre dernier `fetch`. `--force-if-includes` exige en plus que l'état distant ait été intégré localement.

Avec cette séquence, je n'ai jamais rencontré de problème.

## Et quand il y a trop de conflits

Sur une branche avec beaucoup de commits, cette séquence peut encore produire beaucoup de conflits à résoudre. Ça m'est arrivé sur une branche de plus de 200 commits.

J'ai d'abord regroupé les commits en un seul avec un rebase interactif (`git rebase -i`), pour avoir moins de conflits. C'est sur cette branche que j'ai vraiment appris à maîtriser le rebase.

Si vous tombez sur un problème de Git que cet article ne couvre pas, ou si vous voulez parler d'ingénierie logicielle, de ML engineering ou d'IA générative, écrivez-moi sur [LinkedIn](https://www.linkedin.com/in/madi-mnemoi-charles-meldhine-python/).

## Références

- *git-rebase*, documentation officielle de Git. https://git-scm.com/docs/git-rebase
- *git-push*, documentation officielle de Git. https://git-scm.com/docs/git-push
