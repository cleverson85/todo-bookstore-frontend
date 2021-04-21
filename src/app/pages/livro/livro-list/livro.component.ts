import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { Genero } from 'src/app/models/genero';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { LivroService } from 'src/app/providers/livro.service';
import { ModalService } from 'src/app/providers/modal.service';
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
  placeholder = 'Nome';
  searchValue = SearchValuesLivro.Titulo;
  livros: Livro[];
  genero: Genero;
  generos: Genero[] = [];
  pages: number;

  constructor(
    private toasterService: ToasterService,
    private livroService: LivroService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getGeneros();
    this.getLivros();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getLivros(page?: number) {
    this.subscription.add(
      this.livroService.getLivros(page).subscribe((result: any) => {
            const { count, items } = result;
            this.livros = items;
            this.pages = count;
          }
        )
    );
  }

  getGeneros() {
    this.subscription.add(
      this.livroService.getGeneros().subscribe((result: any) => {
        this.generos = result;
        this.changeGenero(this.generos[0]);
      })
    );
  }

  find(description: string) {
    this.subscription.add(
      this.livroService.getLivrosByDescription(this.searchValue, description, this.genero)
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
    const { count, items } = result;
    this.livros = items;
    this.pages = count;
  }

  detalhes(livro: Livro) {
    this.modalService.showModal(livro);
  }

  onPageChange(page: any) {
    this.getLivros(page);
  }

  changePlaceholder(type: string, searchValue: string) {
    this.placeholder = type;
    this.searchValue = searchValue as SearchValuesLivro;
  }

  changeGenero(genero: Genero) {
    this.genero = genero;
  }
}
