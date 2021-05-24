import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { InstituicaoService } from 'src/app/providers/instituicao.service';
import { ModalService } from 'src/app/providers/modal.service';
import { Instituicao } from './../../../models/instituicao';

@Component({
  selector: 'app-instituicao-ensino',
  templateUrl: './instituicao-ensino.component.html',
  styleUrls: ['./instituicao-ensino.component.scss'],
})
export class InstituicaoEnsinoComponent implements OnInit, OnDestroy {
  @ViewChild(PaginationComponent) childPagination: PaginationComponent;
  @ViewChild('valueToSearch') valueToSearch: ElementRef;

  subscription = new Subscription();
  instituicao: Instituicao[];
  pages: number;

  constructor(
    private toasterService: ToasterService,
    private modalService: ModalService,
    private instituicaoService: InstituicaoService) { }

  ngOnInit() {
    this.getInstituicao();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getInstituicao(page?: number) {
    this.subscription.add(
      this.instituicaoService.getInstituicoes(page).subscribe((result: any) => {
          this.configureItens(result);
        }
      )
    );
  }

  find(page?: number) {
    this.subscription.add(
      this.instituicaoService.getByDescription(this.valueToSearch.nativeElement.value, page)
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
      this.instituicao = items;
      this.pages = count;
    }
  }

  onPageChange(page: any) {
    this.getInstituicao(page);
  }

  detalhes(instituicao: Instituicao) {
    this.modalService.showModal(instituicao);
  }
}
