<?php

class Pais extends Main{

    public function __construct($fnc, $prm, $req){
        parent::__construct(get_class($this), $prm, $fnc);
        $this->$fnc($prm);
    }

    /**
     * Retorna listado de paises
     */
    function getPaises(){
        try {
            $this->db->orderBy("nombre","asc");
            $results = $this->db->get('paises');

            $this->sendResponse($results);
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    /**
     * @param $params Pais_Id
     * Retorna listado de Provincias filtrando por pais_id
     */
    function getProvincias(){
        try {
            $this->db->orderBy("nombre","asc");
            $results = $this->db->get('provincias');

            $this->sendResponse($results);
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    function getProvinciasByPais($params){
        try {
            $this->db->orderBy("nombre","asc");
            $this->db->where('pais_id', $params->pais_id);
            $results = $this->db->get('provincias');

            $this->sendResponse($results);
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    /**
     * @param $params provincia_id
     * Retorna listado de Localidades filtrando por provincia_id
     */
    function getLocalidades(){
        try {
            $this->db->orderBy("nombre","asc");
            $results = $this->db->get('localidades');

            $this->sendResponse($results);
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    function getLocalidadesByProvincia($params){
        try {
            $this->db->orderBy("nombre","asc");
            $this->db->where('provincia_id', $params->provincia_id);
            $results = $this->db->get('localidades');

            $this->sendResponse($results);
        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

}