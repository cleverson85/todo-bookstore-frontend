import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunoService } from 'src/app/providers/aluno.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { InstituicaoService } from 'src/app/providers/instituicao.service';
import { ApiRoute } from 'src/app/shared/enum/apiRoutes.enum';
import { SituacaiAluno } from 'src/app/shared/enum/situacaoAluno.enum';
import { Aluno } from './../../../models/aluno';
import { Instituicao } from './../../../models/instituicao';

@Component({
  selector: 'app-aluno-edit',
  templateUrl: './aluno-edit.component.html',
  styleUrls: ['./aluno-edit.component.scss']
})
export class AlunoEditComponent implements OnInit, OnDestroy {
  aluno: Aluno;
  formGroup: FormGroup;
  subscription = new Subscription();
  titulo: string;
  selectedInstituicao: Instituicao;
  submitted = false;
  url: any;
  file: File;
  instituicoes: Instituicao[];

  get instituicao() {
    return this.formGroup.get('instituicaoEnsinoId');
  }

  get situacao() {
    return this.formGroup.get('situacao');
  }

  get situacaoView() {
    return this.formGroup.get('situacaoView');
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private instituicaoService: InstituicaoService,
    private alunoService: AlunoService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.aluno = this.activatedRoute.snapshot.data['aluno'];

    console.log(this.aluno);

    this.formGroup = this.formBuilder.group({
      id: [this.aluno?.id || 0],
      pessoaId: [this.aluno?.pessoa?.id || 0],
      nome: [this.aluno?.pessoa?.nome, Validators.required],
      cpf: [this.aluno?.cpf, Validators.required],
      telefone: [this.aluno?.pessoa?.telefone, Validators.required],
      email: [this.aluno?.pessoa?.email],
      situacaoView: [SituacaiAluno.Ativo ? true : false],
      situacao: [''],

      enderecoId: [this.aluno?.pessoa?.endereco.id || 0],
      cep: [this.aluno?.pessoa?.endereco?.cep],
      logradouro: [this.aluno?.pessoa?.endereco?.logradouro],
      numero: [this.aluno?.pessoa?.endereco?.numero || 0],
      bairro: [this.aluno?.pessoa?.endereco?.bairro],
      complemento: [this.aluno?.pessoa?.endereco?.complemento],
      estado: [this.aluno?.pessoa?.endereco?.estado],
      cidade: [this.aluno?.pessoa?.endereco?.cidade],

      instituicaoEnsinoId: [this.aluno?.instituicaoEnsinoId, Validators.required]
    });

    console.log(this.formGroup.value);

    this.configureTitle(this.aluno);
    this.configurarInstituicao();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hasError(field: string) {
    return this.formGroup.get(field)?.errors;
  }

  save() {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.configurarValores();
      this.alunoService.salvar(ApiRoute.ALUNO_SAVE, this.formGroup.value, 'aluno');
    }
  }

  configurarValores() {
    this.situacao.setValue(this.situacaoView.value ? SituacaiAluno.Ativo  : SituacaiAluno.Bloqueado);
  }

  configurarInstituicao() {
    this.subscription.add(
      this.instituicaoService.getInstituicoes()
        .subscribe((result: any) => {
          this.instituicoes = result?.items;

          if (this.aluno?.instituicaoEnsino) {
            this.selectedInstituicao = this.instituicoes.find((e: Instituicao) => e.id === this.instituicao.value);
            this.instituicao.setValue(this.selectedInstituicao);
          }
        })
    );
  }

  changeInstituicao(value: any) {
    this.instituicao.setValue(value);
  }

  configureTitle(aluno: Aluno) {
    this.titulo = aluno?.id > 0 ? 'Editar Aluno' : 'Cadastrar Aluno';
  }

  carregaEndereco(event: any) {
    // this.alunoService.getUrl<any>(`https://viacep.com.br/ws/${event.target.value}/json/`).subscribe((result: any) => {
    //   console.log(result);
    // });
  }
}
