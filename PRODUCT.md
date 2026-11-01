# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, site statique. Articles en Markdown dans le repo, publiés par `git push`. Hébergement d'abord sur GitHub Pages (remplace cmnemoi.github.io), puis domaine à son nom avec redirection de l'ancien site.

## Users

Avatar (validé le 01/11/2026) : Digital Product Manager d'un assistant GenAI déjà en prod dans un grand groupe, profil d'origine technique. Il promet des dates qu'il ne maîtrise pas, avec une équipe qu'il n'a pas choisie, et craint pour son budget. Son critère : « livré ou pas, comme la hiérarchie l'attendait ». Moment critique : les deux dernières semaines du quarter. Son rêve : faire de l'assistant un vrai canal, pas un gadget. Il arrive souvent depuis LinkedIn.

## Product Purpose

Site personnel freelance de Charles-Meldhine Madi Mnemoi, ingénieur IA en micro-entreprise. Le site doit faire réserver un appel de 30 minutes (Calendly) en vue d'une mission. Il héberge aussi son blog technique et une sélection de ses posts LinkedIn.

## Positioning

Charles intervient après les premières mises en production d'un agent ou d'un produit IA. Son rôle : aider l'équipe à tenir le quarter. Cadrer (3 amigos, example mapping) pour éviter les surprises de fin de quarter, fiabiliser (tests, évaluation automatisée, CI) pour que les dates tiennent, puis accélérer. Accroche : livrer vite et bien, pas « apporter de la valeur ». La valeur client arrive en bonus. Un freelance qui livre prouve qu'avec les bonnes personnes ça va plus vite : un argument pour son prochain arbitrage budgétaire. Il traite un produit IA comme du logiciel : tests, évaluation automatisée, revue de code, inversion de dépendances, TDD (il évite le terme « Clean Architecture », trop clivant). Il a aussi mené une équipe open source (eMush) pendant plus de 3 ans.

## Operating Context

- Missions en temps plein, temps partiel ou forfait. À distance, ou hybride en Île-de-France / Hauts-de-France. Devis après l'appel, aucun tarif affiché.
- Actuellement en mission chez ADEO. Badge : « En mission · Prochaines disponibilités à discuter ».
- Contact : Calendly https://calendly.com/charlesmeldhine-madimnemoi/30min (CTA principal) et `mailto:` (pied de page).

## Capabilities and Constraints

- Pages : accueil, `/blog` (articles + posts LinkedIn intégrés en dessous), article, mentions légales.
- Accueil, dans l'ordre : hero, bandeau de chiffres, bande de logos clients qui défile, douleurs (4 citations), offre en 3 fronts + bloc Format, 2 études de cas, 6 témoignages + lien « 10+ témoignages supplémentaires sur LinkedIn », 3 derniers articles, CTA final.
- Navigation : Offre · Études de cas · Avis · Blog · bouton « Réserver un appel ».
- Posts LinkedIn : sélection manuelle, une URL de post par entrée, affichés en cartes (extrait + lien), sans iframe ni cookie tiers. Pas d'intégration sur l'accueil. Premier post : https://www.linkedin.com/feed/update/urn:li:share:7520767873213165569/
- Blog : coloration du code, RSS, temps de lecture, image OG par article, CTA en fin d'article. Pas de tags, pas de commentaires, pas de newsletter.
- Pas de FAQ. Pas d'outil de mesure d'audience. Pas de bandeau cookies.
- Langue : français uniquement.
- Mentions légales obligatoires (micro-entreprise) : nom, SIRET, adresse, hébergeur. SIRET 992 850 313 00014, adresse : Amiens (choix assumé par Charles).

## Brand Commitments

- Nom affiché : « Charles-Meldhine » (en-tête), « Charles-Meldhine Madi Mnemoi » (métadonnées, mentions légales). Titre : « Ingénieur IA ».
- Hero : « VOTRE AGENT IA EST EN PROD. TENEZ LE **QUARTER**. » Sous-titre : « Vous avez promis des livraisons à votre hiérarchie. Je renforce l'équipe qui porte votre assistant IA pour que ce qui est promis soit fini, à la date annoncée. »
- Référence visuelle existante : ses cards LinkedIn (`card_linkedin.png`). Fond blanc, motif de losanges gris clair, grotesque très grasse en majuscules noires, un mot clé en bleu roi, signature avec photo ronde. Degré de reprise non décidé.
- Structure inspirée de williamalexander.tech.

## Evidence on Hand

- Bilan détaillé : `bilan_competences_charles-meldhine_madi_mnemoi.md`.
- Clients citables (logos) : LexisNexis, ADEO (Leroy Merlin), Servier, Ville de Roubaix, association Eternaltwin.
- Chiffres : 500+ utilisateurs du Knowledge Bot (Servier), 80 % de bonnes réponses, 3 filiales ; 500 000 € d'économies annuelles (Suivi des dérives) ; eMush : 3,5 ans, 400k+ lignes, 2 500+ joueurs, 30+ contributeurs au total, 20+ pendant son lead.
- Ne pas utiliser : « 12 applications web chez Eternaltwin ».
- Études de cas : Knowledge Bot (Servier), Protégé (LexisNexis). eMush reste discret (témoignages, logo) : trop mis en avant, il brouille le positionnement.
- Ask NERON et SightCall sont des projets personnels : ne jamais les présenter comme des missions.
- Témoignages : 17 au total (11 recommandations LinkedIn + 6 citations), voir le bilan. Accueil : Romain Philippe, Guillaume Astor, William Dechamps, Robin Deparpe, Anthony Cyrille ou Michaël Azerhad, + citation « meilleur développeur que j'aie pu croiser ».
- Blog existant : 3 articles en français sur cmnemoi.github.io/posts, à migrer.
- Photo : celle de la card LinkedIn. Fichiers de logos : à récupérer.

## Product Principles

- Parler à un PM, pas à un tech lead : résultats, dates, visibilité. La stack reste discrète, mais DORA reste cité.
- Charles est dev, pas PO/PM : ne jamais promettre de livrable PM (slides, reporting). Cadrer est une proposition : il ne l'a jamais mis en place.
- Trois points par étape de l'offre. Pas d'acquis de base (retour arrière, petites livraisons : tout le monde fait du Scrum) présentés comme une promesse. Ce qui manque vraiment : une vraie CI/CD, et un Scrum appliqué jusqu'au bout.
- Une IA en production est du logiciel : la preuve passe par des pratiques et des résultats concrets, pas par du jargon IA.
- Chaque section mène vers l'appel de 30 minutes.
- Aucune affirmation inventée : chiffres, clients et citations viennent du bilan.
- Le site prolonge les cards LinkedIn : un visiteur venu de LinkedIn reconnaît l'univers.
