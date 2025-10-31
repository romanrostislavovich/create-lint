import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import ejs from 'ejs';
import { Prompt } from '../interfaces/prompt.js';

export async function setupHusky(options: Prompt) {
  const tplLint = fs.readFileSync(path.resolve('./src/templates/lint-staged.config.ejs'), 'utf8');
  const tplHusky = fs.readFileSync(path.resolve('./src/templates/husky-pre-commit.ejs'), 'utf8');
  const outLint = ejs.render(tplLint, options);
  const outHusky = ejs.render(tplHusky, options);

  try {
    fs.writeFileSync('lint-staged.config.js', outLint, 'utf8');
  } catch (e) {
    console.error(e);
  }

  try {
    cp.execSync('npx husky init');
    cp.execSync('npx lint staged');

    if (!fs.existsSync('.husky')) {
      fs.mkdirSync('.husky');
    }

    fs.writeFileSync('.husky/pre-commit', outHusky, 'utf8');
    console.log('Husky hooks installed');
  } catch (e) {
    console.error(e);
    console.warn('Husky setup failed; run `npx husky install` manually.');
  }
}
