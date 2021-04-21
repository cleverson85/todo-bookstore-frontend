import { NgModule } from '@angular/core';
import { MenuListModule } from 'src/app/components/menu-list/menu-list.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { SharedModule } from './../../shared/shared.module';
import { InstituicaoEnsinoRoutingModule } from './instituicao-ensino-routing.module';
import { InstituicaoEnsinoComponent } from './instituicao-ensino.component';

@NgModule({
  imports: [SharedModule, InstituicaoEnsinoRoutingModule, PaginationModule, MenuListModule],
  declarations: [InstituicaoEnsinoComponent],
})
export class InstituicaoEnsinoModule {}