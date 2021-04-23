import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericResolverGuard } from 'src/app/guards/generic.resolver.guard';
import { ApiRoute } from 'src/app/shared/enum/apiRoutes.enum';
import { EmprestimoEditComponent } from './emprestimo-edit/emprestimo-edit.component';
import { EmprestimoComponent } from './emprestimo.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: EmprestimoComponent
  // },
  {
    path: '',
    component: EmprestimoEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmprestimoRoutingModule { }
