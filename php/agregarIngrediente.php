<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $nombre = $_POST['NombreIngrediente'];
        $unidadmed = $_POST['UnidadMedida'];
        $precio = $_POST['PrecioIngrediente'];
        $fecha = $_POST['CadIngrediente'];
        $token = strtok($fecha,"-");
        $data = array();
        $i = 0;
        while ($token !== false){
            $data[$i] =  $token;
            $token = strtok("-");
            $i++;
        }
        $dia = $data[0];
        $mes = $data[1];
        $anio = $data[2];


        $retorno = generar::insertarIngrediente(
            $nombre,$unidadmed,$precio,$dia,$mes,$anio
        );
        if ($retorno) {
            $array = array(
                        'estado' => '1',
                        'mensaje' => 'Elemento agregado'
                    );
                    print json_encode($array);

        }else {
            //enviar respuesta con un JSON
            $array = array(
                'estado' => '2',
                'mensaje' => 'No se registro'
            );
            print json_encode($array);

        }

    }

 ?>
