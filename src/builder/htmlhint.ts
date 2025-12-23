import { EsjRender } from '../utils/esj-render.js';
import { EsjOptions } from '../interfaces/esj-options.js';
import { PackageJsonFile } from '../utils/package-json.js';
import { generateEslintFileContent } from '../templates/eslint/eslint.config.js';
import { ConfigResolver } from '../config-resolver.js';
import { Tools } from '../enums/tools.js';
import { ConfigRender } from '../utils/config.render.js';
import { createHtmlHintConfig } from '../templates/htmlhint/htmlhint.config.js';

export async function buildHtmlhintConfig(options: EsjOptions) {
  const packageJSON = PackageJsonFile.instance;
  const configData = createHtmlHintConfig(options);

  const configFileName = ConfigResolver.getConfigFileName(Tools.HTMLHint, packageJSON.moduleType);

  ConfigRender.writeJson(configFileName, configData);
}
