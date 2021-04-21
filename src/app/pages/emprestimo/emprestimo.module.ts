import { NgModule } from '@angular/core';
import { MenuListModule } from 'src/app/components/menu-list/menu-list.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { SharedModule } from './../../shared/shared.module';
import { EmprestimoRoutingModule } from './emprestimo-routing.module';
import { EmprestimoComponent } from './emprestimo.component';

@NgModule({
  imports: [
    SharedModule,
    EmprestimoRoutingModule,
    PaginationModule,
    MenuListModule,
  ],
  declarations: [EmprestimoComponent],
})
export class EmprestimoModule {}
