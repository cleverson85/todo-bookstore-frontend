import { NgModule } from '@angular/core';
import { MenuListModule } from 'src/app/components/menu-list/menu-list.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { SharedModule } from './../../shared/shared.module';
import { EmprestimoEditComponent } from './emprestimo-edit/emprestimo-edit.component';
import { EmprestimoRoutingModule } from './emprestimo-routing.module';
import { EmprestimoComponent } from './emprestimo.component';
import { DpDatePickerModule } from 'ng2-date-picker';

@NgModule({
  imports: [
    SharedModule,
    EmprestimoRoutingModule,
    PaginationModule,
    MenuListModule,
    DpDatePickerModule,
  ],
  declarations: [EmprestimoComponent, EmprestimoEditComponent],
})
export class EmprestimoModule {}
