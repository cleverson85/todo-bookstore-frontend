import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Environment } from 'src/app/environment.service';
import { ApiRoute } from 'src/app/shared/enum/apiRoutes.enum';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
class BaseService {
  protected readonly API = Environment.settings.api.url;
  itemsPerPage = Environment.settings.itensPerPage;

  constructor(protected httpClient: HttpClient,
              protected toasterService: ToasterService,
              protected router: Router) { }

  getUrl<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  get<T>(route: string): Observable<T> {
    return this.httpClient.get<T>(this.API + route);
  }

  post<T>(Entity: T, route: string): Observable<T> {
    return this.httpClient.post<T>(this.API + route, Entity);
  }

  getById<T>(route: string, id: number): Observable<T> {
    return this.httpClient.get<T>(this.API + route + id);
  }

  update<T>(Entity: T, route: string): Observable<T> {
    return this.httpClient.put<T>(this.API + route, Entity);
  }

  delete<T>(id: number, route: string): Observable<T> {
    return this.httpClient.delete<T>(this.API + route + id);
  }

  salvar(apiRoute: ApiRoute, formGroup: any, routerReturn: string) {
    console.log(formGroup);
    this.httpClient.post(this.API + apiRoute, formGroup)
      .subscribe((result: any) => {
          this.toasterService.showToastSuccess('Operação efetuada com sucesso.');
          this.router.navigate([routerReturn]);
        },
        (err: HttpErrorResponse) => {
          const { error } = err;
          console.log('ERROR => ' + error);
          this.toasterService.showToastError('Não foi possível exetuar a operação, tente novamente mais tarde.');
        }
      );
  }
}

export default BaseService;
