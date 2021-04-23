import { NgModule } from '@angular/core';
import { MenuListModule } from 'src/app/components/menu-list/menu-list.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlunoEditComponent } from './aluno-edit/aluno-edit.component';
import { AlunoComponent } from './aluno-list/aluno.component';
import { AlunoRoutingModule } from './aluno-routing.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [SharedModule, AlunoRoutingModule, MenuListModule, PaginationModule, NgxMaskModule.forRoot()],
  declarations: [AlunoComponent, AlunoEditComponent],
})
export class AlunoModule {}
