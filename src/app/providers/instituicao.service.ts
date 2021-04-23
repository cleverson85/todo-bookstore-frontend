import { Instituicao } from './../models/instituicao';
import { Injectable } from '@angular/core';
import BaseService from './common/base.service';
import { Observable } from 'rxjs';
import { ApiRoute } from '../shared/enum/apiRoutes.enum';

@Injectable({
  providedIn: 'root',
})
export class InstituicaoService extends BaseService {
  getInstituicoes(page?: number): Observable<Instituicao[]> {
    return this.get<Instituicao[]>(
      `${ApiRoute.INSTITUICAO_GETALL}?pagina=${page || 1}&itensPorPagina=${
        this.itemsPerPage
      }`
    );
  }

  getByDescription(description: string): Observable<Instituicao[]> {
    if (description) {
      return this.post<any>({ description: description }, ApiRoute.INSTITUICAO_DESCRIPTION);
    }
  }
}
