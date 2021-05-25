import { EnderecoService } from './../../providers/endereco.service';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,

  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,

  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { Endereco } from 'src/app/models/endereco';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
})
export class EnderecoComponent implements OnInit, OnDestroy {
  @Input() data: Endereco;
  @Input() submitted: boolean;
  @Output() enderecoEmitter = new EventEmitter();

  subscription = new Subscription();
  formGroupEndereco: FormGroup;
  estados: any = [];
  municipios: any = [];

  get estado() {
    return this.formGroupEndereco.get('estado');
  }

  get cidade() {
    return this.formGroupEndereco.get('cidade');
  }

  constructor(private enderecoService: EnderecoService) { }

  ngOnInit() {
    this.formGroupEndereco = new FormGroup({
      enderecoId: new FormControl(this.data?.id || 0),
      cep: new FormControl(this.data?.cep, Validators.required),
      logradouro: new FormControl(this.data?.logradouro, Validators.required),
      numero: new FormControl(this.data?.numero, Validators.required),
      bairro: new FormControl(this.data?.bairro, Validators.required),
      estado: new FormControl(this.data?.estado, Validators.required),
      cidade: new FormControl(this.data?.cidade, Validators.required),
      complemento: new FormControl(this.data?.complemento),
    });

    this.getEstados();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hasError(field: string): any {
    return this.formGroupEndereco.get(field)?.errors;
  }

  isValid(): boolean {
    return this.formGroupEndereco?.valid;
  }

  getControls(): any {
    return this.formGroupEndereco.controls;
  }

  configureEstado() {
    if (this.estado.value) {
      this.estado.patchValue(parseInt(this.estado.value, 10));
    }
  }

  configureCidade() {
    if (this.cidade.value) {
      this.cidade.patchValue(parseInt(this.cidade.value, 10));
    }
  }

  setEstado(value: any) {
    if (value) {
      const { id, sigla, nome } = value;
      this.getMunicipios(sigla);
    }
  }

  setCidade(value: any) {
    if (value) {
      this.cidade.setValue(value.id);
    }
  }

  configureEndereco(result: any) {
    const { bairro, cep, complemento, localidade, logradouro, uf } = result;
    this.setEndereco({ bairro, cep, complemento, localidade, logradouro, uf });

    const estadoSelected = this.estados.find((e: any) => e.sigla === uf);
    this.estado.patchValue(estadoSelected?.id);

    this.subscription.add(
      this.enderecoService.getMunicipios(uf)
        .subscribe((res: any) => {
          this.municipios = [...res];
          const municipioSelected = this.municipios.find((e: any) => e.nome === localidade);
          this.cidade.patchValue(municipioSelected?.id);
        }),
    );
  }

  setEndereco({ bairro, cep, complemento, localidade, logradouro, uf }) {
    this.formGroupEndereco.get('bairro').setValue(bairro);
    this.formGroupEndereco.get('cep').setValue(cep);
    this.formGroupEndereco.get('complemento').setValue(complemento);
    this.formGroupEndereco.get('cidade').setValue(localidade);
    this.formGroupEndereco.get('logradouro').setValue(logradouro);
    this.formGroupEndereco.get('estado').setValue(uf);
  }

  async dadosCep(event: any) {
    if (event) {
      const result = await this.enderecoService.getDadosCep(event);
      this.configureEndereco(result);
    }
  }

  getEstados() {
    this.subscription.add(
      this.enderecoService.getEstados()
        .subscribe((result: any) => {
          this.estados = [...result];
          this.dadosCep(this.data?.cep);
        }),
    );
  }

  getMunicipios(uf: string) {
    this.subscription.add(
      this.enderecoService.getMunicipios(uf)
        .subscribe((result: any) => {
          this.municipios = [...result];
        }),
    );
  }
}
