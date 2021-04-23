export enum ApiRoute {
  REGISTER = 'account/Register',
  LOGIN = 'auth/Login',

  LIVRO_GETALL = 'livro/GetAll',
  LIVRO_ID = 'livro/FindById/',
  LIVRO_AUTOR = 'livro/FindByAutor/',
  LIVRO_GENERO = 'livro/FindByGenero/',
  LIVRO_TITULO = 'livro/FindByTitulo/',
  LIVRO_SAVE = 'livro/Save',
  LIVRO_DESCRIPTION = 'livro/FindByDescription',
  GENEROS = 'livro/GetAllGeneros',

  ALUNO_ID = 'cliente/FindById/',
  ALUNO_GETALL = 'cliente/GetAll',
  ALUNO_NOME = 'cliente/FindByName/',
  ALUNO_CPF = 'cliente/FindByCpf/',
  ALUNO_EMAIL = 'cliente/FindByEmail/',
  ALUNO_SAVE = 'cliente/Save',
  ALUNO_DESCRIPTION = 'cliente/FindByDescription',

  INSTITUICAO_ID = 'instituicao/FindById/',
  INSTITUICAO_GETALL = 'instituicao/GetAll',
  INSTITUICAO_NOME = 'instituicao/FindByName/',
  INSTITUICAO_CNPJ = 'instituicao/FindByCpf/',
  INSTITUICAO_DESCRIPTION = 'instituicao/FindByDescription',
  INSTITUICAO_SAVE = 'instituicao/Save',

  EMPRESTIMO_ID = 'emprestimo/FindById/',
  EMPRESTIMO_GETALL = 'emprestimo/GetAll',
  EMPRESTIMO_DESCRIPTION = 'emprestimo/FindByDescription',
  EMPRESTIMO_SAVE = 'emprestimo/Save',
}