import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericResolverGuard } from 'src/app/guards/generic.resolver.guard';
import { InstituicaoEnsinoComponent } from './instituicao-ensino.component';

const routes: Routes = [
  {
    path: '',
    component: InstituicaoEnsinoComponent
  },
  {
    path: ':id',
    component: InstituicaoEnsinoComponent,
    resolve: { emprestimo: typeof GenericResolverGuard },
    data: { resolverData: { url: 'api.com/users', method: 'get' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstituicaoEnsinoRoutingModule {}
