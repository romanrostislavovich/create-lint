import { EsjRender } from '../utils/esj-render.js';

export async function buildEditorConfig() {
  EsjRender('.editorconfig.ejs', '.editorconfig');
}
