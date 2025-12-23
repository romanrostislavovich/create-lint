import { EsjOptions } from '../../interfaces/esj-options.js';
import { Tools } from '../../enums/tools.js';

export function createStyleLintConfig(buildOptions: EsjOptions): any {
  const config = {
    extends: ['stylelint-config-standard'],
    plugins: ['stylelint-order'],
    rules: {},
  };

  if (buildOptions.tools.includes(Tools.Tailwind)) {
    // @ts-ignore
    config.extends.push('stylelint-config-tailwindcss');
  }
  return config;
}
