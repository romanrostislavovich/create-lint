import { Frameworks } from '../enums/frameworks.js';
import { Tools } from '../enums/tools.js';

export interface Prompt {
  tools: Tools[];
  framework: Frameworks;
  installDeps: boolean;
}
