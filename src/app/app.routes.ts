import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio.page').then((m) => m.InicioPage),
  },
  {
    path: 'detalhes-campeao/:id',
    loadComponent: () => import('./detalhes-campeao/detalhes-campeao.page').then(m => m.DetalhesCampeaoPage)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];