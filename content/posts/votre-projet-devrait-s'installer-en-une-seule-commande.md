---
title: "Votre projet devrait s’installer en une seule commande"
date: 2025-10-18T14:58:46+02:00
draft: true
toc: false
images:
tags:
  - devops
  - software-engineering
  - open-source
---

Faciliter l’installation d’un projet est souvent perçu comme un détail.
En réalité, c’est un levier essentiel pour améliorer la qualité globale de vos développements.

Lorsqu’un nouveau collègue tente de lancer votre projet pour la première fois, chaque étape supplémentaire est une opportunité de friction.

Réduire cette friction n’est pas un luxe.
C’est un signe de professionnalisme — et un facteur clé de productivité.

---

## Le paradoxe du développeur

Notre métier consiste précisément à automatiser des traitements.
Pourtant, combien de projets affichent encore des instructions d’installation longues et manuelles ?

Nous passons des heures à optimiser nos architectures, à rendre notre produit final le plus fluide possible pour l’utilisateur…
Mais nous oublions parfois que nos premiers utilisateurs sont aussi nos collègues, ou même nous-mêmes lors d’un changement de poste de travail.

Le soin que nous mettons à concevoir notre produit doit également s’appliquer à l’expérience développeur.

---

## Une problématique rencontrée sur le terrain

Lorsque j’ai rejoint le projet [eMush](https://gitlab.com/eternaltwin/mush/mush/), un jeu open source que je développe depuis 3 ans, l’installation était un véritable frein.

Comme souvent sur un projet vivant, les solutions se sont construites par itérations.
Voici le chemin que nous avons parcouru — avec, à chaque étape, des enseignements qui je l'espère sont applicables à d’autres contextes.

---

## Phase 1 — L’installation manuelle

Initialement, tout devait être installé et configuré à la main, avec une documentation partielle.

Concrètement :

**👉 PHP :**

* installation de PHP lui-même
* installation des bonnes extensions (`pdo_pgsql`, `intl`, `mbstring`, etc.)
* configuration du `php.ini` (timezone, `memory_limit`, etc.)
* ajout de PHP au `PATH` du système
* installation de Composer
* résolution des dépendances PHP avec Composer

**👉 Node.js :**

* installation de Node.js et NPM
* installation de Yarn
* installation du front-end
* installation et configuration d’un serveur d’authentification séparé

**👉 PostgreSQL :**

* installation de PostgreSQL
* création des utilisateurs
* création de deux bases de données (développement + tests)
* configuration des permissions nécessaires
* adaptation éventuelle du fichier `pg_hba.conf` pour autoriser les connexions

Chaque contributeur devait réaliser manuellement ces étapes — avec des risques d’oublis ou de divergences en fonction des plateformes et des versions.

Résultat :

* des erreurs subtiles liées aux différences de configuration
* des incompatibilités entre versions de dépendances
* du temps perdu à déboguer l’environnement plutôt que le code
* un onboarding lent et fragile pour chaque nouveau contributeur

---

## Phase 2 — Introduction de Docker

Pour homogénéiser l’environnement, nous avons introduit Docker.

Cela a permis d’éliminer de nombreuses différences entre les machines.

Mais l’installation de Docker elle-même n’était pas triviale, en particulier sur Windows (WSL2, différences de versions, problèmes de permissions...).
Les nouveaux contributeurs pouvaient encore rencontrer des blocages dès les premières étapes.

---

## Phase 3 — Documentation détaillée

Nous avons donc renforcé la documentation :

* prérequis précis
* vérification des environnements
* astuces spécifiques selon les plateformes

Le processus est devenu plus fiable, mais restait encore composé de plusieurs commandes successives.
À ce stade, chaque nouvel arrivant devait suivre une checklist relativement longue.

---

## Phase 4 — Vers l’automatisation complète

L’étape suivante était logique : pourquoi ne pas automatiser l’ensemble du processus ?

Nous avons conçu un script d’installation complet :

```bash
curl -sSL https://gitlab.com/eternaltwin/mush/mush/-/raw/develop/clone_and_docker_install.sh?ref_type=heads | bash
```

Ce script :

* clone le repository
* vérifie les prérequis
* configure Docker
* initialise la base de données
* construit les assets
* lance l’application

Aujourd’hui, un nouvel arrivant peut disposer d’un environnement fonctionnel en quelques minutes, avec une seule commande.

---

## Une approche pragmatique

Bien entendu, cette solution n’est pas encore universelle.

* Le script “one-line install” fonctionne aujourd’hui sur Ubuntu (y compris via WSL2 sur Windows).
* Un script PowerShell est disponible pour Windows natif.
* Nous travaillons à élargir le support multi-distributions.

Même partiellement déployée, cette automatisation a déjà permis de :

* réduire le temps moyen d’installation,
* améliorer la cohérence des environnements,
* simplifier le support aux nouveaux contributeurs.

---

## Pourquoi viser une installation en une commande ?

Trois bénéfices majeurs :

**1️⃣ Réduction de la friction**
Faciliter l’arrivée des nouveaux contributeurs ou développeurs.

**2️⃣ Standardisation des environnements**
Minimiser les écarts entre postes de développement.

**3️⃣ Cohérence avec nos pratiques professionnelles**
Nous automatisons nos tests, nos déploiements, nos intégrations continues.
L’installation locale mérite la même rigueur.

---

## Docker est-il obligatoire ?

Non. Docker est un outil parmi d’autres.

* Si votre stack est homogène (ex. 100% JavaScript), des scripts CLI natifs peuvent suffire.
* Si plusieurs technologies coexistent, Docker apporte un réel bénéfice en termes de standardisation.

Quelle que soit la solution technique, l’objectif reste le même :
**proposer une installation simple, fiable et reproductible.**

---

## En résumé

Votre projet mérite une expérience d’installation à la hauteur de sa qualité technique.

Qu’il soit open source ou logiciel d’entreprise, viser une installation en une commande :

* facilite la prise en main,
* renforce la collaboration,
* et valorise le travail des équipes.

C’est un investissement modeste, aux bénéfices durables.

---

## Pour aller plus loin

Si vous souhaitez bénéficier de mon expertise sur ces sujets, l’ingénierie logicielle, en machine learning ou en IA générative, n’hésitez pas à me contacter.

Je me ferai un plaisir d’échanger avec vous sur ces sujets — et de vous aider à renforcer vos pratiques.
