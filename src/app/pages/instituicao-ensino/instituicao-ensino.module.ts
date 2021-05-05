import { NgModule } from '@angular/core';
import { EnderecoModule } from 'src/app/components/endereco/endereco.module';
import { MenuListModule } from 'src/app/components/menu-list/menu-list.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { SharedModule } from './../../shared/shared.module';
import { InstituicaoEditComponent } from './instituicao-edit/instituicao-edit.component';
import { InstituicaoEnsinoRoutingModule } from './instituicao-ensino-routing.module';
import { InstituicaoEnsinoComponent } from './instituicao-list/instituicao-ensino.component';

@NgModule({
  imports: [
    SharedModule,
    InstituicaoEnsinoRoutingModule,
    PaginationModule,
    MenuListModule,
    EnderecoModule,
  ],
  declarations: [InstituicaoEnsinoComponent, InstituicaoEditComponent],
})
export class InstituicaoEnsinoModule {}
