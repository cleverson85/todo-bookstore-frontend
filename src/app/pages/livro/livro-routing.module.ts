import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericResolverGuard } from 'src/app/guards/generic.resolver.guard';
import { ApiRoute } from './../../shared/enum/apiRoutes.enum';
import { LivroEditComponent } from './livro-edit/livro-edit.component';
import { LivroComponent } from './livro-list/livro.component';

const routes: Routes = [
  {
    path: '',
    component: LivroComponent
  },
  {
    path: ':id',
    component: LivroEditComponent,
    resolve: { livro: GenericResolverGuard },
    data: { resolverData: { url: `${ApiRoute.LIVRO_ID}` } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivroRoutingModule {}
