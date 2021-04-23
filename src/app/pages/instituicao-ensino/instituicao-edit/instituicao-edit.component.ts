import { Instituicao } from './../../../models/instituicao';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InstituicaoService } from 'src/app/providers/instituicao.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { ApiRoute } from 'src/app/shared/enum/apiRoutes.enum';

@Component({
  selector: 'app-instituicao-edit',
  templateUrl: './instituicao-edit.component.html',
  styleUrls: ['./instituicao-edit.component.scss']
})
export class InstituicaoEditComponent implements OnInit, OnDestroy {
  instituicao: Instituicao;
  formGroup: FormGroup;
  subscription = new Subscription();
  titulo: string;
  submitted = false;
  instituicoes: Instituicao[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private instituicaoService: InstituicaoService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.instituicao = this.activatedRoute.snapshot.data['instituicao'];

    this.formGroup = this.formBuilder.group({
      id: [this.instituicao?.id || 0],
      pessoaId: [this.instituicao?.pessoa?.id],
      nome: [this.instituicao?.pessoa?.nome, Validators.required],
      cnpj: [this.instituicao?.cnpj, Validators.required],
      telefone: [this.instituicao?.pessoa?.telefone, Validators.required],

      enderecoId: [this.instituicao.pessoa.endereco.id],
      cep: [this.instituicao?.pessoa?.endereco?.cep, Validators.required],
      logradouro: [this.instituicao?.pessoa?.endereco?.logradouro, Validators.required],
      numero: [this.instituicao?.pessoa?.endereco?.numero, Validators.required],
      bairro: [this.instituicao?.pessoa?.endereco?.bairro, Validators.required],
      estado: [this.instituicao?.pessoa?.endereco?.estado, Validators.required],
      cidade: [this.instituicao?.pessoa?.endereco?.cidade, Validators.required],
      complemento: [this.instituicao?.pessoa?.endereco?.complemento],
    });

    this.configureTitle(this.instituicao);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.instituicaoService.salvar(ApiRoute.INSTITUICAO_SAVE, this.formGroup.value, 'instituicao');
    }
  }

  hasError(field: string) {
    return this.formGroup.get(field)?.errors;
  }

  configureTitle(instituicao: Instituicao) {
    this.titulo = instituicao?.id > 0 ? 'Editar Instituição' : 'Cadastrar Instituição';
  }

  carregaEndereco(event: any) {
    // this.alunoService.getUrl<any>(`https://viacep.com.br/ws/${event.target.value}/json/`).subscribe((result: any) => {
    //   console.log(result);
    // });
  }
}
