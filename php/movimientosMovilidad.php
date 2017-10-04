<?php
    /**
    * Estructuras de MOVILIDAD:
    *   Busqueda
    *   Eliminar
    *   Agregar
    *   Modificar
    */
    require 'database.php';

    class generar{
        function __construct(){
        }

        // BYHRSG
        public static function buscarCP($tabla)
        {

         $consulta = "SELECT DISTINCT Municipio FROM `" . $tabla . "` ORDER BY `Municipio`";
        // $consulta = "SELECT DISTINCT `Municipio` FROM `codigopostal` WHERE `Estado` = `" . $tabla . "` ORDER BY `Municipio`";

          try {
              $comando = Database::getInstance()->getDb()->prepare($consulta);
              // Ejecutar sentencia preparada
              $comando->execute();
              return $comando->fetchAll(PDO::FETCH_ASSOC);

          } catch (PDOException $e) {
              return false;
          }
        }


        public static function buscarPredio($tabla)
        {
          $consulta = "SELECT DISTINCT NomPredio FROM `" . $tabla . "` ORDER BY `NomPredio`";

          try {
              $comando = Database::getInstance()->getDb()->prepare($consulta);
              // Ejecutar sentencia preparada
              $comando->execute();
              return $comando->fetchAll(PDO::FETCH_ASSOC);

          } catch (PDOException $e) {
              return false;
          }
        }


        public static function buscarZona($tabla)
        {
          $consulta = "SELECT DISTINCT NombreZona FROM `" . $tabla . "` ORDER BY `NombreZona`";

          try {
              $comando = Database::getInstance()->getDb()->prepare($consulta);
              // Ejecutar sentencia preparada
              $comando->execute();
              return $comando->fetchAll(PDO::FETCH_ASSOC);

          } catch (PDOException $e) {
              return false;
          }
        }



    }
 ?>
