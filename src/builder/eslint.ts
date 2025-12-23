import { EsjOptions } from '../interfaces/esj-options.js';
import { PackageJsonFile } from '../utils/package-json.js';
import { ConfigRender } from '../utils/config.render.js';
import { ConfigResolver } from '../config-resolver.js';
import { Tools } from '../enums/tools.js';
import { generateEslintFileContent } from '../templates/eslint/eslint.config.js';

export async function buildESLintConfig(options: EsjOptions) {
  const packageJSON = PackageJsonFile.instance;
  const configData = generateEslintFileContent(options, packageJSON.moduleType);

  const configFileName = ConfigResolver.getConfigFileName(Tools.EsLint, packageJSON.moduleType);

  ConfigRender.writeString(configFileName, configData);
}
