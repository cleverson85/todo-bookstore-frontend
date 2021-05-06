import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { Genero } from 'src/app/models/genero';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { LivroService } from 'src/app/providers/livro.service';
import { ModalService } from 'src/app/providers/modal.service';
import { ApiRoute } from 'src/app/shared/enum/apiRoutes.enum';
import { SearchValuesLivro } from 'src/app/shared/enum/searchValuesLivro.enum';
import { Livro } from './../../../models/livro';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.scss'],
})
export class LivroComponent implements OnInit, OnDestroy {
  @ViewChild(PaginationComponent) childPagination: PaginationComponent;

  subscription = new Subscription();
  searchValue = SearchValuesLivro.Titulo;
  livros: Livro[];
  genero: Genero;
  generos: Genero[] = [];
  pages: number;
  routeApi = ApiRoute.LIVRO_DELETE;

  constructor(
    private toasterService: ToasterService,
    private livroService: LivroService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.livroService.getLivros(1).subscribe((result: any) => {
        this.configureItens(result);
      }
    ));

    this.subscription.add(
      this.livroService.getGeneros().subscribe((result: any) => {
        this.generos = result;
        this.changeGenero(this.generos[0]);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getLivros(page?: number) {
    this.subscription.add(
      this.livroService.getLivros(page).subscribe((result: any) => {
          this.configureItens(result);
        }
      ));
  }

  getGeneros() {
    this.subscription.add(
      this.livroService.genero$.subscribe((result: any) => {
        this.generos = result;
        this.changeGenero(this.generos[0]);
      })
    );
  }

  find(description: string) {
    this.subscription.add(
      this.livroService.getLivrosByDescription(description, this.genero)
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
      this.livros = items;
      this.pages = count;
    }
  }

  detalhes(livro: Livro) {
    this.modalService.showModal(livro);
  }

  onPageChange(page: any) {
    this.getLivros(page);
  }

  changeGenero(genero: Genero) {
    this.genero = genero;
  }

  reloadList(event: any) {
    const { value } = event;
    this.livros = value.items;
  }
}
