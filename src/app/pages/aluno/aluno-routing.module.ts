import { ApiRoute } from './../../shared/enum/apiRoutes.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericResolverGuard } from 'src/app/guards/generic.resolver.guard';
import { AlunoEditComponent } from './aluno-edit/aluno-edit.component';
import { AlunoComponent } from './aluno-list/aluno.component';

const routes: Routes = [
  {
    path: '',
    component: AlunoComponent,
  },
  {
    path: ':id',
    component: AlunoEditComponent,
    resolve: { aluno: GenericResolverGuard },
    data: { resolverData: { url: `${ApiRoute.ALUNO_ID}` } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunoRoutingModule {}
