import { Tools } from '../enums/tools.js';

const commandRunDictionary = new Map<Tools, string>([
  [Tools.EsLint, 'eslint --config ./{{config}} --fix'],
  [Tools.Prettier, 'prettier --config ./{{config}} --write --check .'],
  [Tools.HTMLHint, 'htmlhint --config ./{config}} **/*.html '],
  [Tools.Stylelint, 'stylelint **/*.{scss,sass,css} -c ./{{config}} --fix'],
  [Tools.MarkdownLint, 'markdownlint-cli2 -c ./.{{config}} **/*.md'],
  [Tools.CommitLint, 'npx commitlint --config {{config}} --edit'],
]);

export { commandRunDictionary };
