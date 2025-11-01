import { Prompt } from '../interfaces/prompt.js';
import { EsjRender } from '../utils/esj-render.js';

export async function buildStylelintConfig(options: Prompt) {
  EsjRender('stylelint.config.ejs', 'stylelint.config.js', options);
}
