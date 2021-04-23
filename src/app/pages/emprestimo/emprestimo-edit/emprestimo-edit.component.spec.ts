/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmprestimoEditComponent } from './emprestimo-edit.component';

describe('EmprestimoEditComponent', () => {
  let component: EmprestimoEditComponent;
  let fixture: ComponentFixture<EmprestimoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprestimoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprestimoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
