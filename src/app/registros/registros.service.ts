import { Injectable } from '@angular/core';
import { Registro } from './registro.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  private registros: Registro[] = [];

  constructor() { }

  getRegistros() {
    return [...this.registros]
  }


  getRegistro(registroID: string) {

    return {
      ...this.registros.find(registro => {
        return registro.id === registroID
      })
    }
  }



  /*
  getRegistro(lugarID: string) {
  
    return {
      ...this.lugares.find(lugar => {
        return lugar.id === lugarID
      })
    }
  }
  
  */

  addRegistro(nombrePrograma: string, n1: number, N1: number, n2: number, N2: number, codigo: string) {
    this.registros.push(
      {
        nombrePrograma, n1, N1, n2, N2, codigo, id: this.registros.length + 1 + ""
      }
    );
  }

  deleteRegistro(registroID: string) {

    this.registros.forEach((registro, index) => {
      if (registro.id == registroID) this.registros.splice(index, 1);
    });
  }


}
