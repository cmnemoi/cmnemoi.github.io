# Site de Charles-Meldhine

Site personnel et blog, construit avec [Astro](https://astro.build). Déployé sur GitHub Pages à chaque push sur `main`.

- Installer : `mise install && npm install`
- Lancer en local : `mise run serve` (ou `npm run dev`)
- Construire : `npm run build`

## Écrire

- **Article** : un fichier Markdown dans `src/content/blog/` avec `title`, `date` et `description` en front matter. Pour un article avec images, un dossier `slug/index.md` avec les images à côté.
- **Talk** : une entrée dans `src/talks.ts`.
- **Post LinkedIn** : une entrée (URL + premières lignes) dans `src/pages/blog/index.astro`.
