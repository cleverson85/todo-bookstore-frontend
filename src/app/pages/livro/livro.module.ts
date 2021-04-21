import { NgModule } from '@angular/core';
import { MenuListModule } from 'src/app/components/menu-list/menu-list.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { SharedModule } from './../../shared/shared.module';
import { LivroEditComponent } from './livro-edit/livro-edit.component';
import { LivroComponent } from './livro-list/livro.component';
import { LivroRoutingModule } from './livro-routing.module';

@NgModule({
  imports: [SharedModule, LivroRoutingModule, PaginationModule, MenuListModule],
  declarations: [LivroComponent, LivroEditComponent],
})
export class LivroModule {}
