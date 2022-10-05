import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAgregarPageRoutingModule } from './registro-agregar-routing.module';

import { RegistroAgregarPage } from './registro-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAgregarPageRoutingModule
  ],
  declarations: [RegistroAgregarPage]
})
export class RegistroAgregarPageModule {}
