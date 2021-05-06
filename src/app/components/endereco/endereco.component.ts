import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Endereco } from 'src/app/models/endereco';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
})
export class EnderecoComponent implements OnInit {
  @Input() data: any;
  @Input() submitted: boolean;
  @Output() enderecoEmitter = new EventEmitter();

  formGroupEndereco: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formGroupEndereco = new FormGroup({
      enderecoId: new FormControl(this.data?.enderecoId || 0),
      cep: new FormControl(this.data?.cep, Validators.required),
      logradouro: new FormControl(this.data?.logradouro, Validators.required),
      numero: new FormControl(this.data?.numero, Validators.required),
      bairro: new FormControl(this.data?.bairro, Validators.required),
      estado: new FormControl(this.data?.estado, Validators.required),
      cidade: new FormControl(this.data?.cidade, Validators.required),
      complemento: new FormControl(this.data?.complemento),
    });
  }

  hasError(field: string) {
    return this.formGroupEndereco.get(field)?.errors;
  }

  isValid(): boolean {
    return this.formGroupEndereco?.valid;
  }

  getControls(): any {
    return this.formGroupEndereco.controls;
  }
}
