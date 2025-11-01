import { Prompt } from '../interfaces/prompt.js';
import { EsjRender } from '../utils/esj-render.js';

export async function buildPrettierConfig(options: Prompt) {
  EsjRender('prettier.config.ejs', 'prettier.config.mjs', options);
}
