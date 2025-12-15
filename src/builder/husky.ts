import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import ejs from 'ejs';
import { Prompt } from '../interfaces/prompt.js';
import { fileURLToPath } from 'node:url';
import { Tools } from '../enums/tools.js';

export async function setupHusky(options: Prompt) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePathTplLint = path.resolve(__dirname, './../', 'templates', 'lint-staged.config.ejs');
  const filePathTplHusky = path.resolve(__dirname, './../', 'templates', 'husky-pre-commit.ejs');

  const tplLint = fs.readFileSync(filePathTplLint, 'utf8');
  const tplHusky = fs.readFileSync(filePathTplHusky, 'utf8');
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
