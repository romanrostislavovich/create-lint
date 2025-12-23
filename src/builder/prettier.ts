import { PackageJsonFile } from '../utils/package-json.js';
import { ModuleType } from '../enums/module-type.enum.js';
import { EsjOptions } from '../interfaces/esj-options.js';
import { ConfigRender } from '../utils/config.render.js';
import { createPrettierConfig } from '../templates/prettier/prettier.config.js';

export async function buildPrettierConfig(options: EsjOptions) {
  const packageJSON = PackageJsonFile.instance;
  const configData = createPrettierConfig(options);

  if (packageJSON.moduleType === ModuleType.MODULE) {
    ConfigRender.writeModuleJs('prettier.config.mjs', configData);
  }

  if (packageJSON.moduleType === ModuleType.COMMON) {
    ConfigRender.writeCommonJs('prettier.config.cjs', configData);
  }

  if (packageJSON.moduleType === ModuleType.DEFAULT) {
    ConfigRender.writeJson('.prettierrc.json', configData);
  }
}
