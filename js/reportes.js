
// *********************************************************************************
// ***
// *** APIARIO.JS se encarga de manipular el DOM y efectos del archivo
// *** APIARIOS.HTML.
// *** Este archivo manipula lo siguiente:
// ***     -Mostrar las diferentes opciones que se presentan en el menú de apiarios.
// ***     -Mostrar información general (Detalles) sobre los apiarios como conjunto.
// ***     -Mostrar las diferentes gestiones dentro del submenú de Alimentación
// ***          ♦ Mostrar las diferentes gestiones de Ingredientes
// ***          ♦ Mostrar las diferentes gestiones de Alimentos
// ***          ♦ Mostrar las diferentes gestiones de Preparaciones
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


$( document ).ready(function() {
    // Detecta cambio en el SELECT de las secciones en las que se separa
    // los reportes, y agrega dinamicamente al DOM las opciones con las que
    // cuenta cada una de estas
    $(document).on('change','#seccion-rep',function(){
        // Obtiene el valor del OPTION seleccionado y en base a este
        // inserta el campo necesario
        if($("#seccion-rep").val() === "Apiarios"){
            $("#cont-opciones").empty();
            $("#cont-opciones").append(HTMLOpcionesApiarios);
        }else if ($("#seccion-rep").val() === "Alimentos") {
            $("#cont-opciones").empty();
            $("#cont-opciones").append(HTMLOpcionesAlimentos);
            alimentos();
        }
    });

    $(document).on('click','#btnImprimir',function(e){
        e.preventDefault();
		window.print();
		return false;
	});


});


// **************************************
// ***
// *** FUNCIÓN ALIMENTOS
// ***
// **************************************

// Manipula todos los eventos del apartado de alimentación
// dentro de REPORTES.HTML
alimentos = function(){

    $(document).on('click','#opc-alimen',function(e){
        e.preventDefault();
        $("#opc-contenedor").empty();
        $("#opc-contenedor").append(HTMLRepAlimentosTitulo);
        $("#opc-contenedor").append(HTMLBotonImp);
        $("#opc-contenedor").append(HTMLRepAlimentosCuerpo);

        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            // El campo del FORM serializado en formato JSON (la búsqueda a realizar),
            // así como los datos necesarios para realizar la búsqueda.
            data: {"tabla":"alimentos"},
            success: function(data){
                // Si se recibe un error
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    alert("vacio");
                // Si se recibe un objeto JSON con el resultado de la búsqueda
                }else{
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var renglon = HTMLRepAlimentosRenglon.replace("%nombre%",data[i]["NombreAlimento"]);
                        //Poner el id del ingrediente
                        renglon = renglon.replace("%consistencia%",data[i]["Consistencia"]);
                        //Poner el id del ingrediente
                        renglon = renglon.replace("%unimed%",data[i]["UnidadMedicion"]);
                        // Poner la fecha de caducidad del ingrediente
                        renglon = renglon.replace("%cad%",  pad (data[i]["DiaCadAli"], 2)  + "/" +  pad (data[i]["MesCadAli"], 2)  + "/" + data[i]["AnioCadAli"]);
                        // insertar el ingrediente en el DOM
                        $("#insertarDatos").append(renglon);
                    }

                }
            },
            dataType: 'json'
       });

    });
}


function pad (n, length) {
    var  n = n.toString();
    while(n.length < length)
         n = "0" + n;
    return n;
}

function imprimir(){
    $('#btnImprimir').on("click",function(){
		window.print();
		return false;
	});
}
