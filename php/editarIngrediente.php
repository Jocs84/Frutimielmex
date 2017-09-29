<?php

    // Editar un registro a la tabla ingredientes.
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST las siguientes variables columna
    // en el formato
    //   VAR: FUNCION VARIABLE - CLAVE EN POST
    //     • nombre: nombre del ingrediente - 'NombreIngrediente'
    //     • unidadmed: consistencia del alimento - 'UnidadMedida'
    //     • precio: unidad de medida del alimento - 'PrecioIngredienten'
    //     • fecha: fecha de caducidad del ingrediente,
    //              formato aaaa-mm-dd - 'CadIngrediente'

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $id = $_POST['id'];
        $nombre = $_POST['NombreIngrediente'];
        $unidadmed = $_POST['UnidadMedida'];
        $precio = $_POST['PrecioIngrediente'];
        $fecha = $_POST['CadIngrediente'];

        // Para manejar la fecha, dado que la base de datos tiene
        // dia, mes y año separados, se  la variable $fechaa
        // a través de los guiones (-) y almacena los valores
        // en el arreglo $token
        $token = strtok($fecha,"-");
        // Se crea un arreglo para almacenar los valores de
        // $dia, $mes y $anio, para su siguiente asignación a
        // dichas variables
        $data = array();
        // Variable para controlar el ciclo para obtener
        // $dia, $mes y $anio
        $i = 0;

        // Si $fecha se encuentra vacían a $dia, $mes y $anio
        // se les asignará un valor 0
        if ($fecha === "") {
            $dia = 0;
            $mes = 0;
            $anio = 0;
        }else{
            // Si $fecha tiene un valor, entonces se procede
            // a obtener los valores para $dia, $mes y $anio
            while ($token !== false){
                $data[$i] =  $token;
                $token = strtok("-");
                $i++;
            }
            $dia = $data[2];
            $mes = $data[1];
            $anio = $data[0];
        }

        // Se llama a la función editarIngrediente() con
            // $is
            // $nombre,
            // $unidadmed,
            // $precio,
            // $dia,
            // $mes,
            // $anio
        // Para editar un registro en la tabla Ingredientes,
        // la cual tendrá un retorno si es se agregó el nuevo registro,
        // de lo contrario, no retornará.
        $retorno = generar::editarIngrediente(
            $id,$nombre,$unidadmed,$precio,$dia,$mes,$anio
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
