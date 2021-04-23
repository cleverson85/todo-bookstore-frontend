import { Pessoa } from './pessoa';
import { Base } from './base';

export interface Instituicao extends Base {
  pessoa: Pessoa;
  cnpj: string;
}
