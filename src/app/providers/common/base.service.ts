import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Environment } from 'src/app/environment.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
class BaseService {
  protected readonly API = Environment.settings.api.url;

  constructor(protected httpClient: HttpClient,
              protected toasterService: ToasterService,
              protected router: Router) { }

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
}

export default BaseService;
