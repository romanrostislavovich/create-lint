import { buildESLintConfig } from "./builder/eslint.js";
import { buildPrettierConfig } from "./builder/prettier.js";
import { buildStylelintConfig } from "./builder/stylelint.js";
import { setupHusky } from "./builder/husky.js";
import { buildEditorConfig } from "./builder/editorconfig.js";
import { installDependencies } from "./dependencies.js";

export async function generateConfigs(answers: any) {
    // always create eslint
    await buildESLintConfig(answers);

    if (answers.tools?.includes("Prettier")) await buildPrettierConfig(answers);
    if (answers.tools?.includes("Stylelint")) await buildStylelintConfig(answers);
    if (answers.tools?.includes("EditorConfig")) await buildEditorConfig(answers);
    if (answers.tools?.includes("Husky + lint-staged")) await setupHusky(answers);

    if (answers.installDeps) await installDependencies(answers);
}
