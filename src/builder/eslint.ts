import { Prompt } from '../interfaces/prompt.js';
import { EsjRender } from '../utils/esj-render.js';

export async function buildESLintConfig(options: Prompt) {
  EsjRender('.eslintrc.ejs', 'eslint.config.mjs', options);
}
