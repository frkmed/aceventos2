<?php

class Proveedor extends Main{
    public function __construct($fnc, $prm, $req){
        parent::__construct(get_class($this), $prm, $fnc);
        $this->$fnc($prm);
    }

    /* @name: get
     * @description:
     */
    function get(){
        try {
            $results = $this->db->get('proveedores');

            $this->sendResponse($results);
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }

    }

    /* @name: create
     * @param
     * @description:
     */
    function create($params)
    {
        $this->db->startTransaction();
        $decoded = $this->checkEntity($params);
        try {
            $data = array(
                'razon_social' => $decoded->razon_social,
                'nombre' => $decoded->nombre,
                'cuit' => $decoded->cuit,
                'telefono' => $decoded->telefono,
                'direccion' => $decoded->direccion,
                'codigo_postal' => $decoded->codigo_postal,
                'pais_id' => $decoded->pais_id,
                'provincia_id' => $decoded->provincia_id,
                'localidad_id' => $decoded->localidad_id,
                'contacto' => $decoded->contacto,
                'mail' => $decoded->mail,
                'estado' => $decoded->estado,
                'nota' => $decoded->nota,
                'empresa_id' => $decoded->empresa_id
            );
            $result = $this->db->insert('proveedores', $data);

            if (!$result) {
                $this->db->rollback();
                $this->sendResponse('Caught exception: ' . $this->db->getLastError() . "\n");
                return;
            }

            $this->db->commit();
            $this->sendResponse('Ok');
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    /* @name: update
     * @param
     * @description:
     */
    function update($params)
    {
        $this->db->startTransaction();
        $decoded = $this->checkEntity($params);
        try {
            $data = array(
                'razon_social' => $decoded->razon_social,
                'nombre' => $decoded->nombre,
                'cuit' => $decoded->cuit,
                'telefono' => $decoded->telefono,
                'direccion' => $decoded->direccion,
                'codigo_postal' => $decoded->codigo_postal,
                'pais_id' => $decoded->pais_id,
                'provincia_id' => $decoded->provincia_id,
                'localidad_id' => $decoded->localidad_id,
                'contacto' => $decoded->contacto,
                'mail' => $decoded->mail,
                'estado' => $decoded->estado,
                'nota' => $decoded->nota,
                'empresa_id' => $decoded->empresa_id
            );
            $this->db->where('id', $params->id);
            $result = $this->db->update('proveedores', $data);

            if (!$result) {
                $this->db->rollback();
                $this->sendResponse('Caught exception: ' . $this->db->getLastError() . "\n");
                return;
            }

            $this->db->commit();
            $this->sendResponse('Ok');
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    /* @name: updateStatus
     * @param
     * @description:
     */
    function updateStatus($params){
        $this->db->startTransaction();
        try {
            $data = array(
                'estado' => $params->estado
            );
            $this->db->where('id', $params->id);
            $result = $this->db->update('proveedores', $data);

            if (!$result) {
                $this->db->rollback();
                $this->sendResponse('Caught exception: ' . $this->db->getLastError() . "\n");
                return;
            }

            $this->db->commit();
            $this->sendResponse('Ok');
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    /**
     * @description Verifica todos los campos
     */
    function checkEntity($params)
    {
        $params->razon_social = (!array_key_exists("razon_social", $params)) ? '' : $params->razon_social;
        $params->nombre = (!array_key_exists("nombre", $params)) ? '' : $params->nombre;
        $params->cuit = (!array_key_exists("cuit", $params)) ? '' : $params->cuit;
        $params->telefono = (!array_key_exists("telefono", $params)) ? 0 : $params->telefono;
        $params->direccion = (!array_key_exists("direccion", $params)) ? '' : $params->direccion;
        $params->codigo_postal = (!array_key_exists("codigo_postal", $params)) ? 0 : $params->codigo_postal;
        $params->pais_id = (!array_key_exists("pais_id", $params)) ? 0 : $params->pais_id;
        $params->provincia_id = (!array_key_exists("provincia_id", $params)) ? 0 : $params->provincia_id;
        $params->localidad_id = (!array_key_exists("localidad_id", $params)) ? 1 : $params->localidad_id;
        $params->contacto = (!array_key_exists("contacto", $params)) ? '' : $params->contacto;
        $params->mail = (!array_key_exists("mail", $params)) ? '' : $params->mail;
        $params->estado = (!array_key_exists("estado", $params)) ? 1 : $params->estado;
        $params->nota = (!array_key_exists("nota", $params)) ? '' : $params->nota;
        $params->empresa_id = (!array_key_exists("empresa_id", $params)) ? '' : $params->empresa_id;

        return $params;
    }

}