import { Endereco } from './endereco';
import { Instituicao } from './instituicao';
import { Pessoa } from './pessoa';
import { Base } from './base';
import { SituacaiAluno } from '../shared/enum/situacaoAluno.enum';

export interface Aluno extends Base {
  cpf: string;
  situacao: SituacaiAluno;
  pessoa: Pessoa;
  instituicaoEnsino: Instituicao;
  endereco: Endereco;
  instituicaoEnsinoId: number;
}
