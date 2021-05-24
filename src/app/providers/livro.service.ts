import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Genero } from '../models/genero';
import { Livro } from '../models/livro';
import { ApiRoute } from '../shared/enum/apiRoutes.enum';
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
    return this.get<Livro[]>(`${ApiRoute.LIVRO_GETALL}?pagina=${page || 1}&itensPorPagina=${this.itemsPerPage}`).pipe(
      shareReplay(1),
      map((result: Livro[]) => {
        this.setLivro(result);
        return result;
      })
    );
  }

  getGeneros(): Observable<Genero[]> {
    return this.get<Genero[]>(`${ApiRoute.GENEROS}`).pipe(
      map((result: Genero[]) => {
        result.push({ id: 0, nome: 'Todos' });
        result = result.sort((a, b) => a.id - b.id);
        this.setGenero(result);
        return result;
      })
    );
  }

  getLivrosByDescription(description: string, genero?: Genero, page?: number): Observable<Livro[]> {
    page = page || 1;

    if (genero.id > 0 && !description) {
      return this.get<Livro[]>(
        `${ApiRoute.LIVRO_GENERO}${genero.id}?pagina=${page}&itensPorPagina=${this.itemsPerPage}`
      ).pipe(
        map((result: Livro[]) => {
          this.livro$ = of(result);
          return result;
        })
      );
    } else if (genero.id > 0 && description) {
      return this.get<Livro[]>(
        `${ApiRoute.LIVRO_GENERO_DESCRIPTION}${genero.id}/${description}?pagina=${page}&itensPorPagina=${this.itemsPerPage}`
      ).pipe(
        map((result: Livro[]) => {
          this.livro$ = of(result);
          return result;
        })
      );
    } else if (description) {
      return this.get<Livro[]>(
        `${ApiRoute.LIVRO_DESCRIPTION}${description}?pagina=${page}&itensPorPagina=${this.itemsPerPage}`
      ).pipe(
        shareReplay(1),
        map((result: Livro[]) => {
          this.livro$ = of(result);
          return result;
        })
      );
    }

    return this.getLivros(page);
  }

  salvar(formGroup: any, file: File) {
    file
      .arrayBuffer()
      .then((e: any) => {
        formGroup['ImagemCapa'] = btoa(new Uint8Array(e).reduce((data, byte) => data + String.fromCharCode(byte), ''));

        this.httpClient
          .post(this.API + ApiRoute.LIVRO_SAVE, formGroup)
          .subscribe(
            (result: any) => {
              this.toasterService.showToastSuccess(
                'Operação efetuada com sucesso.'
              );
              this.router.navigate(['livro']);
            },
            (err: HttpErrorResponse) => {
              const { error } = err;
              console.log('ERROR => ' + error);
              this.toasterService.showToastError(
                'Não foi possível exetuar a operação, tente novamente mais tarde.'
              );
            }
          );
      })
      .catch((e) => console.log(e));
  }
}
