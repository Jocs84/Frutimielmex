
// *********************************************************************************
// ***
// *** APIARIO.JS se encarga de manipular el DOM y efectos del archivo
// *** APIARIOS.HTML.
// *** Este archivo manipula lo siguiente:
// ***     -Mostrar las diferentes opciones que se presentan en el menú de apiarios.
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
// *** Cuando el documento esté cargado
// ***
// **************************************

// Muestra las diferentes opciones que se presentan en el menú de apiarios,
// cargando los Detalles de los apiarios al inicio.
$( document ).ready(function() {
    // Carga por default la sección de
    // DETALLES
    // *insertar aquí una vez esté diseñado


    // Muestra las acciones a realizar cuando se de click a la opción
    // ALIMENTACIÓN
    $(document).on('click','#opc-alimentacion',function(e){
        e.preventDefault();
        // Remueve cualquier elemento de modulos anteriores
        $("#opc-contenedor").empty();
        // llama a la función alimentacion() que se
        // encuentra en el archivo ALIMENTACION.JS
        alimentacion();
    });


    // Muestra las acciones a realizar cuando se de click a la opción
    // MEDICACIÓN
    //Prueba de como se iniciaría la inserción *quitar esto una vez listo*
    $(document).on('click','#opc-medicacion',function(e){
        e.preventDefault();
        $("#opc-contenedor").empty();
        //Cambia la sentencia de abajo por el llamado a la función,
        // como lo hice con alimentacion ;)
        $("#opc-contenedor").append("<h2>MUAJAJA</h2>");
    });

});
