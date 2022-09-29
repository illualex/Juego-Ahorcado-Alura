//Seletores
let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none"
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none"
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");


var palabras = ['PERRO','MANZANA', 'CASA', 'PIXEL', 'GATO', 'MATE', 'TERMO', 'BANANA', 'TELEFONO'];
var tablero = document.getElementById('horca').getContext('2d');
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8
let letraElegida = [];

//eventos

// captura el id "iniciar-juego" en el click y direcciona el program al método dque inicia el juego
document.getElementById("iniciar-juego").onclick = () => {
  iniciarJuego();
}

// captura el id "btn-guardar", guarda la palabra agregada y inicia el juego
document.getElementById("btn-guardar").onclick = () => {
  guardarPalabra();
 
}

//actualiza la pantalla cuando el usuario hace click en el botón "nuevo juego"
btnNuevoJuego.addEventListener("click", function () {
  location.reload();
});

//actualiza la pantalla cuando el usuario hace click en el botón "salir"
btnSalir.addEventListener("click", function () {
  location.reload();
});

//actualiza la pantalla cuando el usuario hace click en el botón "cancelar"
btnCancelar.addEventListener("click", function () {
  location.reload();
});


//sortea la palabra que será usada en el ahorcado
function escojerPalabraSecreta() {
  let palabra = palabras[Math.floor(Math.random() * palabras.length)]
  palabraSecreta = palabra
  return palabra
}



// verifica cual es la letra en que el usuario hizo clic
function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key)
    return false
    
  }
  else {
    letras.push(key)
    return true
  }
}

function adicionarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase()
}

function adicionarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores -= 1
  }
}


function verificarFinJuego(letra) {
  //checa si la letra ha sido incluída en el array de  las letras correctas o incorrectas
 if(letraElegida.length < palabraSecreta.length) { 
    //incluye las letras ya digitadas en el arrau
    letrasIncorrectas.push(letra);
    

    //valida se el usuário cometió el numero maximo de errores
    if (letrasIncorrectas.length > numeroDeErrores) {
      perdiste()
    }
    else if(letraElegida.length < palabraSecreta.length) {
      adicionarLetraIncorrecta(letra)
      escribirLetraIncorrecta(letra, errores)
    }
  }
 } 

//Verifica si el usuario ha ganado
function verificarVencedor(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length == palabraSecreta.length) {

    ganaste()
    
  }

}



//impide que teclas como shift y otras, sean consideradas errores y sean escritas
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}

//haz con que los botones de la pantalla de home desaparezcan y los de la de agregar palabra aparezcan
function ensenarPantallaDeAgregarPalabra() {
  document.getElementById("div-desaparece").style.display = 'none';
  document.getElementById("agregar-palabra").style.display = "block";

}

// guarda la palabra que el usuario quiere agregar
function guardarPalabra() {
  
  //captura lo que el usuario ha digitado
  let nuevaPalabra = document.getElementById('input-nueva-palavra').value;

  // incluye la palabra que el usuario digitó en el array de las palabras a seren sorteadas
  if(nuevaPalabra !== ""){
    palabras.push(nuevaPalabra.toUpperCase());
    alert('La palabra fue guardada')
    
  
    // haz con que los componentes de la pantalla de agregar palabra desaparezcan
    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
  }
  else{
    alert("Ninguna palabra ha sido puesta")
  }

}

//inicia el juego
function iniciarJuego() {

  document.getElementById("div-desaparece").style.display = 'none';

  dibujarTablero();

  escojerPalabraSecreta();

  dibujarLineas();

  document.getElementById("btn-nuevo-juego").style.display = "block"
  document.getElementById("btn-salir").style.display = "block"

  document.addEventListener("keydown", verificarInput);

}

function verificarInput(e) {
  // pone la letra en letra mayuscula
  
  let letra = e.key.toUpperCase().replace(/[^a-zA-Z]/,'');

  //verifica si el usuario todavia no ha perdido
  if (letrasIncorrectas.length <= numeroDeErrores) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if (!verificarLetraClicada(e.key) && verificarLetra(keyCode)) {
      if (palabraSecreta.includes(letra)) {
        adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
        for (let i = 0; i < palabraSecreta.length; i++) {
          if (palabraSecreta[i] === letra) {
            escrribirLetraCorrecta(i)
            verificarVencedor(letra)
          }
        }
      }
      else {
        if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
        dibujarAhorcado(errores)
        verificarFinJuego(letra)
      }
    }
  }
  else {
    alert('Sobrepasaste el limite de letras incorrectas')
  }
}


