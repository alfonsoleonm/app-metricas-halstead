import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit, ɵɵpipeBind1 } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrosService } from '../registros.service';



@Component({
  selector: 'app-registro-agregar',
  templateUrl: './registro-agregar.page.html',
  styleUrls: ['./registro-agregar.page.scss'],
})


export class RegistroAgregarPage implements OnInit {



  constructor(private registrosService: RegistrosService, private router: Router) { }

  ngOnInit() {
  }

  addNewRegistro(nombreRegistro: HTMLInputElement, n1: HTMLInputElement, N1: HTMLInputElement, n2: HTMLInputElement, N2: HTMLInputElement, codigo: HTMLInputElement) {
    //value porque son elementos html
    this.registrosService.addRegistro(nombreRegistro.value, parseInt(n1.value), parseInt(N1.value), parseInt(n2.value), parseInt(N2.value), codigo.value);
    this.router.navigate(['/registros']);
  }



  uploadFile(files: FileList, nombrePrograma: HTMLInputElement, n1: HTMLInputElement, N1Input: HTMLInputElement, n2: HTMLInputElement, N2Input: HTMLInputElement, codigo: HTMLInputElement, operadoresInput: HTMLInputElement, operandosInput: HTMLInputElement): void {
    let results = [];
    operadores = [];
    operandos = [];
    N1 = [];
    N2 = [];

    if (files && files.length > 0) {
      const file: File = files.item(0); //assuming only one file is uploaded
      //console.log('Uploaded file, Filename:' + file.name + 'Filesize:' + file.size + 'Filetype:' + file.type);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const fileContent: string = reader.result as string;
        //console.log('fileContent:' + fileContent);
        const lines: string[] = fileContent.split('\n'); //this depends on your line end character, I'm using \n in general
        //lines is an array of string, such as "Sham went to school", loop over it and process as you like

        //cambiar el filename
        nombrePrograma.value = file.name;

        //enviar el código
        codigo.value = fileContent;

        //analizar por lineas
        analizar(lines);

        //Actualizamos las tablas imprimiendo operadores y operandos
        var ind;
        var texto = "n1\tOperadores\tN1\n";

        for (ind = 0; ind < operadores.length; ind++) {
          texto = texto + (ind + 1) + "\t";
          texto += operadores[ind];
          texto = texto + "\t" + N1[ind] + "\n";
        }
        console.log("texto en operadores -------------- \n" + texto);
        operadoresInput.value = texto;


        texto = "n2\tOperandos\tN2\n";
        for (ind = 0; ind < operandos.length; ind++) {
          texto = texto + (ind + 1) + "\t";
          texto += operandos[ind];
          texto = texto + "\t" + N2[ind] + "\n";
        }
        console.log("texto en operandos -------------- \n" + texto);
        operandosInput.value = texto;


        //actualizamos los valores de n1,N1,n2,N2
        n1.value = "" + operadores.length;
        n2.value = "" + operandos.length;
        N1Input.value = "" + calculaSuma(N1);
        N2Input.value = "" + calculaSuma(N2);
      };
    }


  }


}

var operadores: string[];
var operandos: string[];
var N1: number[];
var N2: number[];


function analizar(lineas: string[]): void {
  //recibe el arrego dividido por salto de linea


  console.log('Total LOCs: ' + lineas.length);

  var lineaAux: string[];
  var contadorLinea = 1;
  lineas.forEach(function (l) {
    console.log('Linea #' + contadorLinea);
    contadorLinea++;

    lineaAux = l.split(" ");
    if (lineaAux.length > 1) {
      analizarLinea(lineaAux);

    }

  });


}

