import { EsjOptions } from '../../interfaces/esj-options.js';
import { Tools } from '../../enums/tools.js';
import { ModuleType } from '../../enums/module-type.enum.js';

export function generateEslintFileContent(options: EsjOptions, moduleType: ModuleType): string {
  const isESM = moduleType === ModuleType.MODULE;

  const imports: string[] = [];

  if (isESM) {
    imports.push('import { defineConfig } from "eslint/config";');
    imports.push('import eslint from "@eslint/js";');
    if (options.tools.includes(Tools.TypeScript))
      imports.push('import tseslint from "typescript-eslint";');
    if (options.tools.includes(Tools.Prettier))
      imports.push('import prettierRecommended from "eslint-plugin-prettier/recommended";');
  } else {
    imports.push('const { defineConfig } = require("eslint/config");');
    imports.push('const eslint = require("@eslint/js");');
    if (options.tools.includes(Tools.TypeScript))
      imports.push('const tseslint = require("typescript-eslint");');
    if (options.tools.includes(Tools.Prettier))
      imports.push('const prettierRecommended = require("eslint-plugin-prettier/recommended");');
  }

  const configs: string[] = ['{\n    ignores: ["dist/**"]\n  }', 'eslint.configs.recommended'];

  if (options.tools.includes(Tools.TypeScript) || options.framework?.includes('Angular')) {
    configs.push('...tseslint.configs.recommended');
  }

  if (options.framework?.includes('React')) {
    configs.push('reactEslint.configs.flat.recommended');
    configs.push('reactHooksEslint.configs.flat.recommended');
  }

  if (options.framework?.includes('Vue')) {
    configs.push("...pluginVueEslint.configs['flat/recommended']");
  }

  if (options.tools.includes(Tools.Prettier)) {
    configs.push('prettierRecommended');
  }

  const exportStatement = isESM
    ? `export default defineConfig([\n  ${configs.join(',\n  ')}\n]);`
    : `module.exports = defineConfig([\n  ${configs.join(',\n  ')}\n]);`;

  return `${imports.join('\n')}\n\n${exportStatement}`;
}
