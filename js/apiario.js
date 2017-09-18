
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
        $("#opc-contenedor").empty();
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






// **************************************
// ***
// *** FUNCIÓN ALIMENTACIÓN
// ***
// **************************************

// Manipula todos los eventos del apartado de alimentación
// dentro de APIARIOS.HTML
alimentacion = function(){
    // Guarda los JSON resultantes de una busqueda, así no se perderá recursos
    // al volver a buscar en BD para volver a obtener los datos.
    // Util para cuando se buscan registro que serán editados.
    var jsonBusq;

    // Guarda identificadores cuando se obtienen a través de la manupulación
    // del DOM, facilitando su posterior uso.
    // Útil para seleccionar el ID (y en el caso de Preparacion, Nombre)
    // del registro a editar o eliminar.
    var nom;

    // Guarda identificadores cuando se obtienen a través de la manupulación
    // del DOM, facilitando su posterior uso.
    // Útil para seleccionar el ID en el caso de Preparacion
    // del registro a editar o eliminar.
    var id;

    // Variable que ayuda a obtener los padres dentro del DOM
    // del elemento al que se le dió click, para obtener su ID y poder
    // buscar la información de este en el JSON guardado en la
    // variable jsonBusq
    var padre;

    // Variable que ayuda a obtener los ingredientes que serán
    // eliminados de una preparación
    var sumIngr;

    // JSON que almacenará los ingredientes a eliminar cuando
    // se modifica una preparación
    var helpIngredientes = [{
        "IdIngrediente": "",
        "IdPreparacion": ""}];

    // Inserta los controles para gestión de alimentos
    $("#opc-contenedor").append(HTMLcontAlimentacion);
    $("#opc-contenedor").append(HTMLcontGestiones);
    // Inserta los controles para gestionar Ingredientes
    $("#agr-gestiones").append(HTMLgestIngredinetes);
    // Inserta los controles para gestionar Alimentos
    $("#agr-gestiones").append(HTMLgestAlimentos);
    // Inserta los controles para gestionar Preparaciones
    $("#agr-gestiones").append(HTMLgestPreparaciones);


    // **************************************
    // ***
    // *** AGREGAR INGREDIENTE
    // ***
    // **************************************

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Inserción del formulario para
    // ♦ ♦  agregar Ingrediente
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Agregar Ingrediente, el cual despliega
    // El formulario para agregar el ingrediente
    $("#btnAgregarIngrediente").click(function(){
        // Vacia el contenedor de elementos anteriores e inserta el formulario
        // necesario
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLAgregarIngrediente);
        // Remplaza el valor comodín de la variable por el identificador necesario
        // para su posterior manipulación. id = "frmAgrIng"
        $("#agregarIngrediente").append(HTMLFormIngrediente.replace("%FORMULARIO%","frmAgrIng"));

        // AJAX para cargar las unidades de medida de un SELECT dentro del
        // FORM id = "frmAgrIng"
        $.ajax({
            type: "POST",
            url: "../php/llenadoDatosEnum.php",
            // datos necesarios para la busqueda de los valores,
            // en formato JSON
            data: {"tabla":"ingredientes","busqueda" : "UnidadMedida"},
            success: function(data){
                // Seleccionando el campo que se necesita
                var tipos = data[0]["Type"];
                // Manipulación de cadena
                var arg = tipos.split("'");
                for (var i = 0; i < arg.length; i++) {
                    if(i%2 != 0){
                        // Insertando valores a través de la variable HTMLAgregarOptionSelect,
                        // reemplazando el comodín ** con el valor en cuestión
                        var valor = HTMLAgregarOptionSelect.replace("**",arg[i]);
                        valor = valor.replace("%data%", arg[i]);
                        $("#UnidadMedida").append(valor);
                    }
                }
            },
            dataType: 'json'
       });
    });

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de los datos del formulario
    // ♦ ♦  una vez que esté este
    // ♦ ♦  agregar Ingrediente
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del Guardar,, el cual envia la información contenida en el FORM para
    // almacenar un registro a agregarIngrediente.php, el archivo encargado de
    // trabajar con la BD.
    $(document).on('submit', '#frmAgrIng', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos al archivo PHP
        //  retornando un JSON con un mensaje de éxito o fracaso
        $.ajax({
            type: "POST",
            url: "../php/agregarIngrediente.php",
            data: $("#frmAgrIng").serialize(),
            success: function(data){
                if(data.estado == '2'){
                    alert("Error al agregar ingrediente");
                }else{
                    alert("Se agregó ingrediente");
                }
            },
            dataType: 'json'
       });

    });




    // **************************************
    // ***
    // *** MODIFICAR INGREDIENTE
    // ***
    // **************************************

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Inserción del formulario para
    // ♦ ♦  la búsqueda del Ingrediente a modificar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Modificar Ingrediente, el cual insertaen el
    // DOM la estructura del FORM para la búsqueda de dicho ingrediente
    $("#btnModificarIngrediente").click(function(){
        //  Vacia el contenedor en caso de busquedas anteriores
        $("#insertar-gestion").empty();
        //Inserta el formulario de busqueda de alimentos por nombre
        $("#insertar-gestion").append(HTMLModificarIngrediente);
    });


    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del formulario
    // ♦ ♦  la búsqueda del Ingrediente a modificar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Buscar ingrediente, el cual manda los datos
    // al archivo buscarPorNombre.php, y después insertar los registros
    // obtenidos al DOM.
    $(document).on('submit', '#frmbuscIng', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda del FORM
        //  e insertar el en una tabla los registros obtenidos.
        $.ajax({
            type: "POST",
            url: "../php/buscarPorNombre.php",
            // El campo del FORM serializado en formato JSON (la búsqueda a realizar),
            // así como los datos necesarios para realizar la búsqueda.
            data: $("#frmbuscIng").serialize() + "&columna=" + "NombreIngrediente"  + "&tabla=" + "ingredientes",
            success: function(data){
                // Si se recibe un error
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","alimentos"));
                // Si se recibe un objeto JSON con el resultado de la búsqueda
                }else{
                    //Copiar el JSON de respuesta a una variable auxiliar para
                    // evitar volver a consultar la base de datos al momento de
                    // rellenar el FORM con los datos del registro necesario
                    jsonBusq = data;
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusqueda.replace("%OPTION%","Modificar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEd.replace("%NOMBRE%",data[i]["NombreIngrediente"]);
                        //Poner el id del ingrediente
                        rem = rem.replace("%IDALI%",data[i]["IdIngrediente"]);
                        // Poner la fecha de caducidad del ingrediente
                        rem = rem.replace("%FECHA%",pad(data[i]["DiaCadIng"],2) + "/" + pad(data[i]["MesCadIng"],2) + "/" + data[i]["AnioCadIng"]);
                        rem = rem.replace("%CLASS%","edElemIng");
                        // insertar el ingrediente en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });



    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Llenado de datos del formurario para editar la
    // ♦ ♦  información de los ingredientes
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Una vez se elige el registro a editar a través de dar click
    // al icono, se insertará el formulario correspondiente, y se
    // rellenará con la información del registro.
    $(document).on('click', '.edElemIng', function(e) {
        //Previene el trabajo por default del elemento A HTML
        e.preventDefault();
        // Obtener ID del padre del elemento clicleado
        padre = $(this).parent().parent();
        // Obtener el texto (en este caso ID) del padre de la variable padre
        nom = $(padre).children(':first-child').text();
        // Vaciar la caja contenedora e insertar el formulario de ingredientes
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLEditarIngrediente);
        // insertando y modificando el ID a frmEdIng para su posterior manipulación
        $("#agregarIngrediente").append(HTMLFormIngrediente.replace("%FORMULARIO%","frmEdIng"));

        // AJAX para cargar las unidades de medida de un SELECT dentro del
        // FORM id = "frmEdIng"
        $.ajax({
            type: "POST",
            url: "../php/llenadoDatosEnum.php",
            // datos necesarios para la busqueda de los valores,
            // en formato JSON
            data: {"tabla":"alimentos","busqueda" : "UnidadMedicion"},
            success: function(data){
                // Seleccionando el campo que se necesita
                var tipos = data[0]["Type"];
                // Manipulación de cadena
                var arg = tipos.split("'");
                // Insertando valores a través de la variable HTMLAgregarOptionSelect,
                // reemplazando el comodín ** con el valor en cuestión
                for (var i = 0; i < arg.length; i++) {
                    if(i%2 != 0){
                        var valor = HTMLAgregarOptionSelect.replace("**",arg[i]);
                        valor = valor.replace("%data%", arg[i]);
                        $("#UnidadMedida").append(valor);
                    }
                }
            },
            dataType: 'json'
       });


       // Poniendo los datos del registro en los campos correspóndientes
       // del FORM frmEdIng
       for (var i = 0; i < jsonBusq.length; i++) {
           // compara el ID obtenido del elemento clicleado y lo compara con
           // la info de la variable jsonBusq
           if(jsonBusq[i]["IdIngrediente"] === nom ){
               $("#frmEdIng").children(':first-child').children(':nth-child(2)').val(jsonBusq[i]["NombreIngrediente"]);
               $("#UnidadMedida").val(jsonBusq[i]["UnidadMedida"]);
               $("#frmEdIng").children(':nth-child(3)').children(':nth-child(2)').val(jsonBusq[i]["PrecioIngrediente"]);
               var fecha = pad(jsonBusq[i]["AnioCadIng"],4) + "-" + pad(jsonBusq[i]["MesCadIng"],2) + "-" + pad(jsonBusq[i]["DiaCadIng"],2);
               $("#frmEdIng").children(':nth-child(4)').children(':nth-child(2)').val(fecha);
           }
       }
    });



    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de los datos del formulario
    // ♦ ♦  una vez que los datos han sido editados
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del Guardar, el cual envia la información contenida en el FORM para
    // editar un registro a editarIngrediente.php, el archivo encargado de
    // trabajar con la BD.
    $(document).on('submit', '#frmEdIng', function(e) {
        e.preventDefault(e);
        $.ajax({
            type: "POST",
            url: "../php/editarIngrediente.php",
            // Se tiene en formato JSON:
            //     • Todos los valores con los que cuenta el FORM
            //     • el ID del registro a editar (var nom)
            data: $("#frmEdIng").serialize() + "&id=" + nom,
            success: function(data){
                if(data.estado == '2'){
                    alert("Error al editar alimento");
                }else{
                    alert("Se editó el alimento");
                }
            },
            dataType: 'json'
       });

    });




    // **************************************
    // ***
    // *** ELIMINAR INGREDIENTE
    // ***
    // **************************************

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Inserción del formulario para
    // ♦ ♦  la búsqueda del Ingrediente a eliminar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Eliminar Ingrediente, el cual inserta en el
    // DOM la estructura del FORM para la búsqueda de dicho ingrediente
    $("#btnEliminarIngrediente").click(function(){
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLEliminarIngrediente);
    });




    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del formulario
    // ♦ ♦  la búsqueda del Ingrediente a eliminar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Buscar ingrediente, el cual manda los datos
    // al archivo buscarPorNombre.php, y después insertar los registros
    // obtenidos al DOM.
    $(document).on('submit', '#frmbuscInge', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda en el form
        //  e insertar el
        $.ajax({
            type: "POST",
            url: "../php/buscarPorNombre.php",
            // Formato JSON:
            //     • Todos los campos del FORM serializados en formato JSON, es decir
            //       la búsqueda del ingrediente
            //     • Campo de la tabla que se usará para la búsqueda
            //     • Tabla en la cual se buscará
            data: $("#frmbuscInge").serialize() + "&columna=" + "NombreIngrediente"  + "&tabla=" + "ingredientes",
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","ingredientes"));
                }else{
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusqueda.replace("%OPTION%","Eliminar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEl.replace("%NOMBRE%",data[i]["NombreIngrediente"]);
                        //Poner el id del alimento
                        rem = rem.replace("%IDALI%",data[i]["IdIngrediente"]);
                        // Poner la fecha de caducidad del alimento
                        rem = rem.replace("%FECHA%",pad(data[i]["DiaCadIng"],2) + "/" + pad(data[i]["MesCadIng"],2) + "/" + data[i]["AnioCadIng"]);
                        rem = rem.replace("%CLASS%","elElemIng");
                        rem = rem.replace("%MODAL%","modalIngre");
                        // insertar el alimento en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });



    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Obtener ID del registro a eliminar
    // ♦ ♦  y mostrar ventana emergente.
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Una vez se elige el registro a eliminar a través de dar click
    // al icono, y se desplegará una ventama emergente.
    $(document).on('click', '.elElemIng', function(e) {
        // Previene el funcionamiento por default de elemento A HTML
        e.preventDefault();
        // Variable auxiliar para obtener los elementos padres del elemento clicleado
        // en el DOM
        padre = $(this).parent().parent();
        // Obteniendo el ID del registro a través del elemento presente en el DOM
        nom = $(padre).children(':first-child').text();
        // LA VENTANA EMERGENTE APARECERÁ, YA QUE EL HTML ESTÁ CODIFICADO
        // PARA ESTO
    });



    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del registro
    // ♦ ♦  a eliminar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Una vez se se acepta, el registro se eliminará.
    $(document).on('click', '#elimIngre', function(e) {
        // AJAX que envia la información del registro a eliminar y recibe un JSON
        // con la información de la operación
        $.ajax({
            type: "POST",
            url: "../php/eliminarPorId.php",
            // JSON con los siguientes valores:
            //     • eliminar - será el ID del registro que se desea eliminar
            //     • tabla - tabla a la que pertenece el registro
            //     • elemento - campo dentro de la BD necesaria para filtrar registros
            data: {"eliminar": nom, "tabla":"ingredientes", "elemento":"IdIngrediente"},
            success: function(data){
                if(data.estado == '2'){
                    alert("No se eliminó");
                    // $("#insertarBusqueda").children(':first-child').remove();
                    // $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","no eliminado"));
                }else{
                    $('#modalIngre').modal('hide');
                    $(padre).remove();
                }
            },
            dataType: 'json'
       });
    });








    // **************************************
    // ***
    // *** AGREGAR ALIMENTO
    // ***
    // **************************************

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Inserción del formulario para
    // ♦ ♦  agregar Alimento
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Agregar Alimento, el cual despliega
    // El formulario para agregar el alimento
    $("#btnAgregarAlimento").click(function(){
        // Vaciando la sección de posibles usos anteriores e insertando el titulo de
        // la sección, en este caso Agregar Alimento
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLAgregarAlimento);
        // Agregando el cormulario, y cambiando el comodín %FORMULARIO% por el ID
        // para su manipulación posterior. ID = "frmAgrAlimento"
        // Este FORM solo es un fragmento, ya que necesita más partes, que se
        // insertan despues
        $("#agregarAlimento").append(HTMLFormAlimento.replace("%FORMULARIO%","frmAgrAlimento"));
        // Insertando el SELECT que permitirá selecciónar que tipo de alimento es,
        // así como un TRIGGER para insertar INPUTS de manera dinámica, según se requiera
        $("#seleccionantinatu").append(HTMLSelectTipoAlimentacion);
        // Insertando uno de los SELECT dinámicos, este es por default.
        $("#artinatu").append(HTMLAgregarArtificial);
        // Agregando los OPTIONS de este SELECT.
        // Se cambia:
        //     • ** - Por el value que tendrá
        //     • %data% - Cadena que se mostrará al usuario
        var z = HTMLAgregarOptionSelect.replace("**","Energizante");
        z = z.replace("%data%", "Energizante");
        $("#LugarObtencion").append(z);
        z = HTMLAgregarOptionSelect.replace("**","De reserva");
        z = z.replace("%data%", "De reserva");
        $("#LugarObtencion").append(z);

        // AJAX para cargar las unidades de medida de un SELECT dentro del
        // FORM id = "frmAgrAlimento"
        $.ajax({
            type: "POST",
            url: "../php/llenadoDatosEnum.php",
            data: {"tabla":"alimentos","busqueda" : "UnidadMedicion"},
            success: function(data){
                var tipos = data[0]["Type"];
                var arg = tipos.split("'");
                for (var i = 0; i < arg.length; i++) {
                    if(i%2 != 0){
                        var valor = HTMLAgregarOptionSelect.replace("**",arg[i]);
                        valor = valor.replace("%data%", arg[i]);
                        $("#unidadMedicion").append(valor);
                    }
                }
            },
            dataType: 'json'
       });

    });

    // Detecta cambio en el SELECT de tipos alimentos
    // (Natural o artificial), y pone los campos necesarios para
    // cada tipo de alimento
    $(document).on('change','#tipoAlimt',function(){
        // Obtiene el valor del OPTION seleccionado y en base a este
        // inserta el campo necesario
        if($("#tipoAlimt").val() === "Artificial"){
            $("#artinatu").empty();
            $("#artinatu").append(HTMLAgregarArtificial);
            var z = HTMLAgregarOptionSelect.replace("**","Energizante");
            z = z.replace("%data%", "Energizante");
            $("#LugarObtencion").append(z);
            z = HTMLAgregarOptionSelect.replace("**","De reserva");
            z = z.replace("%data%", "De reserva");
            $("#LugarObtencion").append(z);
        }else{
            $("#artinatu").empty();
            $("#artinatu").append(HTMLAgregarNatural);
            var z = HTMLAgregarOptionSelect.replace("**","Colmena ajena");
            z = z.replace("%data%", "Colmena ajena");
            $("#LugarObtencion").append(z);
            z = HTMLAgregarOptionSelect.replace("**","Colmena propia");
            z = z.replace("%data%", "Colmena propia");
            $("#LugarObtencion").append(z);
        }
    });


    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de los datos del formulario
    // ♦ ♦  una vez que esté este
    // ♦ ♦  agregar Alimento
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del Guardar,, el cual envia la información contenida en el FORM para
    // almacenar un registro a agregarAlimento.php, el archivo encargado de
    // trabajar con la BD.

    $(document).on('submit', '#frmAgrAlimento', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda en el form
        //  e insertar el
        $.ajax({
            type: "POST",
            url: "../php/agregarAlimento.php",
            data: $("#frmAgrAlimento").serialize(),
            success: function(data){
                if(data.estado == '2'){
                    alert("Error al agregar alimento");
                }else{
                    alert("Se agregó alimento");

                }
            },
            dataType: 'json'
       });

    });




    // **************************************
    // ***
    // *** MODIFICAR ALIMENTO
    // ***
    // **************************************

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Inserción del formulario para
    // ♦ ♦  la búsqueda del Alimento a modificar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Modificar Alimento, el cual insertaen el
    // DOM la estructura del FORM para la búsqueda de dicho ingrediente
    $("#btnModificiarAlimento").click(function(){
        //  Vacia el contenedor en caso de busquedas anteriores
        $("#insertar-gestion").empty();
        //Inserta el formulario de busqueda de alimentos por nombre
        $("#insertar-gestion").append(HTMLModificarAlimento);
    });



    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del formulario
    // ♦ ♦  la búsqueda del Alimento a modificar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Buscar alimento, el cual manda los datos
    // al archivo buscarPorNombre.php, y después insertar los registros
    // obtenidos al DOM.
    $(document).on('submit', '#formBuscar', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda en el form
        //  e insertar el
        $.ajax({
            type: "POST",
            url: "../php/buscarPorNombre.php",
            data: $("#formBuscar").serialize() + "&columna=" + "NombreAlimento"  + "&tabla=" + "alimentos",
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","alimentos"));
                }else{
                    jsonBusq = data;
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusqueda.replace("%OPTION%","Modificar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEd.replace("%NOMBRE%",data[i]["NombreAlimento"]);
                        //Poner el id del alimento
                        rem = rem.replace("%IDALI%",data[i]["IdAlimento"]);
                        // Poner la fecha de caducidad del alimento
                        rem = rem.replace("%FECHA%",pad(data[i]["DiaCadAli"],2) + "/" + pad(data[i]["MesCadAli"],2) + "/" + data[i]["AnioCadAli"]);
                        rem = rem.replace("%CLASS%","edElemAli");
                        // insertar el alimento en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });




    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Llenado de datos del formurario para editar la
    // ♦ ♦  información de los alimentos
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Una vez se elige el registro a editar a través de dar click
    // al icono, se insertará el formulario correspondiente, y se
    // rellenará con la información del registro.
    $(document).on('click', '.edElemAli', function(e) {
        //Previene el trabajo por default del elemento A HTML
        e.preventDefault();
        // Obtener ID del padre del elemento clicleado
        padre = $(this).parent().parent();
        // Obtener el texto (en este caso ID) del padre de la variable padre
        nom = $(padre).children(':first-child').text();
        // Vaciar la caja contenedora e insertar el formulario de alimentos
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLEditarAlimento);
        // insertando y modificando el ID a frmEdAlimento para su posterior manipulación
        $("#agregarAlimento").append(HTMLFormAlimento.replace("%FORMULARIO%","frmEdAlimento"));
        // Agregar el SELECT que funciona  como TRIGGER para una inserción dinámica
        // de campos del formulario, y su posición default
        $("#seleccionantinatu").append(HTMLSelectTipoAlimentacion);
        $("#artinatu").append(HTMLAgregarArtificial);
        var z = HTMLAgregarOptionSelect.replace("**","Energizante");
        z = z.replace("%data%", "Energizante");
        $("#LugarObtencion").append(z);
        z = HTMLAgregarOptionSelect.replace("**","De reserva");
        z = z.replace("%data%", "De reserva");
        $("#LugarObtencion").append(z);

        // AJAX para cargar las unidades de medida de un SELECT dentro del
        // FORM id = "frmEdAlimento"
        $.ajax({
            type: "POST",
            url: "../php/llenadoDatosEnum.php",
            data: {"tabla":"alimentos","busqueda" : "UnidadMedicion"},
            success: function(data){
                var tipos = data[0]["Type"];
                var arg = tipos.split("'");
                for (var i = 0; i < arg.length; i++) {
                    if(i%2 != 0){
                        var valor = HTMLAgregarOptionSelect.replace("**",arg[i]);
                        valor = valor.replace("%data%", arg[i]);
                        $("#unidadMedicion").append(valor);
                    }
                }
            },
            dataType: 'json'
       });

       // Poniendo los datos del registro en los campos correspóndientes
       // del FORM frmEdAlimento
       for (var i = 0; i < jsonBusq.length; i++) {
           // compara el ID obtenido del elemento clicleado y lo compara con
           // la info de la variable jsonBusq
           if(jsonBusq[i]["IdAlimento"] === nom ){
               $("#frmEdAlimento").children(':first-child').children(':nth-child(2)').val(jsonBusq[i]["NombreAlimento"]);
               $("#frmEdAlimento").children(':nth-child(2)').children(':nth-child(2)').val(jsonBusq[i]["Consistencia"]);
               $("#unidadMedicion").val(jsonBusq[i]["UnidadMedicion"]);
               var fecha = jsonBusq[i]["AnioCadAli"] + "-" + pad(jsonBusq[i]["MesCadAli"],2) + "-" + pad(jsonBusq[i]["DiaCadAli"],2);
               $("#frmEdAlimento").children(':nth-child(4)').children(':nth-child(2)').val(fecha);
           }
       }

        // Buscar la información en la tabla Artificial para desplegar información
        // extra del alimento
        $.ajax({
            type: "POST",
            url: "../php/buscarPorId.php",
            // Datos en formato JSON
            //     • busqueda - ID que se busca
            //     • campo - Necesario para la busqueda
            //     • tabla - Nombre de la tabla en la que se buscó
            data: {"busqueda":nom, "campo":"IdAlimento", "tabla": "artificial"},
            success: function(data){
                // Si se encontró el registro en la tabla, se procede a insertar
                // los campos necesarios del FORM, así como llenar la información
                // de este en los campos recién incertados.
                // Sino es así, el AJAX no realiza acciín alguna.
                if(data.estado != '2'){
                    $("#seleccionantinatu").children(':nth-child(2)').val("Artificial");
                    $("#artinatu").children(':first-child').children(':nth-child(2)').val(data[0]["TipoAlimento"]);
                }
            },
            dataType: 'json'
       });

       // Buscar la información en la tabla Natural para desplegar información
       // extra del alimento
       $.ajax({
           type: "POST",
           url: "../php/buscarPorId.php",
           // Datos en formato JSON
           //     • busqueda - ID que se busca
           //     • campo - Necesario para la busqueda
           //     • tabla - Nombre de la tabla en la que se buscó
           data: {"busqueda":nom, "campo":"IdAlimento", "tabla": "natural"},
           success: function(data){
               // Si se encontró el registro en la tabla, se procede a insertar
               // los campos necesarios del FORM, así como llenar la información
               // de este en los campos recién incertados.
               // Sino es así, el AJAX no realiza acciín alguna.
               if(data.estado != '2'){
                   $("#seleccionantinatu").children(':nth-child(2)').val("Natural");
                   $("#artinatu").empty();
                   $("#artinatu").append(HTMLAgregarNatural);
                   var z = HTMLAgregarOptionSelect.replace("**","Colmena ajena");
                   z = z.replace("%data%", "Colmena ajena");
                   $("#LugarObtencion").append(z);
                   z = HTMLAgregarOptionSelect.replace("**","Colmena propia");
                   z = z.replace("%data%", "Colmena propia");
                   $("#LugarObtencion").append(z);
                   $("#artinatu").children(':first-child').children(':nth-child(2)').val(data[0]["LugarObtencion"]);
               }
           },
           dataType: 'json'
      });
    });


    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de los datos del formulario
    // ♦ ♦  una vez que los datos han sido editados
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del Guardar, el cual envia la información contenida en el FORM para
    // editar un registro a editarAlimento.php, el archivo encargado de
    // trabajar con la BD.
    $(document).on('submit', '#frmEdAlimento', function(e) {
        e.preventDefault(e);
        $.ajax({
            type: "POST",
            url: "../php/editarAlimento.php",
            // Se tiene en formato JSON:
            //     • Todos los valores con los que cuenta el FORM
            //     • el ID del registro a editar (var nom)
            data: $("#frmEdAlimento").serialize() + "&id=" + nom,
            success: function(data){
                if(data.estado == '2'){
                    alert("Error al editar alimento");
                }else{
                    alert("Se editó el alimento");
                }
            },
            dataType: 'json'
       });

   });





   // **************************************
   // ***
   // *** ELIMINAR ALIMENTO
   // ***
   // **************************************

   // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
   // ♦ ♦  Inserción del formulario para
   // ♦ ♦  la búsqueda del Alimento a eliminar
   // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
   // Evento del boton Eliminar Alimento, el cual inserta en el
   // DOM la estructura del FORM para la búsqueda de dicho alimento
    $("#btnEliminarAlimento").click(function(){
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLEliminarAlimento);
    });


    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del formulario
    // ♦ ♦  la búsqueda del Alimento a eliminar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Buscar alimento, el cual manda los datos
    // al archivo buscarPorNombre.php, y después insertar los registros
    // obtenidos al DOM.
    $(document).on('submit', '#formBuscarEl', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda en el form
        //  e insertar el
        $.ajax({
            type: "POST",
            url: "../php/buscarPorNombre.php",
            // Formato JSON:
            //     • Todos los campos del FORM serializados en formato JSON, es decir
            //       la búsqueda del alimento
            //     • Campo de la tabla que se usará para la búsqueda
            //     • Tabla en la cual se buscará
            data: $("#formBuscarEl").serialize()+ "&columna=" + "NombreAlimento"  + "&tabla=" + "alimentos",
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","alimentos"));
                }else{
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusqueda.replace("%OPTION%","Eliminar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEl.replace("%NOMBRE%",data[i]["NombreAlimento"]);
                        //Poner el id del alimento
                        rem = rem.replace("%IDALI%",data[i]["IdAlimento"]);
                        // Poner la fecha de caducidad del alimento
                        rem = rem.replace("%FECHA%",pad(data[i]["DiaCadAli"],2) + "/" + pad(data[i]["MesCadAli"],2) + "/" + data[i]["AnioCadAli"]);
                        rem = rem.replace("%CLASS%","elElemAli");
                        rem = rem.replace("%MODAL%","modalAlim");
                        // insertar el alimento en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });


    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Obtener ID del registro a eliminar
    // ♦ ♦  y mostrar ventana emergente.
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Una vez se elige el registro a eliminar a través de dar click
    // al icono, y se desplegará una ventama emergente.
    $(document).on('click', '.elElemAli', function(e) {
        e.preventDefault();
        // Variable auxiliar para obtener los elementos padres del elemento clicleado
        // en el DOM
        padre = $(this).parent().parent();
        // Variable auxiliar para obtener los elementos padres del elemento clicleado
        // en el DOM
        nom = $(padre).children(':first-child').text();
        // LA VENTANA EMERGENTE APARECERÁ, YA QUE EL HTML ESTÁ CODIFICADO
        // PARA ESTO
    });


    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del registro
    // ♦ ♦  a eliminar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Una vez se elige el registro a eliminar a través de dar click
    // al icono, y se eliminará.
    $(document).on('click', '#elimAlim', function(e) {
        // AJAX que envia la información del registro a eliminar y recibe un JSON
        // con la información de la operación
        $.ajax({
            type: "POST",
            url: "../php/eliminarPorId.php",
            // JSON con los siguientes valores:
            //     • eliminar - será el ID del registro que se desea eliminar
            //     • tabla - tabla a la que pertenece el registro
            //     • elemento - campo dentro de la BD necesaria para filtrar registros
            data: {"eliminar": nom, "tabla":"alimentos", "elemento":"IdAlimento"},
            success: function(data){
                if(data.estado == '2'){
                    alert("No se eliminó");
                    // $("#insertarBusqueda").children(':first-child').remove();
                    // $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","no eliminado"));
                }else{
                    $('#modalAlim').modal('hide');
                    $(padre).remove();
                }
            },
            dataType: 'json'
       });
    });










    // **************************************
    // ***
    // *** AGREGAR PREPARACION
    // ***
    // **************************************

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Inserción del formulario para
    // ♦ ♦  agregar Preparación
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Agregar Preparación, el cual despliega
    // El formulario para agregar el alimento
    $("#btnAgregarPreparacion").click(function(){
        // Vaciando la sección de posibles usos anteriores e insertando el titulo de
        // la sección, en este caso Agregar Preparacion
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLAgregarPreparacion);
        // Agregando el cormulario, y cambiando el comodín %FORMULARIO% por el ID
        // para su manipulación posterior. ID = "frmAgrPreparacion"
        // Este FORM solo es un fragmento, ya que necesita más partes, que se
        // insertan despues
        $("#agregarPreparacion").append(HTMLFormPreparacion.replace("%FORMULARIO%","frmAgrPreparacion"));
        // Insertar la estructura del FORM para agregar ingredientes
        // necesarios para la preparación. Este es un SELECT
        $("#add-opciones").append(HTMLFormPreparacionAgrIng);

        // AJAX para cargar los ID y datos de los alimentos disponibles.
        // Después se agregarán los campos y los datos para su uso al rellenar
        // el FORM
        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            // Formato JSON
            //     • Tabla: La tabla en la cual se hará una consulta general, osea
            //       se consultará todos los registros de esta.
            data: {"tabla":"alimentos"},
            success: function(data){
                var i = 0;
                // Insertando los OPTIONS en el SELECT que agregar los Alimentos
                // disponibles
                while (data[i]) {
                    // Reemplazar:
                    //     • ** - Id del alimento
                    //     • %data% - Nombre del alimento
                    var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdAlimento"]);
                    ins = ins.replace("%data%", data[i]["NombreAlimento"]);
                    $("#IdAlimento").append(ins);
                    i++;
                }
            },
            dataType: 'json'
       });

       // AJAX para cargar los ID y datos de los empleados disponibles.
       // Después se agregarán los campos y los datos para su uso al rellenar
       // el FORM
    //    $.ajax({
    //        type: "POST",
    //        url: "../php/buscarGeneral.php",
    //        // Formato JSON
    //        //     • Tabla: La tabla en la cual se hará una consulta general, osea
    //        //       se consultará todos los registros de esta.
    //        data: {"tabla":"empleados"},
    //        success: function(data){
    //            var i = 0;
    //            // Insertando los OPTIONS en el SELECT que agregar los Empleado
    //            // disponibles
    //            while (data[i]) {
    //                // Reemplazar:
    //                //     • ** - Id del Empleado
    //                //     • %data% - Nombre del Empleado
    // var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdEmpleado"]);
    // ins = ins.replace("%data%", data[i]["NombAlimento"] + " " + data[i]["ApEmpleado"]+ " " + data[i]["AmEmpleado"]);
    //                $("#IdAlimento").append(ins);
    //                i++;
    //            }
    //        },
    //        dataType: 'json'
    //   });






        // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
        // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
        // dato experimental, volover a lo de arriba cuando se esté trabajando con la basecompleta
        // ++++++++++++++++++++++++++++++++
        var c = HTMLAgregarOptionSelect.replace("**","88");
        c = c.replace("%data%", "Empleado de prueba");
        $("#IdEmpleado").append(c);
        // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
        // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••






        // AJAX para cargar los ID y datos de los alimentos disponibles.
        // Después se agregarán los campos y los datos para su uso al rellenar
        // el FORM
        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            // Formato JSON
            //     • Tabla: La tabla en la cual se hará una consulta general, osea
            //       se consultará todos los registros de esta.
            data: {"tabla":"ingredientes"},
            success: function(data){
                // Usando la variable jsonBusq para copiar el JSON de retorno,
                // evitando la consulta de esta tabla a la BD para usos posteriores
                // en el llenado del FORM
                jsonBusq = data;
                var i = 0;
                // Insertando los OPTIONS en el SELECT que agregar los Ingredientes
                // disponibles
                while (data[i]) {
                    // Reemplazar:
                    //     • ** - Id del Ingrediente
                    //     • %data% - Nombre del Ingrediente
                    var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdIngrediente"]);
                    ins = ins.replace("%data%", data[i]["NombreIngrediente"]);
                    $(".IdIngrediente").append(ins);
                    i++;
                }
            },
            dataType: 'json'
       });

    });



    // Evento que sirve para agregar campos de ingredientes extras a la
    // preparación al FORM con el id frmAgrPreparacion cuando se da click
    // al BUTTON agregaa ingrediente, con el ID agrIngForm
    $(document).on('click', '#agrIngForm', function(e) {
        // Agregando los campo (LABEL, INPUT y SELECT) necesarios
        $("#add-opciones").append(HTMLFormPreparacionAgrIng);
        var i = 0;
        // Con ayuda de la variable jsonBusq, que cuenta con una copia de la
        // búsqueda de ingrediente, se llena el SELECT
        while (jsonBusq[i]) {
            // Reemplazar:
            //     • ** - Id del Ingrediente
            //     • %data% - Nombre del Ingrediente
            var ins = HTMLAgregarOptionSelect.replace("**",jsonBusq[i]["IdIngrediente"]);
            ins = ins.replace("%data%", jsonBusq[i]["NombreIngrediente"]);
            $("#add-opciones").children(':last-child').children(':nth-child(1)').children(':nth-child(2)').append(ins);
            i++;
        }
    });



    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de los datos del formulario
    // ♦ ♦  una vez que esté este
    // ♦ ♦  agregar Preparación
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del Guardar,, el cual envia la información contenida en el FORM para
    // almacenar un registro a agregarPreparacion.php, el archivo encargado de
    // trabajar con la BD.
    $(document).on('submit', '#frmAgrPreparacion', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos al archivo PHP
        //  retornando un JSON con un mensaje de éxito o fracaso
        $.ajax({
            type: "POST",
            url: "../php/agregarPreparacion.php",
            data: $("#frmAgrPreparacion").serialize(),
            success: function(data){
                if(data.estado == '2'){
                    alert("Error al agregar ingrediente");
                }else{
                    alert("Se agregó ingrediente");
                    $("#insertar-gestion").empty();
                }
            },
            dataType: 'json'
       });

    });






    // **************************************
    // ***
    // *** MODIFICAR PREPARACION
    // ***
    // **************************************

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Inserción del formulario para
    // ♦ ♦  la búsqueda de la Preparación a modificar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Modificar Preparación, el cual insertaen el
    // DOM la estructura del FORM para la búsqueda de dicha preparación
    $("#btnModificarPreparacion").click(function(){
        //  Vacia el contenedor en caso de busquedas anteriores
        $("#insertar-gestion").empty();
        //Inserta el formulario de busqueda de alimentos por nombre
        $("#insertar-gestion").append(HTMLModificarPreparacion);
    });




    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del formulario
    // ♦ ♦  la búsqueda de la Preparación a modificar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Buscar Preparación, el cual manda los datos
    // al archivo buscarPorNombre.php, y después insertar los registros
    // obtenidos al DOM.
    $(document).on('submit', '#frmbuscPrep', function(e) {
        //Previene el trabajo por default del submit
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../php/buscarPreparacion.php",
            data: $("#frmbuscPrep").serialize(),
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","preparacion"));
                }else{
                    jsonBusq = data;
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusquedaPrep.replace("%OPTION%","Modificar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEd.replace("%NOMBRE%",data[i]["NombreAlimento"]);
                        // Poner el id del alimento
                        rem = rem.replace("%IDALI%",data[i]["IdPreparacion"]);
                        // Poner la fecha de caducidad de la preparación
                        rem = rem.replace("%FECHA%",pad(data[i]["DiaPrep"],2) + "/" + pad(data[i]["MesPrep"],2) + "/" + data[i]["AnioPrep"]);
                        rem = rem.replace("%CLASS%","edElemPrep");
                        // insertar el alimento en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });




    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del formulario
    // ♦ ♦  la búsqueda de la Preparación a eliminar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Buscar Preparación, el cual manda los datos
    // al archivo buscarPorNombre.php, y después insertar los registros
    // obtenidos al DOM.
    $(document).on('click', '.edElemPrep', function(e) {
        e.preventDefault();
        // Obtener ID del padre del elemento clicleado
        padre = $(this).parent().parent();
        // Obtener el texto (en este caso ID) del padre de la variable padre
        id = $(padre).children(':first-child').text();
        nom = $(this).parent().parent().children(':nth-child(2)').text();

        // Vaciando la sección de posibles usos anteriores e insertando el titulo de
        // la sección, en este caso Agregar Preparacion
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLModificarPreparacionF);
        $("#insertar-gestion").append(HTMLFormModPreparacion);
        $("#insertar-gestion").append(HTMLFormModPreparacionBotones);
        $("#ingEx").append(HTMLTablaIng);


        // AJAX para cargar los ID y datos de los alimentos disponibles.
        // Después se agregarán los campos y los datos para su uso al rellenar
        // el FORM
        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            // Formato JSON
            //     • Tabla: La tabla en la cual se hará una consulta general, osea
            //       se consultará todos los registros de esta.
            data: {"tabla":"alimentos"},
            success: function(data){
                var i = 0;
                // Insertando los OPTIONS en el SELECT que agregar los Alimentos
                // disponibles
                while (data[i]) {
                    // Reemplazar:
                    //     • ** - Id del alimento
                    //     • %data% - Nombre del alimento
                    var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdAlimento"]);
                    ins = ins.replace("%data%", data[i]["NombreAlimento"]);
                    $("#IdAlimento").append(ins);
                    i++;
                }
                for (var i = 0; i < jsonBusq.length; i++) {
                    if(jsonBusq[i]["IdPreparacion"] === id && jsonBusq[i]["NombreAlimento"] === nom){
                        $("#IdAlimento").val(jsonBusq[i]["IdAlimento"]);
                    }
                }
            },
            dataType: 'json'
       });

       // AJAX para cargar los ID y datos de los empleados disponibles.
       // Después se agregarán los campos y los datos para su uso al rellenar
       // el FORM
    //    $.ajax({
    //        type: "POST",
    //        url: "../php/buscarGeneral.php",
    //        // Formato JSON
    //        //     • Tabla: La tabla en la cual se hará una consulta general, osea
    //        //       se consultará todos los registros de esta.
    //        data: {"tabla":"empleados"},
    //        success: function(data){
    //            var i = 0;
    //            // Insertando los OPTIONS en el SELECT que agregar los Empleado
    //            // disponibles
    //            while (data[i]) {
    //                // Reemplazar:
    //                //     • ** - Id del Empleado
    //                //     • %data% - Nombre del Empleado
    //                var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdAlimento"]);
    //                ins = ins.replace("%data%", data[i]["NombreAlimento"]);
    //                $("#IdAlimento").append(ins);
    //                i++;
    //            }
    //            for (var i = 0; i < jsonBusq.length; i++) {
    //                if(jsonBusq[i]["IdPreparacion"] === id && jsonBusq[i]["NombreAlimento"] === nom){
    //                    $("#IdEmpleado").val(jsonBusq[i]["IdEmpleado"]);
    //                }
    //            }
    //        },
    //        dataType: 'json'
    //   });


        // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
        // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
        // dato experimental, volover a lo de arriba cuando se esté trabajando con la basecompleta
        // ++++++++++++++++++++++++++++++++
        var c = HTMLAgregarOptionSelect.replace("**","88");
        c = c.replace("%data%", "Empleado de prueba");
        $("#IdEmpleado").append(c);
        // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
        // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••


        // Colocando los datos del registro seleccionado en el FORM para
        // proceder a editarlos
        for (var i = 0; i < jsonBusq.length; i++) {
            // compara el ID obtenido del elemento clicleado y lo compara con
            // la info de la variable jsonBusq
            if(jsonBusq[i]["IdPreparacion"] === id && jsonBusq[i]["NombreAlimento"] === nom){
                var fecha1, fecha2;
                if (navigator.userAgent.search("Firefox") >= 0) {
                    fecha1 = pad (jsonBusq[i]["DiaPrep"], 2) + "-" + pad (jsonBusq[i]["MesPrep"], 2) + "-" + jsonBusq[i]["AnioPrep"];
                    fecha2 = pad (jsonBusq[i]["DiaCadPrep"] , 2)+ "-" + pad (jsonBusq[i]["MesCadPrep"], 2) + "-" + jsonBusq[i]["AnioCadPrep"];
                } else {
                    fecha1 = jsonBusq[i]["AnioPrep"] + "-" + pad (jsonBusq[i]["MesPrep"], 2) + "-" + pad (jsonBusq[i]["DiaPrep"], 2);
                    fecha2 = jsonBusq[i]["AnioCadPrep"] + "-" + pad (jsonBusq[i]["MesCadPrep"], 2) + "-" + pad (jsonBusq[i]["DiaCadPrep"] , 2);
                }
                $("#frmEdPreparacion").children(':nth-child(3)').children(':nth-child(2)').val(fecha1);
                $("#frmEdPreparacion").children(':nth-child(4)').children(':nth-child(2)').val(fecha2);

            }
        }

        // AJAX para cargar los ID y datos de los alimentos disponibles.
        // Después se agregarán los campos y los datos para su uso al rellenar
        // el FORM
        $.ajax({
            type: "POST",
            url: "../php/buscarAlimePrep.php",
            // Formato JSON
            //     • Tabla: La tabla en la cual se hará una consulta general, osea
            //       se consultará todos los registros de esta.
            data: {"busqueda":id},
            success: function(data){
                // Variable auxiliar para manejar el ciclo
                var i = 0;
                // Limpiando el JSON auxiliar
                helpIngredientes = [{
                    "IdIngrediente": "",
                    "IdPreparacion": ""}];
                // Insertando los OPTIONS en el SELECT que agregar los Alimentos
                // disponibles
                while (data[i]) {
                    var ins = HTMLElementTablaIng.replace("%ID%",data[i]["IdIngrediente"]);
                    ins = ins.replace("%NOMBRE%", data[i]["NombreIngrediente"]);
                    ins = ins.replace("%CANT%", data[i]["CantIngrediente"]);
                    ins = ins.replace("%CLASS%", "elAlimPrep");
                    $("#insertarAliTab").append(ins);
                    i++;
                }
            },
            dataType: 'json'
       });

    });

    // Evento que sirve para agregar campos de ingredientes extras a la
    // preparación al FORM con el id frmAgrPreparacion cuando se da click
    // al BUTTON agregaa ingrediente, con el ID agrIngForm
    $(document).on('click', '#agrIngFormEd', function(e) {
        // Agregando los campo (LABEL, INPUT y SELECT) necesarios
        $("#add-opciones").append(HTMLFormPreparacionAgrIng);

        // AJAX para cargar los ID y datos de los alimentos disponibles.
        // Después se agregarán los campos y los datos para su uso al rellenar
        // el FORM
        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            // Formato JSON
            //     • Tabla: La tabla en la cual se hará una consulta general, osea
            //       se consultará todos los registros de esta.
            data: {"tabla":"ingredientes"},
            success: function(data){
                var i = 0;
                // Insertando los OPTIONS en el SELECT que agregar los ingredientes
                // disponibles
                while (data[i]) {
                    // Reemplazar:
                    //     • ** - Id del Ingrediente
                    //     • %data% - Nombre del Ingrediente
                    var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdIngrediente"]);
                    ins = ins.replace("%data%", data[i]["NombreIngrediente"]);
                    $("#add-opciones").children(':last-child').children(':nth-child(1)').children(':nth-child(2)').append(ins);
                    i++;
                }
            },
            dataType: 'json'
       });
    });


    // Evento para cargar en un JSON los ingredientes que se eliminarán
    // en la preparación a modificar.
    $(document).on('click', '.elAlimPrep', function(e) {
        e.preventDefault();
        // Obteniendo el renglón de la tabla que contiene el ingrediente a
        // eliminar de la preparación
        sumIngr = $(this).parent().parent();
        // Agregando el registro al JSON que se utilizará para eliminar
        // los ingredientes en la preparación a modificar
        helpIngredientes.push(
            {IdIngrediente: sumIngr.children(':first-child').text(), IdPreparacion: id}
        );
        // removiendo el renglón del DOM para que ya no sea visible al usuario.
        // Todavía no se ha eliminado de la BD
        $(sumIngr).remove();
    });


    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del formulario
    // ♦ ♦  para modificar el registro
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento para enviar los datos que se modificarán en el registro.
    // así como eliminar los ingredientes que se seleccionaron.
    $(document).on('click', '#frmEdPreparacion', function(e) {
        //Previene el trabajo por default del submit
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "../php/eliminarIngPreparacion.php",
            data: sumIngr,
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    alert("No se modificó");
                }else{
                    alert("se modificó :D");
                }
            },
            dataType: 'json'
       });

        $.ajax({
            type: "POST",
            url: "../php/editarPreparacion.php",
            data: $("#frmEdPreparacion").serialize() + "&IdPreparacion=" + id,
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    alert("No se modificó");
                }else{
                    alert("se modificó :D");
                }
            },
            dataType: 'json'
       });
    });

















    // **************************************
    // ***
    // *** ELIMINAR PREPARACION
    // ***
    // **************************************

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Inserción del formulario para
    // ♦ ♦  la búsqueda de la Preparación a eliminar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Modificar Preparación, el cual insertaen el
    // DOM la estructura del FORM para la búsqueda de dicha preparación
    $("#btnEliminarPreparacion").click(function(){
        //  Vacia el contenedor en caso de busquedas anteriores
        $("#insertar-gestion").empty();
        //Inserta el formulario de busqueda de alimentos por nombre
        $("#insertar-gestion").append(HTMLEliminarPreparacion);
    });




    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del formulario
    // ♦ ♦  la búsqueda de la Preparación a eliminar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Buscar Preparación, el cual manda los datos
    // al archivo buscarPorNombre.php, y después insertar los registros
    // obtenidos al DOM.
    $(document).on('submit', '#frmbuscElPrep', function(e) {
        //Previene el trabajo por default del submit
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../php/buscarPreparacion.php",
            data: $("#frmbuscElPrep").serialize(),
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","preparacion"));
                }else{
                    jsonBusq = data;
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusquedaPrep.replace("%OPTION%","Modificar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEl.replace("%NOMBRE%",data[i]["NombreAlimento"]);
                        // Poner el id del alimento
                        rem = rem.replace("%IDALI%",data[i]["IdPreparacion"]);
                        // Poner la fecha de caducidad de la preparación
                        rem = rem.replace("%FECHA%",pad(data[i]["DiaPrep"],2) + "/" + pad(data[i]["MesPrep"],2) + "/" + data[i]["AnioPrep"]);
                        rem = rem.replace("%CLASS%","elElemPrep");
                        rem = rem.replace("%MODAL%","modalPrep");
                        // insertar el alimento en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });


    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Obtener ID del registro a eliminar
    // ♦ ♦  y mostrar ventana emergente.
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Una vez se elige el registro a eliminar a través de dar click
    // al icono, y se desplegará una ventama emergente.
    $(document).on('click', '.elElemPrep', function(e) {
        e.preventDefault();
        // Variable auxiliar para obtener los elementos padres del elemento clicleado
        // en el DOM
        padre = $(this).parent().parent();
        // Variable auxiliar para obtener los elementos padres del elemento clicleado
        // en el DOM
        nom = $(padre).children(':first-child').text();
        // LA VENTANA EMERGENTE APARECERÁ, YA QUE EL HTML ESTÁ CODIFICADO
        // PARA ESTO
    });


    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del registro
    // ♦ ♦  a eliminar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Una vez se elige el registro a eliminar a través de dar click
    // al icono, y se eliminará.
    $(document).on('click', '#elimPrep', function(e) {
        // AJAX que envia la información del registro a eliminar y recibe un JSON
        // con la información de la operación
        $.ajax({
            type: "POST",
            url: "../php/eliminarPorId.php",
            // JSON con los siguientes valores:
            //     • eliminar - será el ID del registro que se desea eliminar
            //     • tabla - tabla a la que pertenece el registro
            //     • elemento - campo dentro de la BD necesaria para filtrar registros
            data: {"eliminar": nom, "tabla":"encabpreparacion", "elemento":"IdPreparacion"},
            success: function(data){
                if(data.estado == '2'){
                    alert("No se eliminó");
                    // $("#insertarBusqueda").children(':first-child').remove();
                    // $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","no eliminado"));
                }else{
                    $('#modalPrep').modal('hide');
                    $(padre).remove();
                }
            },
            dataType: 'json'
       });
    });



}
// **************************************
// ***
// *** FIN DE FUNCIÓN ALIMENTACIÓN
// ***
// **************************************


function pad (n, length) {
    var  n = n.toString();
    while(n.length < length)
         n = "0" + n;
    return n;
}
