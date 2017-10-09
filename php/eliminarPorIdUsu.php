<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientosUsuarios.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $registro = $_POST['eliminar'];
        $tabla = $_POST['tabla'];
        $elemento = $_POST['elemento'];

        $retorno = generar::eliminarUsu($tabla,$elemento,$registro);
        if ($retorno = 1) {
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
