import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registros',
    children: [
      {
        path: "",
        loadChildren: () => import('./registros/registros.module').then( m => m.RegistrosPageModule)
      },
      {
        path: ":registroID",
        loadChildren: () => import('./registros/registro-detalle/registro-detalle.module').then(m => m.RegistroDetallePageModule)
      }
    ]
  },
  {
    path: 'agregarRegistro',
    loadChildren: () => import('./registros/registro-agregar/registro-agregar.module').then(m => m.RegistroAgregarPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
