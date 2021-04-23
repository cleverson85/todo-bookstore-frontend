import { Endereco } from './endereco';
import { Base } from './base';

export interface Pessoa extends Base {
  nome: string;
  email: string;
  telefone: string;
  endereco: Endereco;
}
