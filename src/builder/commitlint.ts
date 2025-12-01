import { EsjRender } from '../utils/esj-render.js';

export async function buildCommitLint() {
  EsjRender('commitlint.config.ejs', 'commitlint.config.cjs');
}
