import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import ejs from 'ejs';
import { Prompt } from '../interfaces/prompt.js';
import { EsjOptions } from '../interfaces/esj-options.js';

export function EsjRender(fileName: string, resultFileName: string, options?: EsjOptions) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(__dirname, './../', 'templates', fileName);

  const tpl = fs.readFileSync(filePath, 'utf8');
  const out = ejs.render(tpl, options);
  fs.writeFileSync(resultFileName, out, 'utf8');
  console.log(`Created ${resultFileName}`);
}
