import { SituacaiAluno } from '../shared/enum/situacaoAluno.enum';
import { Base } from './base';

export interface Aluno extends Base {
  cpf: string;
  situacao: SituacaiAluno;

  pessoaId: number;
  nome: string;
  email: string;
  telefone: string;

  instituicaoEnsinoId: number;

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
