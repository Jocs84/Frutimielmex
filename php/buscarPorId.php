<?php

    // Buscar un elemento en base al ID de este o de otro elemento.
    // Es general, por lo tanto tienes que especificar la tabla en legal
    // que se buscará y el campo en el que se buscará
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST las siguientes variables
    // eN el formato
    //   VAR: FUNCION VARIABLE - CLAVE EN POST
    //     • busqueda: ID que se buscará - 'busqueda'
    //     • tabla: tabla en la cual se hará la búsqueda - 'tabla'
    //     • campo: nombre de la columna que se tomará de referencia
    //              para buscar el elemento - 'campo'

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $busqueda = $_POST['busqueda'];
        $tabla = $_POST['tabla'];
        $campo = $_POST['campo'];

        // Se llama a la función buscarPorId() con
        //    $tabla,
        //    $campo,
        //    $busqueda
        // Para buscar el ID en la columna y tabla necesaria
        $retorno = generar::buscarPorId($tabla,$campo,$busqueda);

        // Si retorna, entonces a su vez retornará el resultado
        // de dicha búsqueda en un formato JSON
        // Si no es correcto, retorna un JSON con un estado 2 y un
        // mensaje "No se regristró"
        if ($retorno) {
            print json_encode($retorno);
        }else {
            $array = array(
                'estado' => '2',
                'mensaje' => 'No se obtuvo registro'
            );
            print json_encode($array);

        }

    }

 ?>
