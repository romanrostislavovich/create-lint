import { PackageManagers } from './enums/package-managers.js';
import { Tools } from './enums/tools.js';

export class CommandBuilder {
  public static readonly COMMAND_ALL = 'lint';

  private static readonly commandNameMap: Partial<Record<Tools, string>> = {
    [Tools.EsLint]: 'lint:eslint',
    [Tools.HTMLHint]: 'lint:html',
    [Tools.Prettier]: 'format:prettier',
    [Tools.Stylelint]: 'lint:style',
    [Tools.MarkdownLint]: 'lint:markdown',
  };

  private static readonly commandTemplates: Partial<Record<Tools, string>> = {
    [Tools.EsLint]: 'eslint --config {{config}} --fix',
    [Tools.Prettier]: 'prettier --config {{config}} --write --check .',
    [Tools.HTMLHint]: 'htmlhint --config ./{{config}} **/*.html',
    [Tools.Stylelint]: 'stylelint **/*.{scss,sass,css} -c ./{{config}} --fix',
    [Tools.MarkdownLint]: 'markdownlint-cli2 -c ./{{config}} *.md',
  };

  public static generateCompoundCommand(
    tools: Tools[],
    packageManager: PackageManagers = PackageManagers.npm,
  ): string {
    return tools
      .map(tool => {
        const scriptName = CommandBuilder.getScriptName(tool);
        return `${packageManager} run ${scriptName}`;
      })
      .join(' && ');
  }

  public static getScriptName(tool: Tools): string {
    const scriptName = CommandBuilder.commandNameMap[tool];

    if (!scriptName) {
      throw new Error(`Unable to find script name for ${tool}`);
    }
    return scriptName;
  }

  public static getFullCommand(tool: Tools, configFileName: string): string {
    const template = CommandBuilder.commandTemplates[tool];

    if (!template) {
      throw new Error(`Unable to find a command for this tool ${tool}.`);
    }

    return template.replace('{{config}}', configFileName);
  }

  public static getListOfTools(tools: Tools[]) {
    return tools.filter(tool => {
      return (
        tool === Tools.EsLint ||
        tool === Tools.MarkdownLint ||
        tool === Tools.Prettier ||
        tool === Tools.HTMLHint ||
        tool === Tools.Stylelint
      );
    });
  }
}
