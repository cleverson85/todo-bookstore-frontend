import { SearchValuesAluno } from 'src/app/shared/enum/searchValuesAluno.enum';
import { Aluno } from './../models/aluno';
import { Injectable } from '@angular/core';
import { ApiRoute } from '../shared/enum/apiRoutes.enum';
import BaseService from './common/base.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends BaseService {

  getAlunos(page?: number): Observable<Aluno[]> {
    return this.get<Aluno[]>(
      `${ApiRoute.ALUNO_GETALL}?pagina=${page || 1}&itensPorPagina=${
        this.itemsPerPage
      }`
    );
  }

  getAlunosByDescription(
    searchValue: SearchValuesAluno,
    description: string,
  ): Observable<Aluno[]> {
    if (SearchValuesAluno.Nome === searchValue && description) {
      return this.get<Aluno[]>(
        `${ApiRoute.ALUNO_NOME}${description}?pagina=${1}&itensPorPagina=${
          this.itemsPerPage
        }`
      );
    }

    if (SearchValuesAluno.Cpf === searchValue && description) {
      return this.get<Aluno[]>(
        `${ApiRoute.ALUNO_CPF}${description}$?pagina=${1}&itensPorPagina=${
          this.itemsPerPage
        }`
      );
    }

    if (SearchValuesAluno.Email === searchValue && description) {
      return this.get<Aluno[]>(
        `${ApiRoute.ALUNO_EMAIL}${description}${description}?pagina=${1}&itensPorPagina=${
          this.itemsPerPage
        }`
      );
    }
  }

  getByDescription(description: string): Observable<Aluno[]> {
    return this.post<any>({ description: description }, ApiRoute.ALUNO_DESCRIPTION);
  }
}
