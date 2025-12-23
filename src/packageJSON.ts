import { Tools } from './enums/tools.js';
import { Prompt } from './interfaces/prompt.js';
import { PackageManagers } from './enums/package-managers.js';
import { PackageJsonFile } from './utils/package-json.js';
import { CommandBuilder } from './command-builder.js';
import { ConfigResolver } from './config-resolver.js';

export function updatePackageJSON(answers: Prompt & { manager: PackageManagers }) {
  const packageJSON = PackageJsonFile.instance;

  const allowedTools = CommandBuilder.getListOfTools(answers.tools);

  allowedTools.forEach(tool => {
    const configFileName = ConfigResolver.getConfigFileName(tool, packageJSON.moduleType);
    const scriptName = CommandBuilder.getScriptName(tool);
    const fullCommand = CommandBuilder.getFullCommand(tool, configFileName);
    packageJSON.addCommand(scriptName, fullCommand);
  });

  const scriptNameAll = CommandBuilder.COMMAND_ALL;
  const fullCommandAll = CommandBuilder.generateCompoundCommand(allowedTools, answers.manager);
  packageJSON.addCommand(scriptNameAll, fullCommandAll);

  packageJSON.saveFile();
}
