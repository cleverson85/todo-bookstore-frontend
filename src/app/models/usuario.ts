import { Base } from './base';

export interface Usuario extends Base {
  email: string;
  senha: string;
}
