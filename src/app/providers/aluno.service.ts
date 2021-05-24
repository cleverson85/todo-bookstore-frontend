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

  getAlunosByDescription(description: string, page?: number): Observable<Aluno[]> {
    if (description) {
      return this.get<any>(`${ApiRoute.ALUNO_DESCRIPTION}${description}?pagina=${page || 1}&itensPorPagina=${this.itemsPerPage}`);
    }

    return this.getAlunos(page);
  }
}
