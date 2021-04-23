import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Base } from '../models/base';
import BaseService from '../providers/common/base.service';

@Injectable({
  providedIn: 'root',
})
export class GenericResolverGuard implements Resolve<Base> {
  constructor(private baseService: BaseService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const resolverData = route.data.resolverData;
    return this.baseService.get(`${resolverData.url}${route.params['id']}`)
    .pipe(
      map((result: any) => {
        return result;
      })
    );
  }
}
