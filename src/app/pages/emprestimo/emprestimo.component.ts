import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { SearchValuesAluno } from 'src/app/shared/enum/searchValuesAluno.enum';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.scss']
})
export class EmprestimoComponent implements OnInit {
  @ViewChild(PaginationComponent) childPagination: PaginationComponent;

  subscription = new Subscription();
  placeholder = 'Nome';
  searchValue = SearchValuesAluno.Nome;
  alunos: any;

  constructor(private toasterService: ToasterService) { }

  ngOnInit() {
    
  }

  find(valueToSearch: string) {
    if (valueToSearch === '') {
      this.toasterService.showToastWarning(
        'Nenhum valor para pesquisa foi informado.'
      );
      return;
    }

    this.alunos = [];

    // this.subscription.add(
    //   this.countryService.getCountryByValueCustomApi(this.searchValue, valueToSearch)
    //     .subscribe((result: any) => {
    //         debugger;
    //         this.countries.push(...result);

    //       if (this.countries.length == 0 && result.length == 0) {
    //         this.toasterService.showToastWarning('Nenhuma informação encontrada.');
    //       }
    //     })
    // );
  }

  onPageChange(page: any) {}

  changePlaceholder(type: string, searchValue: string) {
    this.placeholder = type;
    this.searchValue = searchValue as SearchValuesAluno;
  }

}
