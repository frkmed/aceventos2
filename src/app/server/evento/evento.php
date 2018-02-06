<?php

class Evento extends Main{
    public function __construct($fnc, $prm, $req){
        parent::__construct(get_class($this), $prm, $fnc);
        $this->$fnc($prm);
    }

    /* @name: get
     * @description:
     */
    function get(){
        try {
            $results = $this->db->get('eventos');

            $this->sendResponse($results);
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    function getEstados(){
        try {
            $results = $this->db->get('estado_eventos');

            $this->sendResponse($results);
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    function getTipoEventos(){
        try {
            $results = $this->db->get('tipo_eventos');

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
                'tipo_evento_id' => $decoded->tipo_evento_id,
                'estado_evento_id' => $decoded->estado_evento_id,
                'cliente_id' => $decoded->cliente_id,
                'fecha_pedido' => $this->db->now(),
                'fecha_evento' => $decoded->fecha_evento,
                'invitados' => $decoded->invitados,
                'salon_id' => $decoded->salon_id,
                'detalle' => $decoded->detalle,
                'empresa_id' => $decoded->empresa_id
            );
            $result = $this->db->insert('eventos', $data);

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
                'tipo_evento_id' => $decoded->tipo_evento_id,
                'estado_evento_id' => $decoded->estado_evento_id,
                'cliente_id' => $decoded->cliente_id,
                'fecha_evento' => $decoded->fecha_evento,
                'invitados' => $decoded->invitados,
                'salon_id' => $decoded->salon_id,
                'detalle' => $decoded->detalle,
                'empresa_id' => $decoded->empresa_id
            );
            $this->db->where('id', $params->id);
            $result = $this->db->update('eventos', $data);

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
                'estado_evento_id' => $params->estado_evento_id
            );
            $this->db->where('id', $params->id);
            $result = $this->db->update('eventos', $data);

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
        $params->tipo_evento_id = (!array_key_exists("tipo_evento_id", $params)) ? '' : $params->tipo_evento_id;
        $params->estado_evento_id = (!array_key_exists("estado_evento_id", $params)) ? 0 : $params->estado_evento_id;
        $params->cliente_id = (!array_key_exists("cliente_id", $params)) ? '' : $params->cliente_id;
        $params->fecha_pedido = (!array_key_exists("fecha_pedido", $params)) ? $this->db->now() : $params->fecha_pedido;
        $params->fecha_evento = (!array_key_exists("fecha_evento", $params)) ? $this->db->now() : $params->fecha_evento;
        $params->invitados = (!array_key_exists("invitados", $params)) ? 0 : $params->invitados;
        $params->salon_id = (!array_key_exists("salon_id", $params)) ? 1 : $params->salon_id;
        $params->detalle = (!array_key_exists("detalle", $params)) ? '' : $params->detalle;
        $params->empresa_id = (!array_key_exists("empresa_id", $params)) ? '' : $params->empresa_id;

        return $params;
    }

}