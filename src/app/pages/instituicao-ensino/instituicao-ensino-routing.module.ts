import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericResolverGuard } from 'src/app/guards/generic.resolver.guard';
import { ApiRoute } from 'src/app/shared/enum/apiRoutes.enum';
import { InstituicaoEditComponent } from './instituicao-edit/instituicao-edit.component';
import { InstituicaoEnsinoComponent } from './instituicao-list/instituicao-ensino.component';

const routes: Routes = [
  {
    path: '',
    component: InstituicaoEnsinoComponent
  },
  {
    path: ':id',
    component: InstituicaoEditComponent,
    resolve: { instituicao: GenericResolverGuard },
    data: { resolverData: { url: `${ApiRoute.INSTITUICAO_ID}` } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstituicaoEnsinoRoutingModule { }