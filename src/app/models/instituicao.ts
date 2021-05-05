import { Pessoa } from './pessoa';
import { Base } from './base';

export interface Instituicao extends Base {
  pessoaId: number;
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;

  enderecoId: number;
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
