
// *********************************************************************************
// ***
// *** UTILIDADES.JS se encarga de manipular el DOM y efectos de uso general.
// *** Este archivo puede ser utilizado en todo el proyecto, para almacenar
// *** funciones utilitarias, o una especie de biblioteca para cosas básicas.
// ***
// *** Este archivo contiene:
// ***     -Función pad(n,lenght)
// ***     -Mostrar información general (Detalles) sobre los apiarios como conjunto.
// ***     -Mostrar las diferentes gestiones dentro del submenú de Alimentación
// ***          ♦ Estas gestiones estarán en el archivo ALIMENTACION.JS, con
// ***            ayuda de la función alimentacion().
// ***     -Mostrar las diferentes gestiones dentro del submenú de Medicación
// ***     -Mostrar las diferentes gestiones dentro del submenú de Movilidad
// ***     -Mostrar las diferentes gestiones dentro del submenú de Productividad
// ***
// *********************************************************************************



// **************************************
// ***
// *** FUNCIÓN pad(n, length)
// *** Agrega ceros a la izquierda a un número,
// *** de utilidad para la manipulación de fechas.
// *** Donde:
// ***      ♦ n es el número a agregar ceros.
// ***      ♦ lenght es el número de digitos totales
// ***        que se desea tener.
// *** Ej:
// ***     pad(5,4) - Devolverá 0005
// ***
// **************************************
function pad (n, length) {
    var  n = n.toString();
    while(n.length < length)
         n = "0" + n;
    return n;
}


// **************************************
// ***
// *** FUNCIÓN insAlertExito(mensaje)
// *** Agrega un alert para mostrar un mensaje
// *** de éxito de algun movimiento. Este desaparecerá
// *** en el 5 segundos.
// *** Donde:
// ***      ♦ mensaje es un verbo que cambiará
// ***
// **************************************
insAlertExito = function(mensaje) {
    $('#opc-contenedor').prepend(HTMLMensajeExito.replace("%MENSAJE%",mensaje));
    alertTimeout(5000);
}


// **************************************
// ***
// *** FUNCIÓN insAlertError(mensaje)
// *** Agrega un alert para mostrar un mensaje
// *** de error de algun movimiento. Este desaparecerá
// *** en el 5 segundos.
// *** Donde:
// ***      ♦ mensaje es un verbo que cambiará
// ***
// **************************************
insAlertError = function(mensaje) {
    $('#opc-contenedor').prepend(HTMLMensajeError.replace("%MENSAJE%",mensaje));
    alertTimeout(5000);
}


// **************************************
// ***
// *** FUNCIÓN alertTimeout(wait)
// *** Remueve los alert que se han insertado a
// *** #opc-contenedor en el tiempo estipulado.
// *** Donde:
// ***      ♦ wait es el tiempo que tardará en entrar en acción.
// ***        en entrar en acción.
// ***        1000 = 1 segundo.
// ***
// **************************************
function alertTimeout(wait){
    setTimeout(function(){
        $('#opc-contenedor').children('.alert:first-child').remove();
    }, wait);
}


// **************************************
// ***
// *** FUNCIÓN fechaActual()
// *** Retorna la fecha actual en base al ordenador.
// *** El formato es dd/mm/aaaa
// ***
// **************************************
function fechaActual(){
    var d = new Date();
    var mes = d.getMonth()+1;
    var dia = d.getDate();

    var output = (dia < 10 ? '0' : '') + dia + '/' +
        (mes < 10 ? '0' : '') + mes + '/' +
        d.getFullYear() ;
    return output;
}
