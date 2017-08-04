<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $idAlimento = $_POST['IdAlimento'];
        $idEmpleado = $_POST['IdEmpleado'];
        $fechaPrep = $_POST['FechaPrep'];
        $fechaCadPrep = $_POST['FechaCadPrep'];

        $token = strtok($fechaPrep,"-");
        $data = array();
        $i = 0;
        while ($token !== false){
            $data[$i] =  $token;
            $token = strtok("-");
            $i++;
        }
        $diaPrep = $data[0];
        $mesPrep = $data[1];
        $anioPrep = $data[2];

        $token = strtok($fechaCadPrep,"-");
        $data1 = array();
        $i = 0;
        while ($token !== false){
            $data1[$i] =  $token;
            $token = strtok("-");
            $i++;
        }
        $diaCadPrep = $data1[0];
        $mesCadPrep = $data1[1];
        $anioCadPrep = $data1[2];



        $idIngrediente = $_POST['IdIngrediente'];
        $cantIngrediente = $_POST['CantIngrediente'];


        $retorno = generar::insertarEncabPreparacion(
            $idAlimento,$idEmpleado,$diaPrep,$mesPrep,$anioPrep,
            $diaCadPrep,$mesCadPrep,$anioCadPrep
        );
        if ($retorno) {
            $retorno2 = generar::insertarPreparacion(
                $idIngrediente,$cantIngrediente
            );
            if($retorno2){
                $array = array(
                            'estado' => '1',
                            'mensaje' => 'Elemento agregado'
                        );
                print json_encode($array);
            }else{
                $array = array(
                    'estado' => '2',
                    'mensaje' => 'No se registro'
                );
                print json_encode($array);
            }
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
