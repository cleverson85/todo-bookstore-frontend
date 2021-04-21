import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Environment } from 'src/app/environment.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() pageChange = new EventEmitter();
  @Input() numberPages: number;

  subscription = new Subscription();
  config: any;
  totalPages: number;
  pages = [];

  constructor() { }

  ngOnInit() {
    let index = 0;
    while (index < this.numberPages) {
      this.pages.push(index);
      index++;
    }

    this.config = {
      itemsPerPage: Environment.settings.itensPerPage,
      currentPage: 1,
      totalItems: this.pages,
    };
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.pageChange.emit(event);
  }
}
