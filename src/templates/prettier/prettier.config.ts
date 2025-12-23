import { EsjOptions } from '../../interfaces/esj-options.js';
import { Tools } from '../../enums/tools.js';

export function createPrettierConfig(buildOptions: EsjOptions): any {
  const config = {
    semi: true,
    singleQuote: true,
    trailingComma: 'all',

    tabWidth: 2,
    printWidth: 100,
    bracketSpacing: true,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    overrides: [{ files: ['*.md'], options: { proseWrap: 'always' } }],
    plugins: [],
  };

  if (buildOptions.tools.includes(Tools.Tailwind)) {
    // @ts-ignore
    config.plugins.push('prettier-plugin-tailwindcss');
  }
  return config;
}
