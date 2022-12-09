const casillas_td = document.getElementsByTagName("td");
let tabla;
const msg = document.getElementById("msg");
const msgRestante = document.getElementById("restante");
const msgConfirm = document.getElementById("msg-confirm");
const div1 = document.getElementById("gamePanel");
const msg_error = document.getElementById("msg-error");

let numFilas = 0;
let numColumnas=0;
let valorFilas;
let valorColumnas;

let lockClick = false;
let last;
let intentos = 0;
let restante;


window.onload = function () {
    intentos = 0;
getvalue();
genera_tabla(3,4);
game();
}

function iniciar(){
intentos = 0;
getvalue();
if((valorFilas * valorColumnas) % 2 == 0){
    genera_tabla(valorFilas,valorColumnas);
    game();
}else{
    msg_error.innerHTML ="No se puee crear un tablero de las dimensiones proporcionadas"

    setTimeout(() => {
        msg_error.innerHTML ="";

    }, 1000);
}

}

function getvalue(){
    valorFilas= document.getElementById('filas').value;
    valorColumnas=document.getElementById('columnas').value;
}

function genera_tabla(filas, columnas) {
    
    if(tabla != null){
        tabla.remove();

    }
    // Crea un elemento table y un elemento tbody
    var tablaCreada   = document.createElement("table");
    var tblBody = document.createElement("tbody");
    tablaCreada.setAttribute("id", "tabla");

    // Crea las celdas
    for (var i = 0; i < filas; i++) {
        var fila = document.createElement("tr");

    for (var j = 0; j < columnas; j++) {
        
        var celda = document.createElement("td");
        fila.appendChild(celda);
    }
    tblBody.appendChild(fila);
    }

    tablaCreada.appendChild(tblBody);
    // appends table en body
    div1.append(tablaCreada)
    tabla = tablaCreada;
    numFilas = tabla.rows.length;
    numColumnas=tabla.rows[0].cells.length;
    console.log(tabla);
    var tablaCreada   = document.createElement("table");


}
// Itera las filas
function game(){
for (let i = 0; i < numFilas; i++) {
    const fila = tabla.rows[i];
    for (let j = 0; j < fila.cells.length; j++) {
        const casilla = fila.cells[j];
        msg.innerHTML = intentos;

        console.log(casilla);
        //onClick de cada td de la tabla
        casilla.addEventListener('click', function(e) {

            if(lockClick == false && !casilla.classList.contains("pulsado")){
                casilla.classList.add("pulsado");
                casilla.innerHTML = `<h3>${casilla.getAttribute("numero")}</h3>`;
                msgRestante.innerHTML = restante;

                //si last no existe se le asigna casilla
                if(!last){
                    last = casilla;
                //Si las dos parejas distintas añade intento y timeout de 1 segundo para desaparecer
                }else if(last.getAttribute("numero")  != casilla.getAttribute("numero")){
                    lockClick = true;
                    intentos++;
                    msg.innerHTML = intentos;
                    msgConfirm.innerHTML = "Los numeros destapados no son iguales"
                    
                //Timeot para ocultar texto de casillas
                setTimeout(() => {
                    msgConfirm.innerHTML = "";
                    last.innerHTML="";
                    last.classList.remove("pulsado");
                    last = undefined;
                    casilla.innerHTML="";
                    casilla.classList.remove("pulsado");
                    lockClick = false;
                }, 1000);

                }else{
                    intentos++;
                    last= undefined;
                    restante--;
                    msgRestante.innerHTML = restante;
                    msg.innerHTML = intentos;
                    msgConfirm.innerHTML = "Las numeros destapados son iguales"
                        setTimeout(() => {
                            msgConfirm.innerHTML = "";
                        }, 1000);                  
                }
                getWinner();
            }
        });
    }
}

//generar parejas
for (let i = 0; i < (numFilas * numColumnas) / 2; i++) {
    generarPareja(i+1);
    restante = i+1;
}
msgRestante.innerHTML = restante;
}

function generarPareja(value) {
    let pareja = 0;
    while (pareja < 2) {
    //Numero random de fila y columna
    const fila = randomNumber(0, tabla.rows.length);
    const columna = randomNumber(0, tabla.rows[0].cells.length);
    //Asignar valores si la casilla seleccionada esta vacia
    if (tabla.rows[fila].cells[columna].getAttribute("numero") == null) {
        tabla.rows[fila].cells[columna].setAttribute("numero", value);        
        pareja++;
    }
}
}

//Comprobar si hay ganador
function getWinner(){
    //Itera por todas las casillas
    for(const casilla of casillas_td){
        //Comprueba si todaslas casillas tienen clase "pulsado"
        const win = casilla.classList.contains("pulsado");
        if(win == false){
            return;
        }
    }
    //Si gana salta alerta preguntando si quiere volver a intentar
    if (confirm("Has ganado, Quieres reintentar?")) {
        lockClick = true;
        location.reload();
    } else {
        lockClick = true;
    }
    
}

//Funcion numero random con minimo y maximo
function randomNumber(min, max) {
    return Math.floor(Math.random() * max) - min;
}

function dificultad(x){
    if(x==1){ //FACIL
        document.getElementById('filas').disabled = true;
        document.getElementById('columnas').disabled = true;

        document.getElementById('filas').value=3;
        document.getElementById('columnas').value=4;

        console.log(document.getElementById('filas').value);
    }else if(x==2){ //MEDIO
        document.getElementById('filas').disabled = true;
        document.getElementById('columnas').disabled = true;

        document.getElementById('filas').value=5;
        document.getElementById('columnas').value=6;
    }else if(x==3){ //DIFICIL
        document.getElementById('filas').disabled = true;
        document.getElementById('columnas').disabled = true;

        document.getElementById('filas').value=10;
        document.getElementById('columnas').value=10;
    }else{ //PERSONALIZADO
        document.getElementById('filas').disabled = false; //habilito
        document.getElementById('columnas').disabled = false;

        document.getElementById('filas').value;
        document.getElementById('columnas').value;
    }
}


