
// **************************************
// ***
// *** FUNCIÓN PARA DESAPARECER LOS ALERTS
// *** (Indican que algo ha sido eliminado)
// ***
// **************************************


// Para agregar el mensaje de éxito
insAlertExito = function(mensaje) {
    $('#opc-contenedor').prepend(HTMLMensajeExito.replace("%MENSAJE%",mensaje));
    alertTimeout(5000);
}

// Para agregar el mensaje de éxito
insAlertError = function(mensaje) {
    $('#opc-contenedor').prepend(HTMLMensajeError.replace("%MENSAJE%",mensaje));
    alertTimeout(5000);
}

function alertTimeout(wait){
    setTimeout(function(){
        $('#opc-contenedor').children('.alert:first-child').remove();
    }, wait);
}
