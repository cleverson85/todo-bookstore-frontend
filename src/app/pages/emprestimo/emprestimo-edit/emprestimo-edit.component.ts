import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Aluno } from 'src/app/models/aluno';
import { Emprestimo } from 'src/app/models/emprestimo';
import { Livro } from 'src/app/models/livro';
import { AlunoService } from 'src/app/providers/aluno.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { LivroService } from 'src/app/providers/livro.service';
import { ApiRoute } from 'src/app/shared/enum/apiRoutes.enum';
import { EmprestimoService } from './../../../providers/emprestimo.service';

@Component({
  selector: 'app-emprestimo-edit',
  templateUrl: './emprestimo-edit.component.html',
  styleUrls: ['./emprestimo-edit.component.scss']
})
export class EmprestimoEditComponent implements OnInit, OnDestroy {

  emprestimo: Emprestimo;
  formGroup: FormGroup;
  subscription = new Subscription();
  titulo: string;
  submitted = false;
  emprestimos: Emprestimo[];
  alunos: Aluno[] = [];
  livros: Livro[] = [];
  alunoSelected: Aluno[] = [];
  livrosSelected: Livro[] = [];
  format = 'YYYY-MM-DD HH:mm:ss';

  get dataInicio() {
    return this.formGroup.get('dataInicio');
  }

  get dataDevolucao() {
    return this.formGroup.get('dataDevolucao');
  }

  get aluno() {
    return this.formGroup.get('cliente');
  }

  get livrosEmprestimo() {
    return this.formGroup.get('livrosEmprestimo');
  }

  constructor(
    private formBuilder: FormBuilder,
    private emprestimoService: EmprestimoService,
    private livroService: LivroService,
    private alunoService: AlunoService,
    private toasterService: ToasterService
  ) { }

  datePickerConfig = {
    format: 'DD/MM/YYYY',
    locale: 'pt-BR',
  };

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      dataInicio: ['' , Validators.required],
      dataDevolucao: ['', Validators.required],
      cliente: [''],
      livrosEmprestimo: [''],
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    if (this.validarDatas() && this.formGroup.valid) {
      this.emprestimoService.salvar(ApiRoute.EMPRESTIMO_SAVE, this.formGroup.value, 'home');
    }
  }

  validarDatas() {
    if (!this.dataInicio.value || !this.dataDevolucao.value) {
      this.toasterService.showToastWarning('Data inicio e data para entrega devem ser informadas.');
    }

    if (this.dataInicio.value > this.dataDevolucao.value) {
      this.toasterService.showToastWarning('Data inicio não pode ser maior que a data fim.');
      return;
    }

    if (moment(this.dataInicio.value).format('L') < moment().format('L')) {
      this.toasterService.showToastWarning('Data inicio deve ser maior que a data atual.');
      return;
    }

    if (moment(this.dataDevolucao.value).isAfter(moment().add(30, 'days'))) {
      this.toasterService.showToastWarning('Data para entrega não pode ser maior que 30 dias;');
      return;
    }

    return true;
  }

  addDataInicio(event: any) {
    if (moment(event).format('L') < moment().format('L')) {
      this.toasterService.showToastWarning('Data inicio deve ser maior que a data atual.');
      return;
    }

    this.dataInicio.setValue(moment(event).format(this.format))
  }

  addDataFim(event: any) {
    if (moment(event).isAfter(moment().add(30, 'days'))) {
      this.toasterService.showToastWarning('Data para entrega não pode ser maior que 30 dias;');
      return;
    }

    this.dataDevolucao.setValue(moment(event).format(this.format));
  }

  findLivros(description: string) {
    this.subscription.add(
      this.livroService.getLivrosByDescription(description)
        .subscribe((result: any) => {
          if (description === '') {
            this.livros = [];
            return;
          }

          const { count, items } = result;
          this.livros = items;
        })
    );
  }

  findAlunos(description: string) {
    this.subscription.add(
      this.alunoService.getAlunosByDescription(description)
        .subscribe((result: any) => {
          if (description === '') {
            this.alunos = []
            return;
          }

          const { count, items } = result;
          this.alunos = items;
        })
    );
  }

  adicionarAluno(item: Aluno) {
    this.alunoSelected.push(item);
    this.aluno.setValue(item.id);

    this.alunos = [];
  }

  removerAluno() {
    this.alunoSelected.splice(0);
    this.aluno.reset();
  }

  adicionarLivro(item: Livro) {
    if (this.livrosSelected.length === 2) {
      this.toasterService.showToastWarning('Número máximo de livros para empréstimo atingido. Máximo 2 livros por usuário')
      return;
    }

    this.livrosSelected.push(item);
    this.livrosEmprestimo.setValue(this.livrosSelected.map((e) => e.id ));
  }

  removerLivro(item: Livro) {
    this.livrosSelected.splice(0, 1);
    this.livrosEmprestimo.setValue(this.livrosSelected);

    if (this.livrosSelected.length === 0) {
      this.livrosEmprestimo.reset();
    }
  }
}
