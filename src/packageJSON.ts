import fs from 'node:fs';
import { Tools } from './enums/tools.js';
import { Prompt } from './interfaces/prompt.js';
import { PackageManagers } from './enums/package-managers.js';
import { PackageJsonFile } from './utils/package-json.js';

const commandNameForAllPackages = 'lint';

const commandRunDictionary = new Map<Tools, string>([
  [Tools.EsLint, 'eslint --fix'],
  [Tools.Prettier, 'prettier --write --check .'],
  [Tools.HTMLHint, 'htmlhint **/*.html'],
  [Tools.Stylelint, 'stylelint **/*.{scss,sass,css} -c ./stylelint.config.js --fix'],
  [Tools.MarkdownLint, 'markdownlint-cli2 -c ./.markdownlint.json **/*.md'],
]);

const commandNameDictionary = new Map<Tools, string>([
  [Tools.EsLint, 'lint:eslint'],
  [Tools.HTMLHint, 'lint:html'],
  [Tools.Prettier, 'format:prettier'],
  [Tools.Stylelint, 'lint:style'],
  [Tools.MarkdownLint, 'lint:markdown'],
]);

export function updatePackageJSON(answers: Prompt & { manager: PackageManagers }) {
  const packageJSON = PackageJsonFile.instance;

  packageJSON.addCommand(
    commandNameDictionary.get(Tools.EsLint) || '',
    commandRunDictionary.get(Tools.EsLint),
  );

  if (answers?.tools.includes(Tools.Stylelint)) {
    packageJSON.addCommand(
      commandNameDictionary.get(Tools.Stylelint) || '',
      commandRunDictionary.get(Tools.Stylelint),
    );
  }

  if (answers?.tools.includes(Tools.Prettier)) {
    packageJSON.addCommand(
      commandNameDictionary.get(Tools.Prettier) || '',
      commandRunDictionary.get(Tools.Prettier),
    );
  }

  if (answers?.tools.includes(Tools.HTMLHint)) {
    packageJSON.addCommand(
      commandNameDictionary.get(Tools.HTMLHint) || '',
      commandRunDictionary.get(Tools.HTMLHint),
    );
  }

  if (answers?.tools.includes(Tools.MarkdownLint)) {
    packageJSON.addCommand(
      commandNameDictionary.get(Tools.MarkdownLint) || '',
      commandRunDictionary.get(Tools.MarkdownLint),
    );
  }

  const commandForAllLint = answers.tools
    .reduce(
      (acum, tool) => {
        const command = commandNameDictionary.get(tool);
        if (command) {
          acum.push(`npm run ${command}`);
        }
        return acum;
      },
      [`npm run ${commandNameDictionary.get(Tools.EsLint)}`],
    )
    .join(' && ');

  packageJSON.addCommand(commandNameForAllPackages, commandForAllLint);

  packageJSON.saveFile();
}
