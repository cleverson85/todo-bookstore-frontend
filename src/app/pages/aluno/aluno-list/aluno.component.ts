import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/providers/aluno.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { ModalService } from 'src/app/providers/modal.service';
import { SearchValuesAluno } from 'src/app/shared/enum/searchValuesAluno.enum';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss'],
})
export class AlunoComponent implements OnInit, OnDestroy {
  @ViewChild(PaginationComponent) childPagination: PaginationComponent;
  @ViewChild('valueToSearch') valueToSearch: ElementRef;

  subscription = new Subscription();
  placeholder = 'Nome';
  searchValue = SearchValuesAluno.Nome;
  alunos: Aluno[];
  pages: number;

  constructor(
    private toasterService: ToasterService,
    private modalService: ModalService,
    private alunoService: AlunoService
  ) { }

  ngOnInit() {
    this.getAlunos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAlunos(page?: number) {
    this.subscription.add(
      this.alunoService.getAlunos(page).subscribe((result: any) => {
          this.configureItens(result);
        }
      )
    );
  }

  find(page?: number) {
    this.subscription.add(
      this.alunoService.getAlunosByDescription(this.valueToSearch.nativeElement.value, page)
        .subscribe((result: any) => {
          if (result?.items.length === 0) {
            this.toasterService.showToastWarning('Nenhum item foi encontrado.');
            return;
          }

          this.configureItens(result);
        })
    );
  }

  configureItens(result: any) {
    if (result) {
      const { count, items } = result;
      this.alunos = items;
      this.pages = count;
    }
  }

  detalhes(aluno: Aluno) {
    this.modalService.showModal(aluno);
  }

  onPageChange(page: any) {
    this.getAlunos(page);
  }

  changePlaceholder(type: string, searchValue: string) {
    this.placeholder = type;
    this.searchValue = searchValue as SearchValuesAluno;
  }
}
