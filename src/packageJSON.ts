import fs from 'node:fs';
import { Tools } from './enums/tools.js';
import { Prompt } from './interfaces/prompt.js';
import { PackageManagers } from './enums/package-managers.js';

const commandRunDictionary = new Map<Tools, string>([
  [Tools.Prettier, 'prettier --write'],
  [Tools.HTMLHint, 'htmlhint **/*.html'],
  [Tools.MarkdownLint, 'markdownlint-cli2 -c ./.markdownlint.json'],
  [Tools.Stylelint, 'stylelint **/*.{scss,sass,css} -c ./stylelint.config.js --fix'],
]);

const commandNameDictionary = new Map<Tools, string>([
  [Tools.HTMLHint, 'lint:html'],
  [Tools.Prettier, 'format:prettier'],
  [Tools.Stylelint, 'lint:style'],
  [Tools.MarkdownLint, 'lint:markdown'],
]);

export function getPackageJSON() {
  try {
    const packageJSON = fs.readFileSync('./package.json', 'utf8');
    return JSON.parse(packageJSON);
  } catch (e) {
    console.error(e);
  }
}

export function updatePackageJSON(answers: Prompt & { manager: PackageManagers }) {
  const packageJSON = getPackageJSON();

  packageJSON.scripts['lint:eslint'] = 'eslint --fix';

  if (answers?.tools.includes(Tools.Stylelint)) {
    packageJSON.scripts[commandNameDictionary.get(Tools.Stylelint) || ''] =
      commandRunDictionary.get(Tools.Stylelint);
  }

  if (answers?.tools.includes(Tools.Prettier)) {
    packageJSON.scripts[commandNameDictionary.get(Tools.Prettier) || ''] = commandRunDictionary.get(
      Tools.Prettier,
    );
  }

  if (answers?.tools.includes(Tools.HTMLHint)) {
    packageJSON.scripts[commandNameDictionary.get(Tools.HTMLHint) || ''] = commandRunDictionary.get(
      Tools.HTMLHint,
    );
  }

  if (answers?.tools.includes(Tools.MarkdownLint)) {
    packageJSON.scripts[commandNameDictionary.get(Tools.MarkdownLint) || ''] =
      commandRunDictionary.get(Tools.MarkdownLint);
  }

  fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2));
}
