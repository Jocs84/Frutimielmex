<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $registro = $_POST['eliminar'];
        $tabla = $_POST['tabla'];
        $elemento = $_POST['elemento'];

        $retorno = generar::eliminarReg($tabla,$elemento,$registro);
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
