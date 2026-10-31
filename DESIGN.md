---
name: Charles-Meldhine · Ingénieur IA
description: Site freelance d'un ingénieur IA qui intervient après la mise en prod, mis en page comme un pipeline de CI.
colors:
  ink: "#111318"
  mute: "#4f5563"
  blue: "#1d3bbf"
  line: "#e4e7ec"
  ghost: "#f3f4f6"
  hatch: "#c9ced6"
  ghost-ink: "#6b7280"
  paper: "#ffffff"
  on-blue-soft: "#dfe4fb"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8.6vw, 7.6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5.25rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  figure:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 4.4vw, 4rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontFeature: "tnum"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  step:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  ui:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.45
  small:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
    fontFeature: "tnum"
rounded:
  none: "0px"
  round: "50%"
spacing:
  gutter: "clamp(16px, 6.6vw, 96px)"
  section: "clamp(80px, 11vw, 168px)"
  block: "clamp(48px, 6vw, 80px)"
  container: "1632px"
  measure: "720px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.35em"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-primary-big:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "1.05em 1.6em"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue}"
    rounded: "{rounded.none}"
    padding: "1.05em 1.6em"
  button-light-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  rail-step-done:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "14px 16px 18px"
  step-tag:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 8px"
  step-tag-lit:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
  status-badge:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 14px"
  article-end-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "28px"
---

# Design System: Charles-Meldhine · Ingénieur IA

## Overview

**Creative North Star: "Le Pipeline Validé"**

Le site se lit comme une sortie de CI. Chaque bloc est une étape numérotée, cernée d'un filet d'encre ; ce qui est passé est plein de bleu, ce qui reste à faire est dessiné en fantôme hachuré. Le bleu roi ne décore jamais : il veut dire « validé » ou « en cours ». Tout le reste est encre sur papier blanc, avec une grotesque très grasse en capitales qui porte la voix des cards LinkedIn de Charles.

La densité est éditoriale : grandes marges latérales, sections hautes, peu d'éléments par écran, mais des titres énormes qui occupent toute la largeur. La profondeur ne vient pas des ombres : elle vient des filets (encre pour structurer, gris clair pour séparer) et du contraste plein / hachuré. Le mouvement est rare et signifiant : une étape s'allume quand on l'atteint.

**Key Characteristics:**
- Papier blanc, encre quasi noire, un seul bleu qui signifie un état.
- Grotesque Archivo en 900, capitales, interlignage serré, un mot clé en bleu.
- Angles vifs partout ; seuls les portraits et les points de données sont ronds.
- Blocs numérotés (01 à 07) cernés d'un filet d'encre de 1px.
- Étapes à venir en hachures diagonales à 135°.

## Colors

Une palette monochrome froide où une seule couleur, le bleu roi, porte du sens.

### Primary
- **Bleu Validé** (blue) : étapes terminées ou atteintes du rail, boutons d'appel, mot clé des titres (`em` dans un titre display), puces et marqueurs de liste, chiffres de résultats, liens dans la prose, focus, sélection, fond du bandeau CTA final.

### Neutral
- **Encre** (ink) : texte courant, titres, filets structurants (cadres de rail, de bloc, haut de section), état survolé des boutons.
- **Gris Note** (mute) : sous-titres (lede), légendes, dates, rôles des témoins, libellés secondaires. Contraste 7,5:1 sur blanc.
- **Filet** (line) : séparateurs internes entre lignes de liste, entre chiffres, bordure de la nav et du badge.
- **Fantôme** (ghost) : trait des hachures des étapes à venir, fond du code en ligne.
- **Hachure claire** (hatch) : hachure de la partie « restante » d'une jauge, pouce de la barre de défilement. Jamais pour du texte.
- **Papier** (paper) : fond unique de toutes les pages.
- **Bleu Pâle** (on-blue-soft) : texte secondaire posé sur le bleu (bandeau CTA final).

### Named Rules
**La Règle du Bleu qui Signifie.** Le bleu marque un état (validé, en cours, cliquable, mot clé). Un aplat bleu sans signification n'existe pas ; le seul grand aplat est le bandeau CTA, qui est l'étape suivante.

