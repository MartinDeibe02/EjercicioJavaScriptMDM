const casillas_td = document.getElementsByTagName("td");
const tabla = document.getElementById("tabla");
const msg = document.getElementById("msg");
const msgRestante = document.getElementById("restante");
const msgConfirm = document.getElementById("msg-confirm");
const numFilas=tabla.rows.length;
const numColumnas=tabla.rows[0].cells.length;

let lockClick = false;
let last;
let intentos = 0;
let restante;


// Itera las filas
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
    //Itera por todas las casillas para ver si estan pulsadas
    for(const casilla of casillas_td){
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

