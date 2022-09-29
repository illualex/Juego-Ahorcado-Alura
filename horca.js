function dibujarTablero() {
    tablero.lineWidth=8
    tablero.lineCap="round"
    tablero.lineJoin="round"
    tablero.fillStyle= "#ffffff00"
    tablero.strokeStyle = "#ffffff"
    tablero.fillRect(0,0,1200,800)
    tablero.beginPath();
    tablero.moveTo(300,400)
    tablero.lineTo(600,400)
    tablero.stroke()
    tablero.closePath()
  }

  function dibujarLineas() {
    tablero.lineWidth=6
    tablero.lineCap="round"
    tablero.lineJoin="round"
    tablero.strokeStyle = "#ffffff"
    tablero.beginPath()
    let ancho=600/palabraSecreta.length
    for (let i=0;i<palabraSecreta.length;i++){
      tablero.moveTo(200+(ancho*i),540)
      tablero.lineTo(250+(ancho*i),540)
    }
    tablero.stroke()
    tablero.closePath()
  }
  
  function escrribirLetraCorrecta(index) {
    tablero.font = 'bold 50px PF Tempesta Five Condensed';
    tablero.lineWidth=6
    tablero.lineCap="round"
    tablero.lineJoin="round"
    tablero.fillStyle= "#ffffff"
    let ancho=600/palabraSecreta.length
    tablero.fillText(palabraSecreta[index],205+(ancho*index),520)
    tablero.stroke()
  }

  function escribirLetraIncorrecta(letra, errorsLeft) {
    tablero.lineWidth=6
    tablero.font = 'bold 40px PF Tempesta Five Condensed';
    tablero.lineCap="round"
    tablero.lineJoin="round"
    tablero.fillStyle="#ffffff"
    tablero.fillText(letra,680+(40*(10-errorsLeft)),510,40)
  }

  function dibujarAhorcado(puntaje) {
    tablero.lineWidth=8
    tablero.lineCap="round"
    tablero.lineJoin="round"
    tablero.strokeStyle = "#ffffff"
    if(puntaje===8){
    //poste lateral
    tablero.moveTo(400,400)
    tablero.lineTo(400,100)
    }
    if(puntaje===7){//teto 
    tablero.moveTo(560,100)
    tablero.lineTo(400,100)
    }
    if(puntaje===6){//cordaf
    tablero.moveTo(560,100)
    tablero.lineTo(560,150)
    }
    if(puntaje===5){//para cara
    tablero.moveTo(600,190)
    tablero.arc(560,190,40,0,Math.PI*2)
    }
    if(puntaje===4){//para corpo
    tablero.moveTo(560,320)
    tablero.lineTo(560,235)
    }
    if(puntaje===3){//para perna izquerda
    tablero.moveTo(560,320)
    tablero.lineTo(520,360)
    }
    if(puntaje===2){//para perna direita
    tablero.moveTo(560,320)
    tablero.lineTo(600,360)
    }
    if(puntaje===1){//para mão izquerda
    tablero.moveTo(560,250)
    tablero.lineTo(500,300)
    }
    if(puntaje===0){//para mão direita
    tablero.moveTo(560,250)
    tablero.lineTo(620,300)
    }
    tablero.stroke()
    tablero.closePath()
  }

  function perdiste() {
    tablero.font = ' bold 42px PF Tempesta Five Condensed';
    tablero.lineWidth=6
    tablero.lineCap="round"
    tablero.lineJoin="round"
    tablero.fillStyle="red"
    tablero.fillText("Fin del juego!",730,320)
  }

  function ganaste() {
    tablero.font = 'bold 42px PF Tempesta Five Condensed';
    tablero.lineWidth=6
    tablero.lineCap="round"
    tablero.lineJoin="round"
    tablero.fillStyle="green"
    tablero.fillText("Ganaste,",750,320)
    tablero.fillText("Felicidades!",730,360)
    setTimeout( recargar , 1000)
  }   

  function recargar(){
    location.reload(); 
  }