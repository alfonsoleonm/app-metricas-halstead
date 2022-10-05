import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrosPage } from './registros.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrosPage
  },
  {
    path: 'registro-detalle',
    loadChildren: () => import('./registro-detalle/registro-detalle.module').then( m => m.RegistroDetallePageModule)
  },
  {
    path: 'registro-agregar',
    loadChildren: () => import('./registro-agregar/registro-agregar.module').then( m => m.RegistroAgregarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrosPageRoutingModule {}
