import { Prompt } from './prompt.js';
import { Tools } from '../enums/tools.js';

export type EsjOptions = Prompt & {
  commandRunDictionary: Map<Tools, string>;
};
