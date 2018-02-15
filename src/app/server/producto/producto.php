<?php

class Producto extends Main{
    public function __construct($fnc, $prm, $req){
        parent::__construct(get_class($this), $prm, $fnc);
        $this->$fnc($prm);
    }

    /* @name: get
     * @description:
     */
    function get(){
        try {
            $results = $this->db->get('productos');

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
                'descripcion' => $decoded->descripcion,
                'pto_repo' => $decoded->pto_repo,
                'sku' => $decoded->sku,
                'status' => $decoded->status,
                'vendidos' => $decoded->vendidos,
                'destacado' => $decoded->destacado,
                'en_slider' => $decoded->en_slider,
                'en_oferta' => $decoded->en_oferta,
                'producto_tipo_id' => $decoded->producto_tipo_id,
                'iva' => $decoded->iva,
                'tiempo_espera' => $decoded->tiempo_espera,
                'empresa_id' => $decoded->empresa_id
            );
            $result = $this->db->insert('productos', $data);

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
                'descripcion' => $decoded->descripcion,
                'pto_repo' => $decoded->pto_repo,
                'sku' => $decoded->sku,
                'status' => $decoded->status,
                'vendidos' => $decoded->vendidos,
                'destacado' => $decoded->destacado,
                'en_slider' => $decoded->en_slider,
                'en_oferta' => $decoded->en_oferta,
                'producto_tipo_id' => $decoded->producto_tipo_id,
                'iva' => $decoded->iva,
                'tiempo_espera' => $decoded->tiempo_espera,
                'empresa_id' => $decoded->empresa_id
            );
            $this->db->where('id', $params->id);
            $result = $this->db->update('productos', $data);

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
                'status' => $params->status
            );
            $this->db->where('id', $params->id);
            $result = $this->db->update('productos', $data);

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
        $params->descripcion = (!array_key_exists("descripcion", $params)) ? '' : $params->descripcion;
        $params->pto_repo = (!array_key_exists("pto_repo", $params)) ? 0 : $params->pto_repo;
        $params->sku = (!array_key_exists("sku", $params)) ? '' : $params->sku;
        $params->status = (!array_key_exists("status", $params)) ? 0 : $params->status;
        $params->vendidos = (!array_key_exists("vendidos", $params)) ? 0 : $params->vendidos;
        $params->destacado = (!array_key_exists("destacado", $params)) ? 0 : $params->destacado;
        $params->en_slider = (!array_key_exists("en_slider", $params)) ? 1 : $params->en_slider;
        $params->en_oferta = (!array_key_exists("en_oferta", $params)) ? 0 : $params->en_oferta;
        $params->producto_tipo_id = (!array_key_exists("producto_tipo_id", $params)) ? 0 : $params->producto_tipo_id;
        $params->iva = (!array_key_exists("iva", $params)) ? 0.00 : $params->iva;
        $params->tiempo_espera = (!array_key_exists("tiempo_espera", $params)) ? 0 : $params->tiempo_espera;
        $params->empresa_id = (!array_key_exists("empresa_id", $params)) ? 0 : $params->empresa_id;

        return $params;
    }

}