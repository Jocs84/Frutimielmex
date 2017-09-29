<?php

    // Busqueda de un elemento en una tabla por medio de un nombre
    // o texto
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST las siguientes variables
    // eN el formato
    //   VAR: FUNCION VARIABLE - CLAVE EN POST
    //     • busqueda: cadena que se buscará en una tabla - 'busqueda'
    //     • columna: nombre de la columna que se tomará de referencia
    //                para buscar el elemento - 'columna'
    //     • tabla: tabla en la cual se hará la búsqueda - 'tabla'

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $busqueda = $_POST['nombre'];
        $columna = $_POST['columna'];
        $tabla = $_POST['tabla'];

        // Se llama a la función buscarPorNombre() con
        //    $busqueda,
        //    $columna,
        //    $tabla
        // Para buscar el ID en la columna y tabla necesaria
        $retorno = generar::buscarPorNombre($busqueda,$tabla,$columna);

        // Si retorna, entonces a su vez retornará el resultado
        // de dicha búsqueda en un formato JSON
        // Si no es correcto, retorna un JSON con un estado 2 y un
        // mensaje "No se regristró"
        if ($retorno) {
            print json_encode($retorno);
        }else {
            //enviar respuesta con un JSON
            $array = array(
                'estado' => '2',
                'mensaje' => 'No se obtuvo registro'
            );
            print json_encode($array);

        }

    }

 ?>
