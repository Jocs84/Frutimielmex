
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
// *** Variables globales
// ***
// **************************************

var rows;
var columns;
var titulo;
var nombreArchivo;

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
        demoFromHTML();
	});
});


// **************************************
// ***
// *** FUNCIÓN ALIMENTOS
// ***
// **************************************

// Manipula todos los eventos del apartado de alimentación
// dentro de REPORTES.HTML
alimentos = function()  {

    // Muestra el reporte definido de los
    // alimentos existentes en la BD
    $(document).on('click','#opc-alimen',function(e){
        e.preventDefault();
        $("#opc-contenedor").empty();
        $("#opc-contenedor").append(HTMLTituloReporte.replace("%titulo%","Alimentos existentes"));

        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            // El campo del FORM serializado en formato JSON (la búsqueda a realizar),
            // así como los datos necesarios para realizar la búsqueda.
            data: {"tabla":"alimentos"},
            success: function(data){
                rows = data;
                // Si se recibe un error
                if(data.estado == '2'){
                    //  Mostrar mensaje de advertencia
                    $("#opc-contenedor").append(HTMLAlertaNoElementos);
                // Si se recibe un objeto JSON con el resultado de la búsqueda
                }else{
                    $("#opc-contenedor").append(HTMLBotonImp);
                    $("#opc-contenedor").append(HTMLRepAlimentosCuerpo);
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var renglon = HTMLRepAlimentosRenglon.replace("%nombre%",data[i]["NombreAlimento"]);
                        //Poner el id del ingrediente
                        renglon = renglon.replace("%consistencia%",data[i]["Consistencia"]);
                        //Poner el id del ingrediente
                        renglon = renglon.replace("%unimed%",data[i]["UnidadMedicion"]);
                        // Poner la fecha de caducidad del ingrediente
                        renglon = renglon.replace("%cad%",  pad (data[i]["DiaCadAli"], 2)  + "/" +  pad (data[i]["MesCadAli"], 2)  + "/" + data[i]["AnioCadAli"]);
                        rows[i]["DiaCadAli"] = pad (data[i]["DiaCadAli"], 2)  + "/" +  pad (data[i]["MesCadAli"], 2)  + "/" + data[i]["AnioCadAli"];
                        // insertar el ingrediente en el DOM
                        $("#insertarDatos").append(renglon);
                    }
                    titulo = "Alimentos existentes"
                    columns = [
                        {title: "Nombre alimento", dataKey: "NombreAlimento"},
                        {title: "Consistencia", dataKey: "Consistencia"},
                        {title: "Unidad de medicion", dataKey: "UnidadMedicion"},
                        {title: "Caducidad", dataKey: "DiaCadAli"},
                    ];
                    nombreArchivo = "Reporte - Alimentos existentes " +  fechaActual() + ".pdf";
                }
            },
            dataType: 'json'
       });

    });


    // Muestra el reporte definido de los
    // alimentos existentes en la BD
    $(document).on('click','#opc-ingr',function(e){
        e.preventDefault();
        $("#opc-contenedor").empty();
        $("#opc-contenedor").append(HTMLTituloReporte.replace("%titulo%","Ingredientes existentes"));

        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            // El campo del FORM serializado en formato JSON (la búsqueda a realizar),
            // así como los datos necesarios para realizar la búsqueda.
            data: {"tabla":"ingredientes"},
            success: function(data){
                rows = data;
                // Si se recibe un error
                if(data.estado == '2'){
                    //  Mostrar mensaje de advertencia
                    $("#opc-contenedor").append(HTMLAlertaNoElementos);
                // Si se recibe un objeto JSON con el resultado de la búsqueda
                }else{
                    $("#opc-contenedor").append(HTMLBotonImp);
                    $("#opc-contenedor").append(HTMLRepIngCuerpo);
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var renglon = HTMLRepAlimentosRenglon.replace("%nombre%",data[i]["NombreIngrediente"]);
                        //Poner el id del ingrediente
                        renglon = renglon.replace("%consistencia%",data[i]["PrecioIngrediente"]);
                        //Poner el id del ingrediente
                        renglon = renglon.replace("%unimed%",data[i]["UnidadMedida"]);
                        // Poner la fecha de caducidad del ingrediente
                        renglon = renglon.replace("%cad%",  pad (data[i]["DiaCadIng"], 2)  + "/" +  pad (data[i]["MesCadIng"], 2)  + "/" + data[i]["AnioCadIng"]);
                        rows[i]["DiaCadAli"] = pad (data[i]["DiaCadIng"], 2)  + "/" +  pad (data[i]["MesCadIng"], 2)  + "/" + data[i]["AnioCadIng"];
                        // insertar el ingrediente en el DOM
                        $("#insertarDatos").append(renglon);
                    }
                    titulo = "Ingredientes existentes"
                    columns = [
                        {title: "Nombre ingrediente", dataKey: "NombreIngrediente"},
                        {title: "Precio", dataKey: "PrecioIngrediente"},
                        {title: "Unidad de medicion", dataKey: "UnidadMedida"},
                        {title: "Caducidad", dataKey: "DiaCadIng"},
                    ];
                    nombreArchivo = "Reporte - Alimentos existentes " +  fechaActual() + ".pdf";
                }
            },
            dataType: 'json'
       });

    });


    // Muestra el reporte definido de las
    // preparaciones existentes en la BD
    $(document).on('click','#opc-prep',function(e){
        e.preventDefault();
        $("#opc-contenedor").empty();
        $("#opc-contenedor").append(HTMLTituloReporte.replace("%titulo%","Preparaciones existentes"));


        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            // El campo del FORM serializado en formato JSON (la búsqueda a realizar),
            // así como los datos necesarios para realizar la búsqueda.
            data: {"tabla":"ingredientes"},
            success: function(data){
                rows = data;
                // Si se recibe un error
                if(data.estado == '2'){
                    //  Mostrar mensaje de advertencia
                    $("#opc-contenedor").append(HTMLAlertaNoElementos);
                // Si se recibe un objeto JSON con el resultado de la búsqueda
                }else{
                    $("#opc-contenedor").append(HTMLBotonImp);
                    $("#opc-contenedor").append(HTMLRepIngCuerpo);
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var renglon = HTMLRepAlimentosRenglon.replace("%nombre%",data[i]["NombreIngrediente"]);
                        //Poner el id del ingrediente
                        renglon = renglon.replace("%consistencia%",data[i]["PrecioIngrediente"]);
                        //Poner el id del ingrediente
                        renglon = renglon.replace("%unimed%",data[i]["UnidadMedida"]);
                        // Poner la fecha de caducidad del ingrediente
                        renglon = renglon.replace("%cad%",  pad (data[i]["DiaCadIng"], 2)  + "/" +  pad (data[i]["MesCadIng"], 2)  + "/" + data[i]["AnioCadIng"]);
                        rows[i]["DiaCadAli"] = pad (data[i]["DiaCadIng"], 2)  + "/" +  pad (data[i]["MesCadIng"], 2)  + "/" + data[i]["AnioCadIng"];
                        // insertar el ingrediente en el DOM
                        $("#insertarDatos").append(renglon);
                    }
                    titulo = "Ingredientes existentes"
                    columns = [
                        {title: "Nombre ingrediente", dataKey: "NombreIngrediente"},
                        {title: "Precio", dataKey: "PrecioIngrediente"},
                        {title: "Unidad de medicion", dataKey: "UnidadMedida"},
                        {title: "Caducidad", dataKey: "DiaCadIng"},
                    ];
                    nombreArchivo = "Reporte - Alimentos existentes " +  fechaActual() + ".pdf";
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

function fechaActual(){
    var d = new Date();
    var mes = d.getMonth()+1;
    var dia = d.getDate();

    var output = (dia < 10 ? '0' : '') + dia + '/' +
        (mes < 10 ? '0' : '') + mes + '/' +
        d.getFullYear() ;
    return output;
}



function demoFromHTML() {
    var doc = new jsPDF('p', 'pt');
    // var imgData = HTMLImgData;
    // doc.addImage(HTMLImgData, 'PNG', 0, 0, 595, 170);
    // var totalPagesExp = doc.putTotalPages;
    doc.autoTable(
        columns, rows, {
            margin: {top: 200},
            addPageContent: function(data) {

                // HEADER
                doc.setFontSize(25);
                doc.setTextColor(40);
                doc.setFontStyle('normal');
                doc.addImage(HTMLImgData, 'PNG', 0, 0, 595, 170);
                doc.text(titulo, data.settings.margin.left + 180, 122);

                // FOOTER
                var str = "Página " + data.pageCount;
                doc.setFontSize(10);
                doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);


            }
        }
    );
    doc.save(nombreArchivo);
}
