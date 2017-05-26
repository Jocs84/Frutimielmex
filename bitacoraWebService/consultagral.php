<?php
    /**
    * Cosulta todos los datos de los usuarios
    * y genera el JSON correspondiente.
    */

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // Manejar petición GET
        $generar = generar::getAll();

        if ($generar){

            $datos["estado"] = 1;
            $datos["datos"] = $generar;
            print json_encode($datos);

        } else {
            print json_encode(array(
                "codigo" => 2,
                "mensaje" => "Ha ocurrido un error"
            ));
        }
    }
 ?>
