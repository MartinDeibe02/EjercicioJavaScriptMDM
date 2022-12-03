const casillas_td = document.getElementsByTagName("td");
const tabla = document.getElementById("tabla");
const numFilas=tabla.rows.length;
const numColumnas=tabla.rows[0].cells.length;


// Itera las filas
for (let i = 0; i < numFilas; i++) {
    const fila = tabla.rows[i];
    for (let j = 0; j < fila.cells.length; j++) {
        const casilla = fila.cells[j];
        console.log(casilla);

        //onClick de cada td de la tabla
        casilla.addEventListener('click', function(e) {

            if(!casilla.classList.contains("pulsado")){
                casilla.classList.add("pulsado");
                casilla.innerHTML = `<h1>${randomNumber(1,10)}</h1>`;

                //Timeot para ocultar texto de casillas
                setTimeout(() => {
                    casilla.innerHTML="";
                    casilla.classList.remove("pulsado");
                }, 1000);



            }

        });
        
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}