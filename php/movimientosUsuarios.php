<?php
    /**
    * Estructuras de USUARIOS:
    *   Busqueda
    *   Eliminar
    *   Agregar
    *   Modificar
    */
    require 'database.php';

    class generar{
        function __construct(){
        }


//*************************
// función agregar usuario
// ************************

/**
 * Insertar una nueva meta
 *
 * @param $titulo
 * @return PDOStatement
 */
public static function insertarUsuario(
    $nombre,$apusuario,$amusuario,$nickusuario,$passusuario
)
{
    // Sentencia INSERT
    $comando = "INSERT INTO `usuarios`
                (`IdUsuario`,
                `NomUsuario`,
                `ApUsuario`,
                `AmUsuario`,
                `NickUsuario`,
                `PassUsuario`)
                VALUES (NULL,
                    '". $nombre . "',
                    '". $apusuario . "',
                    '". $amusuario . "',
                    '". $nickusuario  . "',
                    '". $passusuario . "')";

    try {
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        // Ejecutar sentencia preparada
        $sentencia->execute();
        $json = json_encode($sentencia);
        return $json;

    } catch (PDOException $e) {
        echo $e;
        return false;
    }
}



public static function buscarPorNick($busqueda,$tabla,$columna)
{

                $consulta = "SELECT *
                              FROM usuarios
                              WHERE NickUsuario
                              LIKE  '%" . $busqueda . "%'";


    try {
        $comando = Database::getInstance()->getDb()->prepare($consulta);
        // Ejecutar sentencia preparada
        $comando->execute();
        return $comando->fetchAll(PDO::FETCH_ASSOC);

    } catch (PDOException $e) {
        return false;
    }
}



/**
 * Actualiza un registro de la bases de datos basado
 * en los nuevos valores relacionados con un identificador update usuario
 *
 * @param $id            identificador
 * @param $username      nuevo titulo
 * @param $password      nueva descripcion
 */
public static function updateUsuario(
  $id,$nombre,$apusuario,$amusuario,$nickusuario,$passusuario
  )
{
    // Creando consulta UPDATE
    $consulta = "UPDATE `usuarios` SET
                `NomUsuario`= '". $nombre ."',
                `ApUsuario`= '". $apusuario ."',
                `AmUsuario`= '". $amusuario ."',
                `NickUsuario`= '". $nickusuario ."',
                `PassUsuario`= '". $passusuario ."'
                WHERE IdUsuario = " . $id;


          try {
        $sentencia = Database::getInstance()->getDb()->prepare($consulta);
        // Ejecutar sentencia preparada
        $sentencia->execute();
        $json = json_encode($sentencia);
        return $json;

    } catch (PDOException $e) {
        echo $e;
        return false;
    }
}


/**
 * Eliminar el usuario con el identificador especificado
 *
 * @param
 * @return
 */
public static function eliminarUsu($tabla,$elemento,$registro){
    // Sentencia DELETE
    $consulta = "DELETE FROM `" . $tabla . "` WHERE `" . $elemento . "` =" . $registro;

    try {
        $comando = Database::getInstance()->getDb()->prepare($consulta);
        // Ejecutar sentencia preparada
        $comando->execute();
        //Retorna el numero de filas afectadas con el último movimiento
        return $comando->rowCount();

    } catch (PDOException $e) {
        return false;
    }
}



    }
 ?>
