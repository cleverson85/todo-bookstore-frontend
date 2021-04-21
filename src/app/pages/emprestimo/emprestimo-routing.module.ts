import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericResolverGuard } from 'src/app/guards/generic.resolver.guard';
import { EmprestimoComponent } from './emprestimo.component';

const routes: Routes = [
  {
    path: '',
    component: EmprestimoComponent
  },
  {
    path: ':id',
    component: EmprestimoComponent,
    resolve: { emprestimo: typeof GenericResolverGuard },
    data: { resolverData: { url: 'api.com/users', method: 'get' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmprestimoRoutingModule {}
