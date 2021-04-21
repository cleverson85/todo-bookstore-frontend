import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { AuthService } from 'src/app/providers/auth.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(PaginationComponent) childPagination: PaginationComponent;

  subscription = new Subscription();
  placeholder = 'Country';
  
  countries: any;

  constructor(
    private toasterService: ToasterService,
    private authService: AuthService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

 

  isLastPage(): boolean {
    const currentPage = this.childPagination?.config.currentPage;
    const totalPages = this.childPagination?.totalPages;
    return currentPage == totalPages;
  }

  onPageChange(page: any) {
    
  }

  find(valueToSearch: string) {
    if (valueToSearch === '') {
      this.toaster.showToastWarning('Nenhum valor para pesquisa foi informado.');
      return;
    }
  }
}
