<?php

    // Eliminar registros de la tabla Preparacion, correspondientes
    // a los ingredientes de una  preparación que se eliminaron al editar
    // dicha preparación
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST un JSON, que se procederá a almacenar en las
    // variables para trabajarlas en PHP
    //   VAR: FUNCION VARIABLE - CLAVE EN JSON
    //     • idPreparacion: ID de la preparación que se editó - 'IdPreparacion'
    //     • idIngrediente: ID del ingrediente que se desea eliminar - 'IdIngrediente'

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $idPreparacion = $_POST['IdPreparacion'];
        $idIngrediente = $_POST['IdIngrediente'];

        // Se llama a la función elimIngPreparacion() con
        //     $idPreparacion
        //     $idIngrediente
        // Para eliminar los ingredientes necesarios,
        // la cual tendrá un retorno si es eliminaron,
        // de lo contrario, no retornará.
        $retorno = generar::elimIngPreparacion(
            $idPreparacion,$idIngrediente
        );

        // Si retorna, se retornará JSON con un estado 1 y el mensaje
        // "elemento agrgado"
        // Si no es correcto, retorna un JSON con un estado 2 y un
        // mensaje "No se regristró"
        if ($retorno) {
            $array = array(
                'estado' => '1',
                'mensaje' => 'Elemento agregado'
            );
            print json_encode($array);

        }else {
            $array = array(
                'estado' => '2',
                'mensaje' => 'No se registro'
            );
            print json_encode($array);

        }

    }

 ?>
