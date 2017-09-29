<?php

    // Obtener los valores de un ENUM de una columna en específico.
    // Al ser este un  movimiento que se puede hacer con cualquier ENUM,
    // es necesario el nombre de la tabla al cual pertenece este ENUM,
    // así como la Columna que contiene el ENUM.
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST un JSON, que se procederá a almacenar en las
    // variables para trabajarlas en PHP
    //   VAR: FUNCION VARIABLE - CLAVE EN JSON
    //     • tabla: tabla donde se encuentra el ENUM - 'tabla'
    //     • busqueda: columna donde se encuentra el ENUM  - 'busqueda'


    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $tabla = $_POST['tabla'];
        $busqueda = $_POST['busqueda'];

        // Se llama a la función obtenerEnum() con
        //     $tabla,
        //     $busqueda
        // Para realizar la búsqueda y valores de dicho ENUM
        $retorno = generar::obtenerEnum($tabla,$busqueda);

        // Si retorna, se retornará JSON con los valores del ENUM
        // Si no es correcto, retorna un JSON con un estado 2 y un
        // mensaje "No se regristró"
        if ($retorno) {
            print json_encode($retorno);
        }else {
            //enviar respuesta con un JSON
            print json_encode(
                array(
                    'estado' => '2',
                    'mensaje' => 'No se obtuvo registro'
                )
            );
        }

    }

 ?>
