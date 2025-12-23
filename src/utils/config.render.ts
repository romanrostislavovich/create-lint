import fs from 'node:fs';

export class ConfigRender {
  static writeString(path: string, content: string) {
    fs.writeFileSync(path, content);
  }

  static writeJson(path: string, data: unknown) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  }

  static writeCommonJs(path: string, data: unknown) {
    fs.writeFileSync(path, `module.exports = ${JSON.stringify(data, null, 2)};`);
  }

  static writeModuleJs(path: string, data: unknown) {
    fs.writeFileSync(path, `export default ${JSON.stringify(data, null, 2)};`);
  }
}
