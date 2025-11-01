import inquirer from 'inquirer';
import { presets } from './presets.js';
import { choosePackageManager } from './packageManager.js';
import { Frameworks } from './enums/frameworks.js';
import { Tools } from './enums/tools.js';
import { Prompt } from './interfaces/prompt.js';
import { PackageManagers } from './enums/package-managers.js';

const frameworks = [
  Frameworks.Vue,
  Frameworks.React,
  Frameworks.NextJS,
  Frameworks.Svelte,
  Frameworks.Angular,
  Frameworks.VanillaJSorTS,
];

const tools = [
  Tools.TypeScript,
  Tools.Prettier,
  Tools.Stylelint,
  Tools.Tailwind,
  Tools.Husky,
  Tools.EditorConfig,
  Tools.Jest,
];

export async function runPrompts(): Promise<Prompt & { manager: PackageManagers }> {
  const { usePreset } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'usePreset',
      message: 'Use a preset configuration?',
      default: true,
    },
  ]);

  if (usePreset) {
    const { presetName } = await inquirer.prompt([
      {
        type: 'list',
        name: 'presetName',
        message: 'Choose a preset:',
        choices: Object.keys(presets),
      },
    ]);
    const answers = presets[presetName];

    const manager: PackageManagers = await choosePackageManager();

    return { ...answers, manager };
  }

  const answers = await inquirer.prompt<Prompt>([
    {
      type: 'list',
      name: 'framework',
      message: 'Choose framework:',
      choices: frameworks,
    },
    {
      type: 'checkbox',
      name: 'tools',
      message: 'Choose tools:',
      choices: tools,
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: 'Install devDependencies automatically?',
      default: true,
    },
  ]);

  const manager: PackageManagers = await choosePackageManager();

  return { ...answers, manager };
}
