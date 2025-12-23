import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import ejs from 'ejs';
import { fileURLToPath } from 'node:url';
import { Tools } from '../enums/tools.js';
import { EsjOptions } from '../interfaces/esj-options.js';
import { createLintStagedConfig } from '../templates/lint-staged/lint-staged.config.js';
import { ConfigResolver } from '../config-resolver.js';
import { ModuleType } from '../enums/module-type.enum.js';
import { ConfigRender } from '../utils/config.render.js';
import { PackageJsonFile } from '../utils/package-json.js';

export async function setupHusky(options: EsjOptions) {
  const packageJSON = PackageJsonFile.instance;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePathTplHusky = path.resolve(__dirname, './../', 'templates', 'husky-pre-commit.ejs');

  const tplHusky = fs.readFileSync(filePathTplHusky, 'utf8');
  const outHusky = ejs.render(tplHusky, options);

  const lintStagedConfig = createLintStagedConfig(options);
  const lintStagedFileName = ConfigResolver.getConfigFileName(
    Tools.LintStaged,
    packageJSON.moduleType,
  );

  try {
    if (packageJSON.moduleType === ModuleType.MODULE) {
      ConfigRender.writeModuleJs(lintStagedFileName, lintStagedConfig);
    }

    if (packageJSON.moduleType === ModuleType.COMMON) {
      ConfigRender.writeCommonJs(lintStagedFileName, lintStagedConfig);
    }

    if (packageJSON.moduleType === ModuleType.DEFAULT) {
      ConfigRender.writeJson(lintStagedFileName, lintStagedConfig);
    }
  } catch (e) {
    console.error(e);
  }

  try {
    cp.execSync('npx husky init');
    cp.execSync('npx lint staged');

    if (!fs.existsSync('.husky')) {
      fs.mkdirSync('.husky');
    }

    fs.writeFileSync('.husky/pre-commit', outHusky, 'utf8');
    console.log('Husky hooks installed');
  } catch (e) {
    console.error(e);
    console.warn('Husky setup failed; run `npx husky install` manually.');
  }
}
