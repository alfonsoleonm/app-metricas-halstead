 import { Component, OnInit } from '@angular/core';
 import {ActivatedRoute, Router} from '@angular/router';
import { Registro } from '../registro.model';
import { RegistrosService } from '../registros.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-registro-detalle',
  templateUrl: './registro-detalle.page.html',
  styleUrls: ['./registro-detalle.page.scss'],
})
export class RegistroDetallePage implements OnInit {

  registro: Registro;
  //variables de halsted
  N: number;
  n: number;
  v: number;
  d: number;
  l: number;
  e: number;
  t: number;
  b: number;

  constructor(private activatedRoute: ActivatedRoute, private registrosService: RegistrosService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeID = paramMap.get('registroID'); //desde app-routing-module.ts
      this.registro = this.registrosService.getRegistro(recipeID);

      this.N = this.registro.N1 + this.registro.N2;
      this.n = this.registro.n1 + this.registro.n2;
      this.v = this.N * Math.log2(this.n);
      this.d = (this.registro.n1 / 2) * (this.registro.N2 / this.registro.n2);
      this.l = 1/this.d;
      this.e = this.d * this.v;
      this.t = this.e / 18.0;
      this.b = (Math.pow(this.e, 0.66))/(3000.0);
    })
  }


  async deletePlace(){

    const alertElement = await this.alertCtrl.create({
      header: 'Estas seguro?',
      message: 'Se cuidadoso',
      buttons: [
        {
          text: 'Cancelar', 
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.registrosService.deleteRegistro(this.registro.id);
            this.router.navigate(['/registros']);
          }
        }
      ]
    });

    await alertElement.present();
    
  }

}
