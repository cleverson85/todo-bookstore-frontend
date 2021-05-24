import { Injectable } from '@angular/core';
import BaseService from './common/base.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService extends BaseService {

  getDadosCep(event: any): any {
    if (event) {
      return fetch(`https://viacep.com.br/ws/${event.target.value}/json/`)
        .then((result) => result.json());
    }
  }

  getEstados(): any {
    return this.httpClient.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`,
    );
  }

  getMunicipios(uf: string): any {
    return this.httpClient.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
      );
  }
}
