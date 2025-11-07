import { Prompt } from '../interfaces/prompt.js';
import { EsjRender } from '../utils/esj-render.js';

export async function buildMarkdownLintConfig(options: Prompt) {
  EsjRender('.markdownlint.ejs', '.markdownlint.json', options);
}
