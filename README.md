# Site de Charles-Meldhine

Site personnel et blog, construit avec [Astro](https://astro.build). Déployé sur [cmnemoi.com](https://cmnemoi.com) à chaque push sur `main` : la CD construit une image nginx, la publie sur GHCR et la lance sur le VPS (voir le dépôt `my-vps`).

- Installer : `mise install && npm install`
- Lancer en local : `mise run serve` (ou `npm run dev`)
- Construire : `npm run build`

## Écrire

- **Article** : un fichier Markdown dans `src/content/blog/` avec `title`, `date` et `description` en front matter. Pour un article avec images, un dossier `slug/index.md` avec les images à côté.
- **Talk** : une entrée dans `src/talks.ts`.
- **Post LinkedIn** : une entrée (URL + premières lignes) dans `src/pages/blog/index.astro`.
