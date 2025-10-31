import fs from 'node:fs/promises';
import path from 'node:path';
import ejs from 'ejs';
import { Prompt } from '../interfaces/prompt.js';

export async function buildESLintConfig(options: Prompt) {
  const tpl = await fs.readFile(path.resolve('./src/templates/.eslintrc.ejs'), 'utf8');
  const out = ejs.render(tpl, options);
  await fs.writeFile('eslint.config.mjs', out, 'utf8');
  console.log('Created eslint.config.mjs');
}
