import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAgregarPage } from './registro-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAgregarPageRoutingModule {}
