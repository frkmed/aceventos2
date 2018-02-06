<?php

class Salon extends Main{
    public function __construct($fnc, $prm, $req){
        parent::__construct(get_class($this), $prm, $fnc);
        $this->$fnc($prm);
    }

    /* @name: get
     * @description:
     */
    function get(){
        try {
            $results = $this->db->get('salones');

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
                'nombre' => $decoded->nombre,
                'telefono' => $decoded->telefono,
                'direccion' => $decoded->direccion,
                'cantidad_personas' => $decoded->cantidad_personas,
                'estado' => $decoded->estado,
                'ancho' => $decoded->ancho,
                'alto' => $decoded->alto,
                'detalle' => $decoded->detalle,
                'empresa_id' => $decoded->empresa_id
            );
            $result = $this->db->insert('salones', $data);

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
                'nombre' => $decoded->nombre,
                'telefono' => $decoded->telefono,
                'direccion' => $decoded->direccion,
                'cantidad_personas' => $decoded->cantidad_personas,
                'estado' => $decoded->estado,
                'ancho' => $decoded->ancho,
                'alto' => $decoded->alto,
                'detalle' => $decoded->detalle,
                'empresa_id' => $decoded->empresa_id
            );
            $this->db->where('id', $params->id);
            $result = $this->db->update('salones', $data);

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
            $result = $this->db->update('salones', $data);

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
        $params->nombre = (!array_key_exists("nombre", $params)) ? '' : $params->nombre;
        $params->telefono = (!array_key_exists("telefono", $params)) ? '' : $params->telefono;
        $params->direccion = (!array_key_exists("direccion", $params)) ? '' : $params->direccion;
        $params->cantidad_personas = (!array_key_exists("cantidad_personas", $params)) ? 0 : $params->cantidad_personas;
        $params->estado = (!array_key_exists("estado", $params)) ? 1 : $params->estado;
        $params->ancho = (!array_key_exists("ancho", $params)) ? 0 : $params->ancho;
        $params->alto = (!array_key_exists("alto", $params)) ? 0 : $params->alto;
        $params->detalle = (!array_key_exists("detalle", $params)) ? '' : $params->detalle;
        $params->empresa_id = (!array_key_exists("empresa_id", $params)) ? '' : $params->empresa_id;

        return $params;
    }

}