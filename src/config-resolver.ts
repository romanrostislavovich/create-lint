import { Tools } from './enums/tools.js';
import { ModuleType } from './enums/module-type.enum.js';

export class ConfigResolver {
  private static readonly configMap: Partial<Record<Tools, Record<ModuleType, string>>> = {
    [Tools.Prettier]: {
      [ModuleType.DEFAULT]: '.prettierrc.json',
      [ModuleType.COMMON]: 'prettier.config.cjs',
      [ModuleType.MODULE]: 'prettier.config.mjs',
    },
    [Tools.Stylelint]: {
      [ModuleType.DEFAULT]: '.stylelintrc.json',
      [ModuleType.COMMON]: '.stylelintrc.cjs',
      [ModuleType.MODULE]: '.stylelintrc.mjs',
    },
    [Tools.MarkdownLint]: {
      [ModuleType.DEFAULT]: '.markdownlint.json',
      [ModuleType.COMMON]: '.markdownlint-cli2.cjs',
      [ModuleType.MODULE]: '.markdownlint-cli2.mjs',
    },
    [Tools.HTMLHint]: {
      [ModuleType.DEFAULT]: '.htmlhintrc',
      [ModuleType.COMMON]: '.htmlhintrc',
      [ModuleType.MODULE]: '.htmlhintrc',
    },
    [Tools.EditorConfig]: {
      [ModuleType.DEFAULT]: '.editorconfig',
      [ModuleType.COMMON]: '.editorconfig',
      [ModuleType.MODULE]: '.editorconfig',
    },
    [Tools.EsLint]: {
      [ModuleType.DEFAULT]: 'eslint.config.js',
      [ModuleType.COMMON]: 'eslint.config.cjs',
      [ModuleType.MODULE]: 'eslint.config.mjs',
    },
    [Tools.LintStaged]: {
      [ModuleType.DEFAULT]: '.lintstagedrc.json',
      [ModuleType.COMMON]: '.lintstagedrc.cjs',
      [ModuleType.MODULE]: '.lintstagedrc.mjs',
    },
  };

  public static getConfigFileName(tool: Tools, moduleType: ModuleType): string {
    const toolConfigs = ConfigResolver.configMap[tool];

    if (!toolConfigs) {
      throw new Error(`Config for tool "${tool}" is not defined.`);
    }

    return toolConfigs[moduleType] || toolConfigs[ModuleType.DEFAULT];
  }
}
