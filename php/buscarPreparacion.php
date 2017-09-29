<?php

    // Buscar una preparación en base del nombre del
    // alimento que se preparó
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST las siguientes variables
    // eN el formato
    //   VAR: FUNCION VARIABLE - CLAVE EN POST
    //     • busqueda: cadena que representa el nombre del alimento
    //       que se preparó - 'nombre'

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $busqueda = $_POST['nombre'];

        // Se llama a la función buscarPreparacion() con
        //     $busqueda
        // Para buscar todos los ingredientes en base al ID
        // de la Preparacion
        $retorno = generar::buscarPreparacion($busqueda);

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
