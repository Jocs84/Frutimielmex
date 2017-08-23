
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

    // var doc = new jsPDF();
    // var specialElementHandlers = {
    //     '#help': function (element, renderer) {
    //         return true;
    //     }
    // };

    $(document).on('click','#btnImprimir',function(e){
        e.preventDefault();
        demoFromHTML();
		// window.print();
		// return false;
        //
        // doc.fromHTML($('#repImp').html(), 15, 15, {
        //     'width': 170,
        //         'elementHandlers': specialElementHandlers
        // });
        // doc.save('sample-file.pdf');
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

// function imprimir(){
//     $('#btnImprimir').on("click",function(){
// 		window.print();
// 		return false;
// 	});
// }



function demoFromHTML() {
    var pdf = new jsPDF('p', 'in', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#repImp')[0];

    specialElementHandlers = {
        '#help': function(element, renderer) {
            return true
        }
    };

    pdf.fromHTML(
        source,
        0.5,
        0.5,
        {
            'width':7.5,
            'elementHandlers': specialElementHandlers
        }
    );

    pdf.save('filename.pdf');

    // pageHeight = pdf.internal.pageSize.height;
    //
    // margins = {
    //     top: 80,
    //     bottom: 60,
    //     left: 40,
    //     width: 522
    // };
    // // all coords and widths are in jsPDF instance's declared units
    // // 'inches' in this case
    //
    // pdf.fromHTML(
    //         source, // HTML string or DOM elem ref.
    //         margins.left, // x coord
    //         margins.top, {// y coord
    //             'width': margins.width, // max width of content on PDF
    //             'pagesplit': true,
    //             'elementHandlers': specialElementHandlers
    //         },
    //     function(dispose) {
    //         // dispose: object with X, Y of the last line add to the PDF
    //         //          this allow the insertion of new lines after html
    //         pdf.save('Test.pdf');
    //     }
    //     , margins);
}
