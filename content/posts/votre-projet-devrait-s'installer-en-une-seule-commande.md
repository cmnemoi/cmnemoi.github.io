---
title: "Votre projet devrait s’installer en une seule commande"
date: 2025-10-18T14:58:46+02:00
toc: false
tags:
  - devops
  - software-engineering
  - open-source
---

Nous automatisons nos tests, nos déploiements et notre intégration continue. Sur bien des projets, l'installation locale reste pourtant une liste d'instructions à suivre à la main, et c'est souvent la première chose qu'un nouveau collègue rencontre. Chaque étape de cette liste est une occasion de se tromper.

Lorsque j'ai rejoint [eMush](https://gitlab.com/eternaltwin/mush/mush), un jeu en ligne open source que je développe depuis 2022, l'installation était un véritable frein. Elle s'est améliorée par itérations, et chacune a montré un peu mieux où se logeait le problème.

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

Chaque contributeur refaisait ces étapes sur sa machine, avec sa plateforme et ses versions. Les erreurs qui en résultaient étaient subtiles : un écart de configuration, une version de dépendance incompatible. Le temps passait à déboguer l'environnement plutôt que le code, et chaque arrivée était lente et fragile.

Chaque étape faite à la main est un endroit où deux machines peuvent diverger. C'est cette divergence que les phases suivantes ont essayé de réduire.

## Docker

Pour homogénéiser l'environnement, nous avons introduit Docker. PHP, Node.js et PostgreSQL tournent alors dans les mêmes conteneurs pour tout le monde, et beaucoup de différences entre machines disparaissent.

La divergence s'est pourtant déplacée vers l'installation de Docker elle-même, qui n'avait rien de trivial, en particulier sous Windows (WSL2, différences de versions, problèmes de permissions…). Un nouveau contributeur pouvait encore rester bloqué dès les premières commandes.

## Documenter

Nous avons donc renforcé la documentation : prérequis précis, vérifications de l'environnement, astuces propres à chaque plateforme. Le processus est devenu plus fiable.

Il restait toutefois une checklist relativement longue, faite de commandes successives. La documentation rendait chaque étape plus sûre sans en retirer aucune, et c'était toujours le nouvel arrivant qui les exécutait.

## Une seule commande

L'étape suivante consistait à confier ces commandes à un script. Sur Ubuntu, l'installation d'eMush tient aujourd'hui en une ligne :

```bash
curl -sSL https://gitlab.com/eternaltwin/mush/mush/-/raw/main/clone_and_docker_install.sh?ref_type=heads | bash
```

Ce script vérifie que `git` et `curl` sont présents, clone le dépôt, puis lance `docker_install.sh`. Ce second script installe Docker, prépare les variables d'environnement, construit les images, installe le back-end, le front-end et le serveur d'authentification, puis initialise les bases de données.

La difficulté de la phase Docker a donc disparu : installer Docker n'est plus un prérequis, c'est une étape du script. Un nouvel arrivant dispose d'un environnement fonctionnel en quelques minutes.

Cette automatisation n'est pas universelle. Le script fonctionne sur Ubuntu, y compris via WSL2 sous Windows, et un script PowerShell existe pour Windows natif. D'autres distributions restent à couvrir. Même partielle, elle a déjà réduit le temps d'installation, rendu les environnements plus cohérents et simplifié l'aide apportée aux nouveaux contributeurs.

## Et sans Docker ?

Docker n'est pas obligatoire. Il a été utile sur eMush parce que plusieurs technologies y cohabitent. Sur une stack homogène, par exemple entièrement en JavaScript, des scripts natifs peuvent suffire.

Je viserais donc, par défaut, une installation en une seule commande : chaque étape laissée au lecteur d'une documentation est une étape où sa machine peut diverger de la vôtre. L'outil dépend de la stack, Docker quand plusieurs technologies cohabitent, un script natif sinon. Et tant que le script ne couvre pas toutes les plateformes, la documentation reste nécessaire pour les autres.

## Références

- eMush, *README*, GitLab. https://gitlab.com/eternaltwin/mush/mush
