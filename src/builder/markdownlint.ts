import { EsjOptions } from '../interfaces/esj-options.js';
import { PackageJsonFile } from '../utils/package-json.js';
import { ModuleType } from '../enums/module-type.enum.js';
import { ConfigRender } from '../utils/config.render.js';
import { createMarkdownConfig } from '../templates/markdownlint/markdownlint.config.js';

export async function buildMarkdownLintConfig(options: EsjOptions) {
  const packageJSON = PackageJsonFile.instance;
  const configData = createMarkdownConfig(options);

  if (packageJSON.moduleType === ModuleType.MODULE) {
    ConfigRender.writeModuleJs('.markdownlint-cli2.mjs', configData);
  }

  if (packageJSON.moduleType === ModuleType.COMMON) {
    ConfigRender.writeCommonJs('.markdownlint-cli2.cjs', configData);
  }

  if (packageJSON.moduleType === ModuleType.DEFAULT) {
    ConfigRender.writeJson('.markdownlint.json', configData);
  }
}