**La Règle de l'Accent Unique.** Aucune deuxième couleur d'accent, pas de vert de succès : la validation s'écrit en bleu avec une coche.

## Typography

**Display Font:** Archivo Variable (avec Archivo, system-ui)
**Body Font:** Archivo Variable (une seule famille pour tout le site)

**Character:** Une grotesque unique, poussée à 900 en capitales pour les titres et laissée à 400 pour la lecture. La hiérarchie vient du poids et de la taille, jamais d'une deuxième famille.

### Hierarchy
Dix tailles, définies en variables `--fs-*` dans `src/styles/global.css`. Aucune taille littérale ailleurs (seule exception : le code en ligne à 0.9em, relatif à son texte).
- **Display** (`--fs-display`, 900, capitales) : titre du hero, titre de `/blog`.
- **Headline** (`--fs-headline`, 900, capitales) : titres de section, titre du CTA final, titre des mentions légales.
- **Figure** (`--fs-figure`, 900, chiffres tabulaires) : chiffres du bandeau de preuves, titre d'article.
- **Title** (`--fs-title`, 800–900) : titres d'études de cas et de fronts, phrases « douleurs », chiffres de résultats, intertitres d'article.
- **Step** (`--fs-step`, 800) : titres d'articles listés, question de l'encart de fin d'article, sous-intertitres.
- **Lede** (`--fs-lede`, 400, gris note) : sous-titres, description d'article, texte du CTA final.
- **Body** (`--fs-body`, 1.125rem) : texte courant et prose, libellés des rails, boutons larges.
- **UI** (`--fs-ui`, 1rem) : navigation, légendes des chiffres, métadonnées des études de cas.
- **Small** (`--fs-small`, 0.9rem) : dates, badge, auteurs des avis, pied de page, blocs de code.
- **Label** (`--fs-label`, 700, +0.08em) : numéros d'étape, « Vous êtes ici », intitulés du bloc Format.

### Named Rules
**La Règle du Mot Bleu.** Un titre display porte au plus un mot ou groupe clé en bleu, sans italique.

**La Règle des Capitales Pleines.** Les capitales sont réservées au 900 serré (titres display, fronts, libellés de rail, citation mise en avant). Jamais de capitales espacées en petit corps.

## Layout

Conteneur de 1632px maximum, marges latérales fluides (gutter). Les sections respirent fortement (section) et s'ouvrent souvent sur un filet d'encre pleine largeur. Les grilles sont des cadres découpés par des filets plutôt que des cartes espacées : rail à 7 colonnes égales, bandeau de 4 chiffres, liste 2 colonnes des douleurs, bloc Format à 3 cellules. L'offre pose un rail latéral collant (top 120px, 180 à 260px de large) à côté des fronts. Les études de cas sont en 2 colonnes (récit / résultats). Les articles se lisent sur 720px.

Responsive : le rail passe en pile verticale sous 760px ; les grilles 4 → 2 → 1 colonnes à 1100px et 600px ; le rail latéral disparaît sous 900px ; la nav replie ses liens sous le bouton sous 900px.

**La Règle du Cadre Découpé.** On divise un cadre par des filets, on n'aligne pas des cartes flottantes de même taille.

## Elevation & Depth

Système plat. Aucune ombre portée. La profondeur vient des filets (encre 1px pour structurer, gris clair 1px pour séparer) et de l'opposition aplat bleu / hachure fantôme. Deux exceptions fonctionnelles : la nav collante est en blanc à 94 % avec un flou d'arrière-plan, et le point du badge de disponibilité porte un halo bleu à 15 %.

### Shadow Vocabulary
- **Halo de statut** (`box-shadow: 0 0 0 4px rgb(29 59 191 / 0.15)`) : uniquement autour du point « en mission » du badge.

### Named Rules
**La Règle du Filet, pas de l'Ombre.** Un élément se détache par un filet ou un aplat, jamais par une ombre.

## Shapes

Angles vifs (0px) sur tout : boutons, badge, étiquettes, rail, cadres, encarts, iframes. Seuls sont ronds (50 %) les portraits et les points de la jauge « un point = 10 personnes ». Le losange revient comme motif : puces des listes de l'offre (carré de 10px tourné de 45°, contour bleu de 2px) et motif de fond du bandeau CTA (losanges blancs à 9 % d'opacité). Les étapes à venir sont hachurées en diagonale à 135° (trait de 1px tous les 10px).

