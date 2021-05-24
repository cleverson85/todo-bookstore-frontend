import { Base } from './base';
import { Genero } from './genero';

export interface Livro extends Base {
  titulo:	string;
  genero:	Genero;
  autor:	string;
  sinopse:	string;
  imagemCapa:	any;
  disponivel: boolean;
}
