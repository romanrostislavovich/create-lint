import fs from 'node:fs/promises';
import path from 'node:path';
import ejs from 'ejs';
import { Prompt } from '../interfaces/prompt.js';

export async function buildStylelintConfig(options: Prompt) {
  const tpl = await fs.readFile(path.resolve('./src/templates/stylelint.config.ejs'), 'utf8');
  const out = ejs.render(tpl, options);
  await fs.writeFile('stylelint.config.mjs', out, 'utf8');
  console.log('Created stylelint.config.js');
}
