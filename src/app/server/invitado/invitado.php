<?php

class Invitado extends Main{
    public function __construct($fnc, $prm, $req){
        parent::__construct(get_class($this), $prm, $fnc);
        $this->$fnc($prm);
    }

    /* @name: get
     * @description:
     */
    function get(){
        try {
            $results = $this->db->get('invitados');

            $this->sendResponse($results);
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    function getEstados(){
        try {
            $results = $this->db->get('estado_invitados');

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
                'apellido' => $decoded->apellido,
                'nombre' => $decoded->nombre,
                'telefono' => $decoded->telefono,
                'estado_invitado_id' => $decoded->estado_invitado_id,
                'evento_id' => $decoded->evento_id,
                'empresa_id' => $decoded->empresa_id
            );
            $result = $this->db->insert('invitados', $data);

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
                'apellido' => $decoded->apellido,
                'nombre' => $decoded->nombre,
                'telefono' => $decoded->telefono,
                'estado_invitado_id' => $decoded->estado_invitado_id,
                'evento_id' => $decoded->evento_id,
                'empresa_id' => $decoded->empresa_id
            );
            $this->db->where('id', $params->id);
            $result = $this->db->update('invitados', $data);

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
                'estado_invitado_id' => $params->estado_invitado_id
            );
            $this->db->where('id', $params->id);
            $result = $this->db->update('invitados', $data);

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
        $params->apellido = (!array_key_exists("apellido", $params)) ? '' : $params->apellido;
        $params->nombre = (!array_key_exists("nombre", $params)) ? '' : $params->nombre;
        $params->telefono = (!array_key_exists("telefono", $params)) ? '' : $params->telefono;
        $params->estado_invitado_id = (!array_key_exists("estado_invitado_id", $params)) ? 0 : $params->estado_invitado_id;
        $params->evento_id = (!array_key_exists("evento_id", $params)) ? '' : $params->evento_id;
        $params->empresa_id = (!array_key_exists("empresa_id", $params)) ? '' : $params->empresa_id;

        return $params;
    }

}