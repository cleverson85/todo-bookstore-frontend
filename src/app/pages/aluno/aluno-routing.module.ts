import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericResolverGuard } from 'src/app/guards/generic.resolver.guard';
import { AlunoComponent } from './aluno.component';

const routes: Routes = [
  {
    path: '',
    component: AlunoComponent
  },
  {
    path: ':id',
    component: AlunoComponent,
    resolve: { cliente: typeof GenericResolverGuard },
    data: { resolverData: { url: 'api.com/users', method: 'get' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunoRoutingModule {}
