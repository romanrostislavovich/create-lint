import fs from 'node:fs/promises';
import path from 'node:path';
import ejs from 'ejs';
import { Prompt } from '../interfaces/prompt.js';

export async function buildPrettierConfig(options: Prompt) {
  const tpl = await fs.readFile(path.resolve('./src/templates/prettier.config.ejs'), 'utf8');
  const out = ejs.render(tpl, options);
  await fs.writeFile('prettier.config.mjs', out, 'utf8');
  console.log('Created prettier.config.mjs');
}
