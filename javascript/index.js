const casillas_td = document.getElementsByTagName("td");
const tabla = document.getElementById("tabla");
const msg = document.getElementById("msg");
const msgRestante = document.getElementById("restante");

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
        casilla.setAttribute("numero", randomNumber(1,10));
        //onClick de cada td de la tabla
        casilla.addEventListener('click', function(e) {

            if(lockClick == false && !casilla.classList.contains("pulsado")){
                casilla.classList.add("pulsado");
                casilla.innerHTML = `<h3>${casilla.getAttribute("numero")}</h3>`;

                //si last no existe se le asigna casilla
                if(!last){
                    last = casilla;
                //Si las dos parejas distintas añade intento y timeout de 1 segundo para desaparecer
                }else if(last.getAttribute("numero")  != casilla.getAttribute("numero")){
                    lockClick = true;
                    intentos++;
                    msg.innerHTML = intentos;

            
                //Timeout para ocultar texto de casillas
                setTimeout(() => {
                    last.innerHTML="";
                    last.classList.remove("pulsado");
                    last = undefined;
                    casilla.innerHTML="";
                    casilla.classList.remove("pulsado");
                    lockClick = false;
                }, 1000);

                //Si coinciden
                }else{
                    intentos++;
                    last= undefined
                    msg.innerHTML = intentos;
                }
            }
        });
        
    }
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * max) - min;
}