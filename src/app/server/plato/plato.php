<?php

class Plato extends Main{
    public function __construct($fnc, $prm, $req){
        parent::__construct(get_class($this), $prm, $fnc);
        $this->$fnc($prm);
    }

    /* @name: get
     * @description:
     */
    function get(){
        try {
            $results = $this->db->get('platos');

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
                'guarnicion' => $decoded->guarnicion,
                'cantidad_personas' => $decoded->cantidad_personas,
                'detalle' => $decoded->detalle,
                'empresa_id' => $decoded->empresa_id,
                'costo_plato' => $decoded->costo_plato,
                'margen_ganancia' => $decoded->margen_ganancia,
                'estado' => $decoded->estado
            );
            $result = $this->db->insert('platos', $data);

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
                'guarnicion' => $decoded->guarnicion,
                'cantidad_personas' => $decoded->cantidad_personas,
                'detalle' => $decoded->detalle,
                'empresa_id' => $decoded->empresa_id,
                'costo_plato' => $decoded->costo_plato,
                'margen_ganancia' => $decoded->margen_ganancia,
                'estado' => $decoded->estado
            );
            $this->db->where('id', $params->id);
            $result = $this->db->update('platos', $data);

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
            $result = $this->db->update('platos', $data);

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
        $params->guarnicion = (!array_key_exists("guarnicion", $params)) ? '' : $params->guarnicion;
        $params->cantidad_personas = (!array_key_exists("cantidad_personas", $params)) ? 0 : $params->cantidad_personas;
        $params->detalle = (!array_key_exists("detalle", $params)) ? '' : $params->detalle;
        $params->empresa_id = (!array_key_exists("empresa_id", $params)) ? 0 : $params->empresa_id;
        $params->costo_plato = (!array_key_exists("costo_plato", $params)) ? 0.00 : $params->costo_plato;
        $params->margen_ganancia = (!array_key_exists("margen_ganancia", $params)) ? 0 : $params->margen_ganancia;
        $params->estado = (!array_key_exists("estado", $params)) ? 1 : $params->estado;

        return $params;
    }

}