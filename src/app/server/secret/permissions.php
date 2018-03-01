<?php

require_once './includes/utils/enums.php';


class Permissions{
    public $permissions = array(
        'Usuarios' => array('get' => 1,
            'login' => PermissionTypes::Allowed,
            'loginSocial' => PermissionTypes::Allowed,
            'logout' => PermissionTypes::Allowed,
            'create' => PermissionTypes::Allowed,
            'update' => PermissionTypes::Allowed,
            'updateAddress' => PermissionTypes::Allowed,
            'generateTemporaryToken' => PermissionTypes::Allowed,
            'setPassword' => PermissionTypes::Allowed,
            'getAll' => PermissionTypes::Allowed
        ),
        'Cliente' => array(
            'get' => PermissionTypes::Allowed,
            'create' => PermissionTypes::Allowed,
            'update' => PermissionTypes::Allowed,
            'updateStatus' => PermissionTypes::Allowed
        ),
        'Empresa' => array(
            'get' => PermissionTypes::Allowed,
            'create' => PermissionTypes::Allowed,
            'update' => PermissionTypes::Allowed,
            'updateStatus' => PermissionTypes::Allowed
        ),
        'Evento' => array(
            'get' => PermissionTypes::Allowed,
            'getEstados' => PermissionTypes::Allowed,
            'getTipoEventos' => PermissionTypes::Allowed,
            'create' => PermissionTypes::Allowed,
            'update' => PermissionTypes::Allowed,
            'updateStatus' => PermissionTypes::Allowed
        ),
        'Invitado' => array(
            'get' => PermissionTypes::Allowed,
            'getEstados' => PermissionTypes::Allowed,
            'create' => PermissionTypes::Allowed,
            'update' => PermissionTypes::Allowed,
            'updateStatus' => PermissionTypes::Allowed
        ),
        'Pais' => array(
            'getPaises' => PermissionTypes::Allowed,
            'getProvincias' => PermissionTypes::Allowed,
            'getProvinciasByPais' => PermissionTypes::Allowed,
            'getLocalidades' => PermissionTypes::Allowed,
            'getLocalidadesByProvincia' => PermissionTypes::Allowed
        ),
        'Salon' => array(
            'get' => PermissionTypes::Allowed,
            'create' => PermissionTypes::Allowed,
            'update' => PermissionTypes::Allowed,
            'updateStatus' => PermissionTypes::Allowed
        ),
        'Plato' => array(
            'get' => PermissionTypes::Allowed,
            'create' => PermissionTypes::Allowed,
            'update' => PermissionTypes::Allowed,
            'updateStatus' => PermissionTypes::Allowed
        ),
        'Proveedor' => array(
            'get' => PermissionTypes::Allowed,
            'create' => PermissionTypes::Allowed,
            'update' => PermissionTypes::Allowed,
            'updateStatus' => PermissionTypes::Allowed
        ),
        'Producto' => array(
            'get' => PermissionTypes::Allowed,
            'create' => PermissionTypes::Allowed,
            'update' => PermissionTypes::Allowed,
            'updateStatus' => PermissionTypes::Allowed
        ),

    );


    public function getPermission($class, $fnc){
        if(isset($this->permissions[$class][$fnc])){
            return $this->permissions[$class][$fnc];
        }else{
            throw new Exception( 'No existe el permiso: ' . $fnc);
        }
    }
}

