import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .process(markdown);
  return result.toString();
} 