## Components

### Buttons
- **Shape :** angles vifs (0px).
- **Primary :** aplat bleu, texte blanc 800, padding 0.85em 1.35em ; variante grande (hero, CTA final) à 1.05em 1.6em et clamp(1.05rem, 1.4vw, 1.25rem). Flèche SVG trait 2.2 à droite.
- **Hover / Focus :** le fond passe à l'encre en 0.25s, la flèche glisse de 4px. Focus global : contour bleu 3px, décalé de 3px.
- **Light :** sur le bandeau bleu, fond blanc et texte bleu ; même survol vers l'encre.
- **Lien d'action :** texte bleu 800 avec flèche, sans cadre (« Tous les articles », « 10+ témoignages »).

### Chips
- **Badge de statut :** filet gris clair, padding 6px 14px, point bleu de 8px avec halo. Un seul par page, en tête du hero.
- **Étiquette d'étape :** numéro en label, cerné d'encre (6px 8px) ; s'allume en aplat bleu quand le front est atteint.

### Cards / Containers
- **Corner Style :** 0px.
- **Background :** papier ; aplat bleu pour les étapes validées.
- **Shadow Strategy :** aucune (voir Elevation).
- **Border :** filet d'encre 1px pour un cadre, gris clair 1px pour les séparations internes.
- **Internal Padding :** 14 à 28px selon la densité (étape 14px 16px 18px ; encart de fin d'article 28px).

### Navigation
- Barre collante, nom en 800 suivi de « · Ingénieur IA » en gris note, liens texte 1rem sans soulignement, bleu au survol, bouton primaire à droite. Sous 900px, le bouton reste sur la ligne du nom et les liens passent en dessous en gris note 0.9rem.

### Rail du pipeline (signature)
Sept étapes numérotées dans un cadre d'encre. Étapes validées : aplat bleu, coche SVG, séparations blanches à 35 %. Étapes à venir : hachure fantôme, texte estompé. Un repère « Vous êtes ici » en bleu 800 avec une flèche triangulaire marque l'étape courante. Le rail latéral de l'offre reprend le même vocabulaire et allume 05, 06, 07 en 0.6s (ease cubic-bezier(0.16, 1, 0.3, 1)) quand le visiteur atteint chaque front. Le bandeau final rejoue un mini-rail en négatif, l'étape suivante en blanc plein.

### Jauges de chiffres (signature)
Chaque chiffre a sa forme : grille de points bleus, barre pleine + reste hachuré, pile de carrés bleus, frise chronologique. Toujours en bleu sur 56px de haut, sous un chiffre en Figure.

### Encart de fin d'article
Cadre d'encre 1px, padding 28px, portrait rond de 72px, question en 900 1.4rem, texte en gris note, bouton primaire.

## Do's and Don'ts

### Do:
- **Do** réserver le bleu (#1d3bbf) aux états validés, aux actions et au mot clé d'un titre.
- **Do** cerner les blocs structurants d'un filet d'encre de 1px et séparer les lignes internes d'un filet #e4e7ec.
- **Do** numéroter les étapes (01 à 07) en label 700, +0.08em, chiffres tabulaires.
- **Do** dessiner ce qui reste à faire en hachure diagonale à 135°, et ce qui est fait en aplat bleu avec une coche.
- **Do** composer les titres en Archivo 900, capitales, interlignage 0.92, approche -0.035em.
- **Do** donner à chaque chiffre clé sa propre forme graphique plutôt qu'une icône.
- **Do** respecter `prefers-reduced-motion` : défilement doux et bandeau de logos coupés.

### Don't:
- **Don't** arrondir les boutons, cadres ou étiquettes ; le rond est réservé aux portraits et aux points de données.
- **Don't** ajouter une ombre portée pour détacher un élément.
- **Don't** introduire une deuxième couleur d'accent, ni un vert de succès.
- **Don't** utiliser le bleu comme aplat décoratif sans signification d'état.
- **Don't** ajouter une deuxième famille de caractères.
- **Don't** poser de petites capitales espacées au-dessus des titres.
