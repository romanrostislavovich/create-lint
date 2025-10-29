import { buildESLintConfig } from "./builder/eslint.js";
import { buildPrettierConfig } from "./builder/prettier.js";
import { buildStylelintConfig } from "./builder/stylelint.js";
import { setupHusky } from "./builder/husky.js";
import { buildEditorConfig } from "./builder/editorconfig.js";
import { installDependencies } from "./dependencies.js";
import {Tools} from "./enums/tools";

export async function generateConfigs(answers: any) {
    // always create eslint
    await buildESLintConfig(answers);

    if (answers.tools?.includes(Tools.Prettier)) await buildPrettierConfig(answers);
    if (answers.tools?.includes(Tools.Stylelint)) await buildStylelintConfig(answers);
    if (answers.tools?.includes(Tools.EditorConfig)) await buildEditorConfig(answers);
    if (answers.tools?.includes(Tools.Husky)) await setupHusky(answers);

    if (answers.installDeps) await installDependencies(answers);
}
