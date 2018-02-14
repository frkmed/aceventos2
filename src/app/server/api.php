<?php

session_start();

// Token
$decoded_token = null;

require_once './includes/utils/utils.php';
require_once './includes/mail/PHPMailerAutoload.php';

// API LIST
require_once './usuario/usuario.php';
require_once './cliente/cliente.php';
require_once './empresa/empresa.php';
require_once './evento/evento.php';
require_once './invitado/invitado.php';
require_once './pais/pais.php';
require_once './salon/salon.php';
require_once './plato/plato.php';
require_once './proveedor/proveedor.php';
require_once './mail/mail.php';

try {

    // Obtengo todos los datos del request
    $_obj = ($_GET['obj']) ? $_GET['obj'] : (json_decode($file_get_contents("php://input")))->obj;
    $_fnc = ($_GET['fnc']) ? $_GET['fnc'] : (json_decode($file_get_contents("php://input")))->fnc;
    $_prm = ($_GET['prm']) ? $_GET['prm'] : (json_decode($file_get_contents("php://input")))->prm;
    $_req = $_SERVER['REQUEST_METHOD'];

    // Instancio la API
    $_Obj = ucwords($_obj);
    if(class_exists($_Obj)){
        $_API = new $_Obj($_fnc,json_decode($_prm),$_req);
    }else{
        throw new Exception('Class dont exist: ' .  $_Obj . ' ' . $_fnc . ' ' . $_prm . ' ' . $_req);
    }

} catch (Exception $e) {
    sendError($e->getMessage());
}




