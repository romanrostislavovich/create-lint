import { Prompt } from '../interfaces/prompt.js';
import { EsjRender } from '../utils/esj-render.js';

export async function buildHtmlhintConfig(options: Prompt) {
  EsjRender('.htmlhintrc.ejs', '.htmlhintrc', options);
}
