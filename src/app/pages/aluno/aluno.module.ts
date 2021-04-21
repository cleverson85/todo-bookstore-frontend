import { NgModule } from '@angular/core';
import { AlunoComponent } from './aluno.component';
import { AlunoRoutingModule } from './aluno-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuListModule } from 'src/app/components/menu-list/menu-list.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';

@NgModule({
  imports: [SharedModule, MenuListModule, PaginationModule, AlunoRoutingModule],
  declarations: [AlunoComponent],
})
export class AlunoModule {}
