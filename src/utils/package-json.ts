import fs from 'node:fs';
import { ModuleType } from '../enums/module-type.enum.js';

export class PackageJsonFile {
  public file: any;
  static #instance: PackageJsonFile;

  public static get instance(): PackageJsonFile {
    if (!PackageJsonFile.#instance) {
      const packageJson = new PackageJsonFile();
      packageJson.init();
      PackageJsonFile.#instance = packageJson;
    }

    return PackageJsonFile.#instance;
  }

  init() {
    try {
      const packageJSON = fs.readFileSync('./package.json', 'utf8');
      this.file = JSON.parse(packageJSON);
    } catch (e) {
      console.error(e);
    }
  }

  get moduleType(): ModuleType {
    const instance = PackageJsonFile.#instance;
    if (instance.file.type === ModuleType.MODULE) {
      return ModuleType.MODULE;
    }
    if (instance.file.type === ModuleType.COMMON) {
      return ModuleType.COMMON;
    }
    return ModuleType.DEFAULT;
  }

  addCommand(name: string, command: string | undefined): void {
    const instance = PackageJsonFile.#instance;
    if (!!instance.file.scripts[name]) {
      console.error(`Command with name ${name} already exist`);
      return;
    }
    instance.file.scripts[name] = command;
  }

  saveFile(): void {
    fs.writeFileSync('./package.json', JSON.stringify(PackageJsonFile.instance.file, null, 2));
  }
}