function analizarLinea(lineaEspacios: string[]) {
  //recibe la linea de codigo dividida por espacios
  //clasifica en 4 arreglos 

  var index = 0;
  var indiceAux;
  var regex = /\w/;

  for (index = 0; index < lineaEspacios.length; index++) {
    if (lineaEspacios[index] == '#') {
      break;
    }

    if (isNumber(lineaEspacios[index].trim())) {
      //operando
      actualizaTablas(lineaEspacios[index].trim(), false);

    } else if (regex.test(lineaEspacios[index].trim())) {

      if (lineaEspacios[index].trim() == "print" || lineaEspacios[index].trim() == "input" || lineaEspacios[index].trim() == "if" || lineaEspacios[index].trim() == "float" || lineaEspacios[index].trim() == "math" || lineaEspacios[index].trim() == "math.pow" || lineaEspacios[index].trim() == "math.sqrt" || lineaEspacios[index].trim() == "int" || lineaEspacios[index].trim() == "while" || lineaEspacios[index].trim() == "import") {
        //variable nativa operador
        console.log('ya entre aqui: '+lineaEspacios[index]);
        actualizaTablas(lineaEspacios[index].trim(), true);
        //si es print o input buscamos argumentos, regresamos la cadena:
        if (lineaEspacios[index].trim() == "print" || lineaEspacios[index].trim() == "input") {

          if (lineaEspacios[index + 2] == '"') {
            //agregamos el parentesis a los operadores
            actualizaTablas("(", true);


            indiceAux = index + 3; //para posicionarnos despues del "
            var argumentoCadena = "";
            argumentoCadena += '"';
            while (lineaEspacios[indiceAux] != '"') {
              argumentoCadena += lineaEspacios[indiceAux].trim();
              indiceAux++;
            }

            argumentoCadena += '"';
            // ya tenemos la cadena y el indice a partir de donde vamos a seguir
            console.log('Argumento = ' + argumentoCadena);
            //lo agregamos a la tabla de operandos
            actualizaTablas(argumentoCadena, false);
            index = indiceAux;

          }
        }

      } else {
        //operando constante.
        actualizaTablas(lineaEspacios[index].trim(), false);
      }



    } else if (lineaEspacios[index] == "=" || lineaEspacios[index] == "*" || lineaEspacios[index] == "-" || lineaEspacios[index] == "/" || lineaEspacios[index] == ":" || lineaEspacios[index] == ">" || lineaEspacios[index] == "<" || lineaEspacios[index] == "+" || lineaEspacios[index] == "==" || lineaEspacios[index] == "," || lineaEspacios[index] == "(" || lineaEspacios[index] == "[" || lineaEspacios[index] == "%" || lineaEspacios[index] == "]") {
      
      //operador
      actualizaTablas(lineaEspacios[index].trim(), true);

      //si es [ debe tener argumentos
    }

  }


}


function actualizaTablas(palabra: string, operador: boolean) {
  var contadorAnt: number;
  var indexPalabra: number;

  if (operador) {
    indexPalabra = getIndexPalabra(palabra, operadores);
    if (operadores.length > 0) {
      if (indexPalabra == -1) { //quiere decir que no existe
        operadores.push(palabra);
        N1.push(1);
      } else {
        contadorAnt = N1[indexPalabra];
        N1[indexPalabra] = contadorAnt + 1;
      }
    } else {
      operadores.push(palabra);
      N1.push(1);
    }


  } else { //Es operando
    indexPalabra = getIndexPalabra(palabra, operandos);
    if (operandos.length > 0) {
      if (indexPalabra == -1) { //quiere decir que NO existe la palabra
        operandos.push(palabra);
        N2.push(1);
      } else {
        contadorAnt = N2[indexPalabra];
        N2[indexPalabra] = contadorAnt + 1;
      }
    } else {
      operandos.push(palabra);
      N2.push(1);
    }
  }
}

function isNumber(value: string | number): boolean {
  return ((value != null) &&
    (value !== '') &&
    !isNaN(Number(value.toString())));
}

function calculaSuma(arreglo: number[]): number {
  //se encarga de regresar el resultado de la suma de los elementos que hay en arreglo
  var resultado = 0;
  arreglo.forEach(function (elemento) {
    resultado = resultado + elemento;

  });
  return resultado;
}

function getIndexPalabra(palabra: string, arreglo: string[]): number {
  //si encuentra la palabra en el array regresa su indice, si no, regresa -1
  var index: number;
  var i: number;
  index = -1;
  for (i = 0; i<arreglo.length; i++) {
    if (arreglo[i].trim() == palabra.trim()) {
      
      index = i;
      break;
    } else {
      
    }
  }



  return index;
}




