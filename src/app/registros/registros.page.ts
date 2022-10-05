import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegistrosService} from './registros.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {

  registros = []

  constructor(private registroService: RegistrosService, private router: Router) {

  }

  ngOnInit() {
    this.registros = this.registroService.getRegistros();
  }

  ionViewWillEnter(){
    this.registros = this.registroService.getRegistros();
  }

  agregaNuevoRegistro(){
    this.router.navigate(['/agregarRegistro']);
  }

}
