import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EnderecoComponent } from 'src/app/components/endereco/endereco.component';
import { InstituicaoService } from 'src/app/providers/instituicao.service';
import { ApiRoute } from 'src/app/shared/enum/apiRoutes.enum';
import { Instituicao } from './../../../models/instituicao';

@Component({
  selector: 'app-instituicao-edit',
  templateUrl: './instituicao-edit.component.html',
  styleUrls: ['./instituicao-edit.component.scss']
})
export class InstituicaoEditComponent implements OnInit, OnDestroy {
  @ViewChild(EnderecoComponent) childEndereco: EnderecoComponent;

  instituicao: Instituicao;
  formGroup: FormGroup;
  subscription = new Subscription();
  titulo: string;
  submitted = false;
  instituicoes: Instituicao[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private instituicaoService: InstituicaoService
  ) { }

  ngOnInit() {
    this.instituicao = this.activatedRoute.snapshot.data['instituicao'];

    this.formGroup = this.formBuilder.group({
      id: [this.instituicao?.id || 0],
      pessoaId: [this.instituicao?.pessoa.id || 0],
      nome: [this.instituicao?.pessoa.nome, Validators.required],
      cnpj: [this.instituicao?.cnpj, Validators.required],
      telefone: [this.instituicao?.pessoa.telefone, Validators.required],
    });

    this.configureTitle(this.instituicao);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.submitted = true;

    if (this.formGroup.valid && this.childEndereco?.isValid()) {

      const controls = this.childEndereco.getControls();
      Object.entries(controls).map((e: any) => {
        this.formGroup.addControl(e[0], e[1]);
      });

      this.instituicaoService.salvar(ApiRoute.INSTITUICAO_SAVE, this.formGroup.value, 'instituicao');
    }
  }

  hasError(field: string) {
    return this.formGroup.get(field)?.errors;
  }

  configureTitle(instituicao: Instituicao) {
    this.titulo = instituicao?.id > 0 ? 'Editar Instituição' : 'Cadastrar Instituição';
  }
}
