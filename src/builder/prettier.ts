import { Prompt } from '../interfaces/prompt.js';
import { EsjRender } from '../utils/esj-render.js';
import { PackageJsonFile } from '../utils/package-json.js';
import { ModuleType } from '../enums/module-type.enum.js';

export async function buildPrettierConfig(options: Prompt) {
  const packageJSON = PackageJsonFile.instance;

  if (packageJSON.moduleType === ModuleType.MODULE) {
    EsjRender('prettier/prettier.config.module.ejs', 'prettier.config.mjs', options);
  }

  if (packageJSON.moduleType === ModuleType.COMMON) {
    EsjRender('prettier/prettier.config.common.ejs', 'prettier.config.cjs', options);
  }

  if (packageJSON.moduleType === ModuleType.DEFAULT) {
    EsjRender('prettier/prettier.config.default.ejs', '.prettierrc.json', options);
  }
}
