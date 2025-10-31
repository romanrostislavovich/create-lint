import fs from 'node:fs/promises';
import path from 'node:path';
import ejs from 'ejs';

export async function buildEditorConfig() {
  const tpl = await fs.readFile(path.resolve('./src/templates/.editorconfig.ejs'), 'utf8');
  const out = ejs.render(tpl, {});
  await fs.writeFile('.editorconfig', out, 'utf8');
  console.log('Created .editorconfig');
}
