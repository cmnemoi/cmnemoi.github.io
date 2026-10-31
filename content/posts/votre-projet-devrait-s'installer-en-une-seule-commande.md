---
title: "Votre projet devrait s’installer en une seule commande"
date: 2025-10-18T14:58:46+02:00
description: "Comment l'installation d'eMush est passée de trois technologies configurées à la main à une seule commande, et ce que Docker n'a pas réglé."
toc: false
tags:
  - devops
  - software-engineering
  - open-source
---

Quand j'ai rejoint [eMush](https://gitlab.com/eternaltwin/mush/mush), un jeu en ligne open source que je développe depuis 2022, installer le projet était un vrai frein : PHP, Node.js et PostgreSQL à installer et configurer à la main. Aujourd'hui, ça tient en une commande.

Entre les deux, on a essayé Docker, puis une documentation détaillée. Aucun des deux n'a suffi. Et ce qui leur manquait montre assez bien où se cache le vrai coût d'une installation manuelle.

Vous connaissez sûrement la scène. Une nouvelle personne rejoint l'équipe, clone le projet, ouvre le README et commence une liste d'instructions à suivre à la main. Chaque étape est une occasion de se tromper, et sa première journée passe à déboguer son environnement plutôt que le code.

On automatise pourtant nos tests, nos déploiements et notre intégration continue. Alors pourquoi pas l'installation ?

## Tout installer à la main

Au départ, tout s'installait et se configurait à la main, avec une documentation partielle.

Pour PHP :

- installer PHP et les bonnes extensions (`pdo_pgsql`, `intl`, `mbstring`, etc.) ;
- configurer le `php.ini` (timezone, `memory_limit`, etc.) et ajouter PHP au `PATH` ;
- installer Composer, puis résoudre les dépendances du projet.

Pour Node.js :

- installer Node.js, NPM et Yarn ;
- installer le front-end ;
- installer et configurer un serveur d'authentification séparé.

Pour PostgreSQL :

- installer PostgreSQL et créer les utilisateurs ;
- créer deux bases de données, l'une pour le développement, l'autre pour les tests ;
- configurer les permissions, et adapter si besoin le `pg_hba.conf` pour autoriser les connexions.

Chaque contributeur refaisait ces étapes sur sa machine, avec sa plateforme et ses versions. Les erreurs étaient subtiles : un écart de configuration, une version de dépendance incompatible.

Résultat : on déboguait l'environnement au lieu du code, et chaque arrivée était lente et fragile.

Le problème, pour moi, est là : chaque étape faite à la main est un endroit où deux machines peuvent diverger. C'est cette divergence que les étapes suivantes ont essayé de réduire.

## Docker

Pour homogénéiser l'environnement, on a introduit Docker. PHP, Node.js et PostgreSQL tournent alors dans les mêmes conteneurs pour tout le monde, et beaucoup de différences entre machines disparaissent.

Sauf que la divergence s'est déplacée vers l'installation de Docker elle-même. Et elle n'avait rien de trivial, en particulier sous Windows (WSL2, différences de versions, problèmes de permissions…). Un nouveau contributeur pouvait encore rester bloqué dès les premières commandes.

## Documenter

On a donc renforcé la documentation : prérequis précis, vérifications de l'environnement, astuces propres à chaque plateforme. Le processus est devenu plus fiable.

Mais il restait une checklist assez longue, faite de commandes successives. La documentation rendait chaque étape plus sûre sans en retirer aucune. Et c'était toujours la personne qui arrivait qui les exécutait.

## Une seule commande

L'étape suivante : confier ces commandes à un script. Sur Ubuntu, l'installation d'eMush tient aujourd'hui en une ligne :

```bash
curl -sSL https://gitlab.com/eternaltwin/mush/mush/-/raw/main/clone_and_docker_install.sh?ref_type=heads | bash
```

Ce script vérifie que `git` et `curl` sont présents, clone le dépôt, puis lance `docker_install.sh`. Ce second script installe Docker, prépare les variables d'environnement, construit les images, installe le back-end, le front-end et le serveur d'authentification, puis initialise les bases de données.

Le blocage de la phase Docker a donc disparu : installer Docker n'est plus un prérequis, c'est une étape du script. Une nouvelle personne a un environnement fonctionnel en quelques minutes.

Ce n'est pas universel pour autant. Le script marche sur Ubuntu, y compris via WSL2 sous Windows, et un script PowerShell existe pour Windows natif. D'autres distributions restent à couvrir.

Même partielle, cette automatisation a déjà réduit le temps d'installation, rendu les environnements plus cohérents et simplifié l'aide apportée aux nouveaux contributeurs.

## Et sans Docker ?

Docker n'est pas obligatoire. Il a été utile sur eMush parce que plusieurs technologies y cohabitent. Sur une stack homogène, par exemple entièrement en JavaScript, des scripts natifs peuvent suffire.

Par défaut, je viserais donc une installation en une seule commande. L'outil dépend de la stack : Docker quand plusieurs technologies cohabitent, un script natif sinon.

Et tant que le script ne couvre pas toutes les plateformes, la documentation reste nécessaire pour les autres.

Si vous voulez simplifier l'installation de votre projet, ou parler d'ingénierie logicielle, de ML engineering ou d'IA générative, écrivez-moi sur [LinkedIn](https://www.linkedin.com/in/madi-mnemoi-charles-meldhine-python/).

## Références

- eMush, *README*, GitLab. https://gitlab.com/eternaltwin/mush/mush
