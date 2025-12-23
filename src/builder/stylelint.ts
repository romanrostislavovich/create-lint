import { EsjOptions } from '../interfaces/esj-options.js';
import { PackageJsonFile } from '../utils/package-json.js';
import { ModuleType } from '../enums/module-type.enum.js';
import { ConfigRender } from '../utils/config.render.js';
import { createStyleLintConfig } from '../templates/stylelint/stylelint.config.js';

export async function buildStylelintConfig(options: EsjOptions) {
  const packageJSON = PackageJsonFile.instance;
  const configData = createStyleLintConfig(options);

  if (packageJSON.moduleType === ModuleType.MODULE) {
    ConfigRender.writeModuleJs('.stylelintrc.mjs', configData);
  }

  if (packageJSON.moduleType === ModuleType.COMMON) {
    ConfigRender.writeCommonJs('.stylelintrc.cjs', configData);
  }

  if (packageJSON.moduleType === ModuleType.DEFAULT) {
    ConfigRender.writeJson('.stylelintrc.json', configData);
  }
}
