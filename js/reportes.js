
// *********************************************************************************
// ***
// *** REPORTES.JS se encarga de manipular el DOM y efectos del archivo
// *** REPORTES.HTML, así como generar los reportes en PDF
// *** Este archivo manipula lo siguiente:
// ***     -Mostrar reportes en navegador de:
// ***          ♦ Apiarios
// ***              • Generales
// ***              • Alimentación
// ***              • etc
// ***          ♦ Ventas
// ***          ♦ Reportes personalizados
// ***     -Descargar reportes en formato PDF de todo lo anterior.
// ***
// *********************************************************************************


// **************************************
// ***
// *** Variables globales
// ***
// **************************************

// Para la generación de reportes en PDF.
// Representa los renglones que tendrá la tabla del reporte.
// Será un JSON
var rows;

// Para la generación de reportes en PDF.
// Representa las columnas que tendrá la tabla del reporte.
// Su estructura será:
//      columns = [
//           {
//              title: "Titulo de la columna",
//              dataKey: "Clave de este valor en el JSON rows"
//           },
//           ...
//      ];
var columns;

// Titulo que aparecerá en el interior del reporte.
var titulo;

// Nombre del archivo con extención .pdf con el cual se descargará
// dicho reporte
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

    // Cuando se de click al boton para imprimir (),
    // se evitará el funcionamiento por default del botón, y se ejecutará
    // la función imprimirReporte, que generará y descargará al ordenador
    // el reporte en formato PDF.
    $(document).on('click','#btnImprimir',function(e){
        e.preventDefault();
        imprimirReporte();
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
                    titulo = "Alimentos existentes \n" +  fechaActual() ;
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
                    titulo = "Ingredientes existentes \n" + fechaActual();
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
                    titulo = "Ingredientes existentes \n" + fechaActual();
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




// **************************************
// ***
// *** FUNCIÓN imprimirReporte()
// *** Crea un objeto que después de
// *** integrar todo lo que es necesario, se
// *** genera un archivo en PDF, el cual
// *** se descarga al navegador.
// ***
// **************************************
function imprimirReporte() {
    //Creación del objeto jsPDF (la librería utilizada)
    var doc = new jsPDF('p', 'pt');
    // inserción de la info que se almacenará en el
    // PDF
    doc.autoTable(
        // Se agrega las columnas y filas que ya se han establecido
        // para la tabla
        columns, rows, {
            //Margenes de la hoja
            margin: {top: 200},
            // Se agrega el contenido extra que llevará el reporte
            addPageContent: function(data) {

                // PARTE SUPERIOR DEL REPORTE
                    // -Tamaño, color y estilo de letra
                    // -Inserción de imagen de panal y logo
                    // -Titulo del reporte
                doc.setFontSize(25);
                doc.setTextColor(40);
                doc.setFontStyle('normal');
                doc.addImage(HTMLImgData, 'PNG', 0, 0, 595, 170);
                doc.text(titulo, data.settings.margin.left + 180, 122);

                // PARTE INFERIOR DEL REPORTE
                    // -Número de página y tamaño de este texto
                    // Posición de este texto
                var str = "Página " + data.pageCount;
                doc.setFontSize(10);
                doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
            }
        }
    );
    // Se guarda genera el archivo .pdf y se le da un nombre,
    // después se descarga al ordenador
    doc.save(nombreArchivo);
}
