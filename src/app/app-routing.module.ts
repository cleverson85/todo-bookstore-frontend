import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [ AuthGuard ],
  },
  {
    path: 'aluno',
    loadChildren: () => import('./pages/aluno/aluno.module').then(m => m.AlunoModule),
    canActivate: [ AuthGuard ],
  },
  {
    path: 'emprestimo',
    loadChildren: () => import('./pages/emprestimo/emprestimo.module').then(m => m.EmprestimoModule),
    canActivate: [ AuthGuard ],
  },
  {
    path: 'instituicao',
    loadChildren: () => import('./pages/instituicao-ensino/instituicao-ensino.module').then(m => m.InstituicaoEnsinoModule),
    canActivate: [ AuthGuard ],
  },
  {
    path: 'livro',
    loadChildren: () => import('./pages/livro/livro.module').then(m => m.LivroModule),
    canActivate: [ AuthGuard ],
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule),
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
