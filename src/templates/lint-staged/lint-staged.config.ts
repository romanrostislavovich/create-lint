import { EsjOptions } from '../../interfaces/esj-options.js';
import { Tools } from '../../enums/tools.js';
import { ConfigResolver } from '../../config-resolver.js';
import { CommandBuilder } from '../../command-builder.js';
import { PackageJsonFile } from '../../utils/package-json.js';

export function createLintStagedConfig(buildOptions: EsjOptions): Record<string, string[]> {
  const config: Record<string, string[]> = {};

  const packageJSON = PackageJsonFile.instance;
  const { tools } = buildOptions;
  const moduleType = packageJSON.moduleType;

  // 1. JS/TS/Svelte - ESLint и Prettier
  const jsExtensions = '**/*.{js,jsx,ts,tsx,svelte}';
  config[jsExtensions] = [];

  // Добавляем ESLint (он обычно в списке по умолчанию, но проверим)
  if (tools.includes(Tools.EsLint)) {
    const eslintFile = ConfigResolver.getConfigFileName(Tools.EsLint, moduleType);
    config[jsExtensions].push(CommandBuilder.getFullCommand(Tools.EsLint, eslintFile));
  }

  if (tools.includes(Tools.Prettier)) {
    const prettierFile = ConfigResolver.getConfigFileName(Tools.Prettier, moduleType);
    config[jsExtensions].push(CommandBuilder.getFullCommand(Tools.Prettier, prettierFile));
  }

  // 2. Стили - Stylelint и Prettier
  if (tools.includes(Tools.Stylelint) || tools.includes(Tools.Prettier)) {
    const styleExtensions = '**/*.{css,scss,sass}';
    config[styleExtensions] = [];

    if (tools.includes(Tools.Stylelint)) {
      const stylelintFile = ConfigResolver.getConfigFileName(Tools.Stylelint, moduleType);
      config[styleExtensions].push(CommandBuilder.getFullCommand(Tools.Stylelint, stylelintFile));
    }

    if (tools.includes(Tools.Prettier)) {
      const prettierFile = ConfigResolver.getConfigFileName(Tools.Prettier, moduleType);
      config[styleExtensions].push(CommandBuilder.getFullCommand(Tools.Prettier, prettierFile));
    }
  }

  // 3. JSON - Prettier
  if (tools.includes(Tools.Prettier)) {
    const prettierFile = ConfigResolver.getConfigFileName(Tools.Prettier, moduleType);
    config['**/*.{json}'] = [CommandBuilder.getFullCommand(Tools.Prettier, prettierFile)];
  }

  // 4. Markdown - MarkdownLint
  if (tools.includes(Tools.MarkdownLint)) {
    const mdFile = ConfigResolver.getConfigFileName(Tools.MarkdownLint, moduleType);
    config['**/*.{md}'] = [CommandBuilder.getFullCommand(Tools.MarkdownLint, mdFile)];
  }

  // 5. HTML - HTMLHint
  if (tools.includes(Tools.HTMLHint)) {
    const htmlFile = ConfigResolver.getConfigFileName(Tools.HTMLHint, moduleType);
    config['**/*.{html}'] = [CommandBuilder.getFullCommand(Tools.HTMLHint, htmlFile)];
  }

  // Удаляем пустые ключи, если инструменты не были выбраны
  return Object.fromEntries(Object.entries(config).filter(([_, v]) => v.length > 0));
}
