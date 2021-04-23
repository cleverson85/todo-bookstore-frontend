/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InstituicaoService } from './instituicao.service';

describe('Service: Instituicao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstituicaoService]
    });
  });

  it('should ...', inject([InstituicaoService], (service: InstituicaoService) => {
    expect(service).toBeTruthy();
  }));
});
