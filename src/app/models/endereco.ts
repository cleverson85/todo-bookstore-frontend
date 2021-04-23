import { Base } from './base';

export interface Endereco extends Base {
  cep: string;
  bairro: string;
  logradouro: string;
  complemento: string;
  numero: number;
  estado: string;
  cidade: string;
  localidade: string;
  uf: string;
}
