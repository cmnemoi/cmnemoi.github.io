import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cmnemoi.github.io',
  markdown: { shikiConfig: { theme: 'github-light' } },
  // Anciennes URL du site Hugo
  redirects: {
    '/posts': '/blog',
    '/testimonies': '/#avis',
    '/posts/pourquoi-vos-rebases-échouent': '/blog/pourquoi-vos-rebases-echouent',
    '/posts/votre-projet-devrait-sinstaller-en-une-seule-commande': '/blog/votre-projet-devrait-sinstaller-en-une-seule-commande',
    '/posts/qui-paie-pour-un-null': '/blog/qui-paie-pour-un-null',
  },
});
