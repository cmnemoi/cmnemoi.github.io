---
title: "Pourquoi vos rebases échouent (et comment les réussir) ?"
date: 2025-06-06T23:16:41+02:00
description: "Trois erreurs qui font échouer le rebase d'une branche, dont une que je ne sais toujours pas expliquer, et les quatre commandes que j'utilise."
toc: false
images:
tags:
  - git
---

Vous rebasez votre branche sur `develop`, vous poussez, et la merge request se retrouve avec des conflits imprévus et un historique chaotique.

Sur [eMush](https://gitlab.com/eternaltwin/mush/mush), un jeu en ligne open source que je développe depuis 2022, j'ai rédigé début 2024 pour les contributeurs une liste des erreurs qui mènent à ce résultat. Elle en comptait deux. La troisième m'a pris bien plus de temps : pendant près de trois ans, j'ai vu des contributeurs expérimentés obtenir un historique incohérent après un rebase sans comprendre pourquoi. La cause ne se trouvait pas dans le rebase lui-même, et je ne sais toujours pas l'expliquer entièrement.

Prenons une branche `ma-branche`, créée à partir de `develop`. Pendant que nous travaillons dessus, d'autres merge requests sont fusionnées dans `develop`, et nous voulons les intégrer avant la relecture. C'est le rôle du [rebase](https://git-scm.com/docs/git-rebase) : rejouer les commits de `ma-branche` par-dessus la dernière version de `develop`, sans commit de fusion.

## Rebaser la bonne branche

`git rebase develop` rejoue les commits de la branche *courante* par-dessus `develop`. La commande doit donc être lancée depuis `ma-branche`. Lancée depuis `develop`, elle n'a aucun effet utile.

Même lancée au bon endroit, la commande rebase sur `develop` tel que votre machine le connaît.

## Rebaser sur une version à jour de `develop`

Il est très possible que la copie locale de `develop` ne corresponde plus à celle du serveur. Il est plus sûr de rebaser sur `origin/develop`, une *branche de suivi distante* (*remote-tracking branch*) : la copie de l'état du serveur que le dernier `git fetch` a récupérée.

Une fois la branche rebasée, ses commits ont été réécrits. Un `git push` classique est refusé, et il faut forcer la mise à jour de la branche distante. C'est à ce moment que se produit la troisième erreur.

## Pousser depuis un terminal

Lorsque l'on pousse une branche rebasée avec le bouton d'un IDE (VSCode, PHPStorm…), je ne saurais pas expliquer précisément ce qu'il se passe. Je constate seulement que cela ne fonctionne pas : l'historique devient chaotique. Il faut donc impérativement pousser depuis un terminal.

## La séquence que j'utilise

```bash
git fetch
git checkout ma-branche
git rebase origin/develop
git push --force-if-includes --force-with-lease
```

Chaque commande écarte l'une des trois erreurs. `git fetch` met `origin/develop` à jour, `git checkout` place sur la branche à rebaser, et le push forcé part d'un terminal.

D'après la [documentation de `git push`](https://git-scm.com/docs/git-push), `--force-with-lease` refuse la mise à jour si quelqu'un a poussé sur la branche distante depuis notre dernier `fetch`, et `--force-if-includes` exige en plus que l'état distant ait été intégré localement. Avec cette séquence, je n'ai jamais rencontré de problème.

Lorsqu'une branche contient beaucoup de commits, cette séquence peut encore produire beaucoup de conflits à résoudre. C'est ce qui m'est arrivé sur une branche de plus de 200 commits : j'ai d'abord regroupé les commits en un seul avec un rebase interactif (`git rebase -i`), pour avoir moins de conflits. C'est sur cette branche que j'ai vraiment appris à maîtriser le rebase.

Si vous rencontrez un problème de Git que cet article ne couvre pas, ou si vous voulez échanger sur l'ingénierie logicielle, le ML engineering ou l'IA générative, vous pouvez me contacter sur [LinkedIn](https://www.linkedin.com/in/madi-mnemoi-charles-meldhine-python/).

## Références

- *git-rebase*, documentation officielle de Git. https://git-scm.com/docs/git-rebase
- *git-push*, documentation officielle de Git. https://git-scm.com/docs/git-push
