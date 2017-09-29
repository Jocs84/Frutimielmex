<?php

    // Búsqueda general de una tabla, es necesario el nombre de dicha
    // tabla
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST las siguientes variables columna
    // eN el formato
    //   VAR: FUNCION VARIABLE - CLAVE EN POST
    //     • tabla: Tabla de la cual se desea hacer una búsqueda gral - 'tabla'

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $tabla = $_POST['tabla'];

        // Se llama a la función buscarGeneral() con
        //     $tabla
        // Para hacer una consulta general de todos los elementos
        // de dicha tabla.
        $retorno = generar::buscarGeneral($tabla);

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
