<?php

    // Eliminar un elemento en base al ID de este o de otro elemento.
    // Es general, por lo tanto tienes que especificar la tabla el registro
    // qye se elimanrá
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST las siguientes variables
    // eN el formato
    //   VAR: FUNCION VARIABLE - CLAVE EN POST
    //     • registro: ID del registro que se eliminará - 'eliminar'
    //     • tabla: tabla en la cual se elimminará el registro - 'tabla'
    //     • elemento: nombre de la columna que se tomará de referencia
    //              para buscar el elemento (columna) - 'elemento'


    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $registro = $_POST['eliminar'];
        $tabla = $_POST['tabla'];
        $elemento = $_POST['elemento'];

        // Se llama a la función elimIngPreparacion() con
        //     $tabla,
        //     $elemento,
        //     $registro
        // Para eliminar el registro,
        // la cual tendrá un retorno si es eliminaron,
        // de lo contrario, no retornará.
        $retorno = generar::eliminarReg($tabla,$elemento,$registro);

        // Si retorna, se retornará JSON con un estado 1 y el mensaje
        // "elemento agrgado"
        // Si no es correcto, retorna un JSON con un estado 2 y un
        // mensaje "No se regristró"
        if ($retorno) {
            $array = array(
                'estado' => '1',
                'mensaje' => 'Elemento eliminado'
            );
            print json_encode($array);
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
