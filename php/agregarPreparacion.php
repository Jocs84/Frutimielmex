<?php
    // Agrega un registro a la tabla encabpreparacion, así
    // como en la tabla preparacion
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST las siguientes variables columna
    // eN el formato
    //   VAR: FUNCION VARIABLE - CLAVE EN POST
    //     • idAlimento: id alimento - 'IdAlimento'
    //     • idEmpleado: id empleado - 'IdEmpleado'
    //     • unidadmed: unidad de medida del alimento - 'UnidadMedicion'
    //     • fechaPrep: fecha en la que se hizo la preparación,
    //                  formato aaaa-mm-dd - 'FechaPrep'
    //     • fechaCadPrep: fecha de caducidad en la que
    //                     se hizo la preparación.
    //     • idIngrediente: Arreglo de idIngrediente - 'IdIngrediente'
    //     • cantIngrediente: Arreglo de la cant de ingredientes - 'CantIngrediente'

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $idAlimento = $_POST['IdAlimento'];
        $idEmpleado = $_POST['IdEmpleado'];
        $fechaPrep = $_POST['FechaPrep'];
        $fechaCadPrep = $_POST['FechaCadPrep'];

        // Para manejar la fecha, dado que la base de datos tiene
        // dia, mes y año separados, se  la variable $fechaPrep
        // a través de los guiones (-) y almacena los valores
        // en el arreglo $token
        $token = strtok($fechaPrep,"-");
        // Se crea un arreglo para almacenar los valores de
        // $diaPrep, $mesPrep y $anioPrep, para su siguiente asignación a
        // dichas variables
        $data = array();
        // Variable para controlar el ciclo para obtener
        // $dia, $mes y $anio
        $i = 0;

        // Si $fechaPrepa se encuentra vacían a $diaPrep, $mesPrep y $anioPrep
        // se les asignará un valor 0
        if ($fecha === "") {
            $diaPrep = 0;
            $mesPrep = 0;
            $anioPrep = 0;
        }else{
            // Si $fechaPrepa tiene un valor, entonces se procede
            // a obtener los valores para $diaPrep, $mesPrep y $anioPrep
            while ($token !== false){
                $data[$i] =  $token;
                $token = strtok("-");
                $i++;
            }
            $diaPrep = $data[2];
            $mesPrep = $data[1];
            $anioPrep = $data[0];
        }

        $token = strtok($fechaCadPrep,"-");
        // Se crea un arreglo para almacenar los valores de
        // $diaCadPrep, $mesCadPrep y $anioCadPrep, para su
        // siguiente asignación a dichas variables
        $data1 = array();
        $i = 0;

        // Si $fechaPrepa se encuentra vacían a $diaCadPrep, $mesCadPrep
        // y $anioCadPrep se les asignará un valor 0
        if ($fecha === "") {
            $diaCadPrep = 0;
            $mesCadPrep = 0;
            $anioCadPrep = 0;
        }else{
            // Si $fechaPrepa tiene un valor, entonces se procede
            // a obtener los valores para $diaCadPrep, $mesCadPrep y $anioCadPrep
            while ($token !== false){
                $data1[$i] =  $token;
                $token = strtok("-");
                $i++;
            }
            $diaCadPrep = $data1[2];
            $mesCadPrep = $data1[1];
            $anioCadPrep = $data1[0];
        }

        $idIngrediente = $_POST['IdIngrediente'];
        $cantIngrediente = $_POST['CantIngrediente'];


        // Se llama a la función insertarEncabPreparacion() con
            // $idAlimento,
            // $idEmpleado,
            // $diaPrep,
            // $mesPrep,
            // $anioPrep,
            // $diaCadPrep,
            // $mesCadPrep,
            // $anioCadPrep
        // Para agregar una nueva Preparación a la tabla encaPreparacion,
        // la cual tendrá un retorno si es se agregó el nuevo registro,
        // de lo contrario, no retornará.
        $retorno = generar::insertarEncabPreparacion(
            $idAlimento,$idEmpleado,$diaPrep,$mesPrep,$anioPrep,
            $diaCadPrep,$mesCadPrep,$anioCadPrep
        );


        // Si retorna, entonces se procede a agregar en la tabla
        // Preparacion, llamando a la función insertarPreparacion() con
            // $idIngrediente,
            // $cantIngrediente
        // Si es correcto retorna un JSON con un estado 1 y el mensaje
        // "elemento agragado"
        // Si no es correcto, retorna un JSON con un estado 2 y un
        // mensaje "No se regristró"
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
            $array = array(
                'estado' => '2',
                'mensaje' => 'No se registro'
            );
            print json_encode($array);

        }

    }

 ?>
