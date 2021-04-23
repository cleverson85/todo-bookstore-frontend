import { Emprestimo } from './../models/emprestimo';
import { Injectable } from '@angular/core';
import BaseService from './common/base.service';
import { Observable } from 'rxjs';
import { ApiRoute } from '../shared/enum/apiRoutes.enum';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService extends BaseService {
  getEmprestimos(page?: number): Observable<Emprestimo[]> {
    return this.get<Emprestimo[]>(
      `${ApiRoute.EMPRESTIMO_GETALL}?pagina=${page || 1}&itensPorPagina=${
        this.itemsPerPage
      }`
    );
  }

  getByDescription(description: string): Observable<Emprestimo[]> {
    if (description) {
      return this.post<any>({ description: description }, ApiRoute.EMPRESTIMO_DESCRIPTION);
    }
  }
}
