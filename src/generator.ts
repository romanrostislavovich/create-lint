import { buildESLintConfig } from './builder/eslint.js';
import { buildPrettierConfig } from './builder/prettier.js';
import { buildStylelintConfig } from './builder/stylelint.js';
import { setupHusky } from './builder/husky.js';
import { buildEditorConfig } from './builder/editorconfig.js';
import { Tools } from './enums/tools.js';
import { Prompt } from './interfaces/prompt.js';
import { PackageManagers } from './enums/package-managers.js';
import { buildMarkdownLintConfig } from './builder/markdownlint.js';
import { buildHtmlhintConfig } from './builder/htmlhint.js';
import { buildCommitLint } from './builder/commitlint.js';
import { EsjOptions } from './interfaces/esj-options.js';
import { commandRunDictionary } from './maps/command-run.map.js';

export async function generateConfigs(answers: Prompt & { manager: PackageManagers }) {
  const esjOptions: EsjOptions = {
    ...answers,
    commandRunDictionary: commandRunDictionary,
  };
  // always create eslint
  await buildESLintConfig(esjOptions);

  if (answers.tools?.includes(Tools.Husky)) await setupHusky(esjOptions);
  if (answers.tools?.includes(Tools.Prettier)) await buildPrettierConfig(esjOptions);
  if (answers.tools?.includes(Tools.HTMLHint)) await buildHtmlhintConfig(esjOptions);
  if (answers.tools?.includes(Tools.Stylelint)) await buildStylelintConfig(esjOptions);
  if (answers.tools?.includes(Tools.EditorConfig)) await buildEditorConfig();
  if (answers.tools?.includes(Tools.MarkdownLint)) await buildMarkdownLintConfig(esjOptions);
  if (answers.tools?.includes(Tools.CommitLint)) await buildCommitLint();
}
