import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Environment } from '../environment.service';
import { Genero } from '../models/genero';
import { Livro } from '../models/livro';
import { ApiRoute } from '../shared/enum/apiRoutes.enum';
import { SearchValuesLivro } from '../shared/enum/searchValuesLivro.enum';
import BaseService from './common/base.service';

@Injectable({
  providedIn: 'root',
})
export class LivroService extends BaseService {
  livroSubject$ = new BehaviorSubject<any>({});
  livro$ = this.livroSubject$.asObservable();

  generoSubject$ = new BehaviorSubject<any>({});
  genero$ = this.generoSubject$.asObservable();

  setLivro(value: any) {
    this.livroSubject$.next(value);
  }

  setGenero(value: any) {
    this.generoSubject$.next(value);
  }

  getLivros(page?: number): Observable<Livro[]> {
    return this.get<Livro[]>(
      `${ApiRoute.LIVRO_GETALL}?pagina=${page || 1}&itensPorPagina=${
        this.itemsPerPage
      }`
    );
  }

  getGeneros() {
    return this.get<Genero[]>(`${ApiRoute.GENEROS}`)
      .pipe(
        map((result: Genero[]) => {
          result.push({ id: 0, nome: 'Todos' });
          result = result.sort((a, b) => a.id - b.id);
          return result;
        })
      );
  }

  getLivrosByDescription(
    searchValue: SearchValuesLivro,
    description: string,
    genero: Genero
  ): Observable<Livro[]> {
    if (SearchValuesLivro.Autor === searchValue && description) {
      return this.get<Livro[]>(
        `${ApiRoute.LIVRO_AUTOR}${description}?generoId=${genero.id}&pagina=${1}&itensPorPagina=${
          this.itemsPerPage
        }`
      );
    }

    if (genero.id > 0 && !description) {
      return this.get<Livro[]>(
        `${ApiRoute.LIVRO_GENERO}${genero.id}?pagina=${1}&itensPorPagina=${
          this.itemsPerPage
        }`
      );
    }

    if (SearchValuesLivro.Titulo === searchValue && description) {
      return this.get<Livro[]>(
        `${ApiRoute.LIVRO_TITULO}${description}?generoId=${genero.id}&pagina=${1}&itensPorPagina=${
          this.itemsPerPage
        }`
      );
    }
  }

  salvar(formGroup: any, file: File) {
    file.arrayBuffer().then((e: any) => {
      formGroup['ImagemCapa'] = btoa(new Uint8Array(e).reduce(
        (data, byte) => data + String.fromCharCode(byte), ''
      ));

      this.httpClient.post(this.API + ApiRoute.LIVRO_SAVE, formGroup)
        .subscribe((result: any) => {
            this.toasterService.showToastSuccess('Operação efetuada com sucesso.');
            this.router.navigate(['livro']);
          },
          (err: HttpErrorResponse) => {
            const { error } = err;
            console.log('ERROR => ' + error);
            this.toasterService.showToastError('Não foi possível exetuar a operação, tente novamente mais tarde.');
          }
        );
    }).catch(e => console.log(e));
  }

  getByDescription(description: string): Observable<Livro[]> {
    return this.post<any>({ description: description }, ApiRoute.LIVRO_DESCRIPTION);
  }
}
