import { NgModule } from '@angular/core';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { EnderecoModule } from 'src/app/components/endereco/endereco.module';
import { MenuListModule } from 'src/app/components/menu-list/menu-list.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlunoEditComponent } from './aluno-edit/aluno-edit.component';
import { AlunoComponent } from './aluno-list/aluno.component';
import { AlunoRoutingModule } from './aluno-routing.module';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    SharedModule,
    AlunoRoutingModule,
    MenuListModule,
    PaginationModule,
    NgxMaskModule.forRoot(),
    EnderecoModule,
  ],
  declarations: [AlunoComponent, AlunoEditComponent],
})
export class AlunoModule {}
