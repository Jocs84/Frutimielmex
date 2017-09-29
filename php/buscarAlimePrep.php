<?php

    // Buscar los ingredientes que existen en una preparación
    // en base al ID de la preparación
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST las siguientes variables
    // eN el formato
    //   VAR: FUNCION VARIABLE - CLAVE EN POST
    //     • busqueda: ID de la preparación a la cual se le buscará
    //                 sus ingredinetes - 'busqueda'


    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $busqueda = $_POST['busqueda'];


        // Se llama a la función buscarAlimePrep() con
        //     $busqueda
        // Para buscar todos los ingredientes en base al ID
        // de la Preparacion
        $retorno = generar::buscarAlimePrep($busqueda);

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
