// *********************************************************************************
// ***
// *** MOVILIDAD.JS se encarga de manipular el DOM y efectos del archivo
// *** APIARIOS.HTML respecto al módulo de alimentación.
// *** Este archivo manipula lo siguiente:
// ***     -Mostrar las diferentes gestiones dentro del submenú de Movilidad
// ***          ♦ Mostrar las diferentes gestiones de Movilidad
// ***
// *********************************************************************************


// **************************************
// ***
// *** FUNCIÓN MOVILIDAD
// ***
// **************************************

movilidad = function(){



 // Inserta los controles para gestión de movilidad
    $("#opc-contenedor").append(HTMLcontMovilidad);
    $("#opc-contenedor").append(HTMLcontGestionesMov);
    $("#opc-contenedor").append(HTMLgestMovilidad);


// ************ INICIO DE FORMULARIO DE AGREGAR MOVILIDAD **********************

 //**** función del botón agregar movilidad
  $("#btnAgregarMovilidad").click(function(){


$("#insertar-gestion-mov").empty();
$("#insertar-gestion-mov").append(HTMLAgregarMovilidad);
// Remplaza el valor comodín de la variable por el identificador necesario
// para su posterior manipulación. id = "frmAgrMov"
$("#agregarMovlidad").append(HTMLFormMovilidad.replace("%FORMULARIO%","frmAgrMov")); //**checar


// ** INICIA AJAX PARA CARGAR LOS NOMBRES DE LOS APIARIOS




// AJAX para cargar los apiarios registrados.
// Después se agregarán los campos y los datos para su uso al rellenar
// el FORM
$.ajax( {
    type: "POST",
    url: "../php/buscarGeneral.php",
    // Formato JSON
    //     • Tabla: La tabla en la cual se hará una consulta general, osea
    //       se consultará todos los registros de esta.
    data: {"tabla":"apiarios"},
    success: function(data){
        var i = 0;
        // Insertando los OPTIONS en el SELECT que agregar los Apiarios
        // disponibles
        while (data[i]) {
            // Reemplazar:
            //     • ** - Id del apiario
            //     • %data% - Nombre del apiario
            var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdApiario"]);
            ins = ins.replace("%data%", data[i]["NombreApiario"]);
            $("#NomApiario").append(ins);
            i++;
        }
    },
    dataType: 'json'
});

// ** TERMINA AJAX PARA CARGAR LOS NOMBRES DE LOS APIARIOS



// AJAX para cargar los municipios.
/*
$.ajax( {
    type: "POST",
    url: "../php/buscarCP.php",
    // Formato JSON
    //     • Tabla: La tabla en la cual se hará una consulta general, osea
    //       se consultará todos los registros de esta.
    data: {"tabla":"codigopostal"},
    success: function(data){
        var i = 0;
        // Insertando los OPTIONS en el SELECT que agregar los municipios
        // disponibles
        while (data[i]) {
            // Reemplazar:
            //     • ** - codigo postal
            //     • %data% - Nombre del municipio
            var ins = HTMLAgregarOptionSelect.replace("**",data[i]["Municipio"]);
            ins = ins.replace("%data%", data[i]["Municipio"]);
            $("#Municipio").append(ins);
            i++;
        }
    },
    dataType: 'json'
});
*/
// ** TERMINA AJAX PARA CARGAR LOS NOMBRES DE LOS MUNICIPIOS


// AJAX para cargar los predios registrados.
// Después se agregarán los campos y los datos para su uso al rellenar
// el FORM
$.ajax( {
    type: "POST",
    url: "../php/buscarPredio.php",
    // Formato JSON
    //     • Tabla: La tabla en la cual se hará una consulta general, osea
    //       se consultará todos los registros de esta.
    data: {"tabla":"predios"},
    success: function(data){
        var i = 0;
        // Insertando los OPTIONS en el SELECT que agregar los predios
        // disponibles
        while (data[i]) {
            // Reemplazar:
            //     • ** - Id del predio
            //     • %data% - Nombre del predio
            var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdPredio"]);
            ins = ins.replace("%data%", data[i]["NomPredio"]);
            $("#NomPredio").append(ins);
            i++;
        }
    },
    dataType: 'json'
});

// ** TERMINA AJAX PARA CARGAR LOS NOMBRES DE LOS PREDIOS


// AJAX para cargar las zonas registrados.
// Después se agregarán los campos y los datos para su uso al rellenar
// el FORM
$.ajax( {
    type: "POST",
    url: "../php/buscarZonas.php",
    // Formato JSON
    //     • Tabla: La tabla en la cual se hará una consulta general, osea
    //       se consultará todos los registros de esta.
    data: {"tabla":"zonas"},
    success: function(data){
        var i = 0;
        // Insertando los OPTIONS en el SELECT que agregar los zonas
        // disponibles
        while (data[i]) {
            // Reemplazar:
            //     • ** - Id de la zona
            //     • %data% - Nombre del predio
            var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdZona"]);
            ins = ins.replace("%data%", data[i]["NombreZona"]);
            $("#NomZona").append(ins);
            i++;
        }
    },
    dataType: 'json'
});

// ** TERMINA AJAX PARA CARGAR LOS NOMBRES DE LAS ZONAS



// Detecta cambio en el SELECT de Municipios para cargar las localidades que correspondan
$(document).on('change','#Estado',function(){
    // Obtiene el valor del OPTION seleccionado y en base a este
    // inserta el campo necesario
      var valorEstado = document.getElementById("Estado").value;
                        alert(valorEstado);

        $.ajax( {
            type: "POST",
            url: "../php/buscarCP.php",
            // Formato JSON
            //     • Tabla: La tabla en la cual se hará una consulta general, osea
            //       se consultará todos los registros de esta.
            data: {"tabla":"codigopostal"},
            success: function(data){
                var i = 0;

                // Insertando los OPTIONS en el SELECT que agregar los municipios
                // disponibles
                while (data[i]) {
                    // Reemplazar:
                    //     • ** - codigo postal
                    //     • %data% - Nombre del municipio
                    var ins = HTMLAgregarOptionSelect.replace("**",data[i]["Municipio"]);
                    ins = ins.replace("%data%", data[i]["Municipio"]);
                    $("#Municipio").append(ins);
                    i++;
                }
            },
            dataType: 'json'
        });

});

//************************************************

});

// ************** FIN DE FORMULARIO DE AGREGAR MOVILIDAD   *****************

}

// **************************************
// ***
// *** FIN DE FUNCIÓN MOVILIDAD
// ***
// **************************************
