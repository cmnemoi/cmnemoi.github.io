import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Blog de Charles-Meldhine',
    description: 'Ingénierie logicielle, IA en production et open source.',
    site: context.site,
    items: posts.map((p) => ({ title: p.data.title, pubDate: p.data.date, description: p.data.description, link: `/blog/${p.id}/` })),
  });
}
