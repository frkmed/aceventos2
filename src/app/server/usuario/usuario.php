<?php

class Usuarios extends Main
{
    public function __construct($fnc, $prm, $req)
    {
        parent::__construct(get_class($this), $prm, $fnc);
        $this->$fnc($prm);
    }


    /* @name: createToken
     * @param
     * @description: Envia al usuario que lo solicita, un password aleatorio.
     * @return: JWT:string de token
     * todo: Agregar tiempos de expiraci�n. Evaluar si hay que devolver alg�n dato dentro de data.
     */
    function createToken($user)
    {

        $tokenId = base64_encode(random_bytes(30));
        $issuedAt = time();
        $notBefore = $issuedAt + 10;             //Adding 10 seconds
        $expire = $notBefore + 6000000000000000000;            // Adding 60 seconds
        global $serverName; // Retrieve the server name from config file
        $aud = $serverName;
        //        $serverName = $config->get('serverName'); // Retrieve the server name from config file

        /*
        * Create the token as an array
        */
        $data = [
            'iat' => $issuedAt,         // Issued at: time when the token was generated
            'jti' => $tokenId,          // Json Token Id: an unique identifier for the token
            'iss' => $serverName,       // Issuer
            'nbf' => $notBefore,        // Not before
            'exp' => $expire,           // Expire
            'aud' => $aud,           // Expire
            'data' => [                  // Data related to the signer user
                'id' => $user["usuario_id"], // userid from the users table
                'nombre' => $user["nombre"], // User name
                'apellido' => $user["apellido"], // User name
                'mail' => $user["mail"], // User name
                'rol_id' => $user["rol_id"] // Rol
            ]
        ];

        global $secret;
        return $this->encode($data, $secret);
        /*
        * More code here...
        */
    }

    /* @name: get
     * @param
     * @description: Obtiene todos los usuario con sus direcciones.
     * todo: Sacar direcci�n y crear sus propias clases dentro de este mismo m�dulo.
     */
    function get()
    {

        //validateRol(0);

        // $$this->db = new MysqliDb();
        $results = $this->db->get('usuarios');

        foreach ($results as $key => $row) {
            $this->db->where('usuario_id', $row['usuario_id']);
            $results[$key]["password"] = '';
            $direcciones = $this->db->get('direcciones');
            $results[$key]['direcciones'] = $direcciones;
        }
        echo json_encode($results);
    }


    /* @name: get
     * @param
     * @description: Obtiene todos los usuario con sus direcciones.
     * todo: Sacar direcci�n y crear sus propias clases dentro de este mismo m�dulo.
     */
    function getAll()
    {

        //validateRol(0);

        // $$this->db = new MysqliDb();
        $results = $this->db->get('usuarios');

        foreach ($results as $key => $row) {
            // $this->db->where('usuario_id', $row['usuario_id']);
            $results[$key]["password"] = '';
            // $direcciones = $this->db->get('direcciones');
            // $results[$key]['direcciones'] = $direcciones;
        }
        echo json_encode($results);
    }


    /**
     * @description Metodo para ingresar con una red social
     * @param $token_social
     * @param $user
     * @param $provider
     */
    function loginSocial($params)
    {

        $requestHeaders = apache_request_headers();
        $authorizationHeader = null;

        if (isset($requestHeaders['authorization'])) {
            $requestHeaders['Authorization'] = $requestHeaders['authorization'];
        }
        if (isset($requestHeaders['Authorization'])) {
            $authorizationHeader = $requestHeaders['Authorization'];
        }


        if ($authorizationHeader == null) {
            $this->sendError("No authorization header sent");
            exit();
        }

        $pre_token = str_replace('Bearer ', '', $authorizationHeader);
        $token = str_replace('"', '', $pre_token);
        $social = '';
        $alg = null;
        if ($params->provider == 'google') {
            $url = file_get_contents("https://www.googleapis.com/oauth2/v1/certs");

            $social = json_decode($url, true);
            $alg = array('RS256');
            $decoded_token = $this->decode($token, $social, $alg);
        } else {
            $url = file_get_contents("https://graph.facebook.com/app?access_token=" . $token);
            global $secret_face;
            $alg = array('HS256');
            $social = $secret_face;
        }

        try {

            $this->db->where('mail', $params->user);
            $results = $this->db->get('usuarios');

            if ($this->db->count > 0) {
                $results[0]["password"] = '';
                $resp = array('token' => $this->createToken($results[0]), 'user' => $results[0]);
            } else {
                $results = [["password" => '']];
                $resp = array('token' => $params->token_social, 'user' => $results[0]);
            }

            $this->sendResponse($resp);

        } catch (UnexpectedValueException $ex) {
            $this->sendError($ex->getMessage());
        }


    }

    /* @name: login
     * @param $mail
     * @param $password
     * @param $sucursal_id
     * @description: Valida el ingreso de un usuario.
     * todo: Sacar direcci�n y crear sus propias clases dentro de este mismo m�dulo.
     */
    function login($params)
    {
        try {


            // $results = $this->db->rawQuery("select u.usuario_id, rol_id, social_login, nombre, apellido, mail, calle, nro, password, fecha_nacimiento, news_letter, provincia_id, telefono from usuarios u left join direcciones d on u.usuario_id = d.usuario_id where mail ='" . $params->mail . "';");
            $results = $this->db->rawQuery("select u.usuario_id, rol_id, social_login, nombre, apellido, mail, password, fecha_nacimiento, news_letter, telefono from usuarios u where mail ='" . $params->mail . "';");

            global $jwt_enabled;

            if ($this->db->count > 0) {

                $hash = $results[0]['password'];
                if (password_verify($params->password, $hash) || $results[0]['social_login'] == 1) {
                    $results[0]['password'] = '';
                    // Si la seguridad se encuentra habilitada, retorna el token y el usuario sin password
                    if ($jwt_enabled) {
                        $token = $this->createToken($results[0]);
                        $this->sendResponse(array('token' => $token, 'user' => $results[0]));
                    } else {
                        $this->sendResponse(array('token' => '', 'user' => $results[0]));
                    }
                    // $this->addLogin($results[0]['usuario_id'], $params->sucursal_id, 1);
                } else {
                    // $this->addLogin($results[0]['usuario_id'], $params->sucursal_id, 0);
                    $this->sendError('Usuario o Password Incorrectos' . "\n");
                }
            } else {
                $this->sendError('Usuario o Password Incorrecto' . "\n");
            }
        } catch (Exception $e) {
            $this->sendError('Caught exception: ' . $e->getMessage() . "\n");
        }

    }

    /* @name: checkLastLogin
     * @param $userid
     * @description: --
     * todo: Este m�todo podr�a volar, se puede verificar con jwt el �ltimo login.
     */
    function checkLastLogin($userid)
    {
        $db = new MysqliDb();
        $results = $db->rawQuery('select TIME_TO_SEC(TIMEDIFF(now(), last_login)) diferencia from usuarios where usuario_id = ' . $userid);

        if ($db->count < 1) {
            $db->rawQuery('update usuarios set token ="" where usuario_id =' . $userid);
            echo(json_encode(-1));
        } else {
            $diff = $results[0]["diferencia"];

            if (intval($diff) < 12960) {
                echo(json_encode($results[0]));
            } else {
                $db->rawQuery('update usuarios set token ="" where usuario_id =' . $userid);
                echo(json_encode(-1));
            }
        }
    }

    /* @name: create
     * @param $user
     * @description: Crea un nuevo usuario y su direcci�n
     * todo: Sacar direcci�n, el usuario puede tener varias direcciones.
     */
    function create($params)
    {
        $this->db->where('mail', $params->mail);
        $this->db->get('usuarios');

        if ($this->db->count > 0) {
            $this->sendError('Existe el Usuario');
            return;
        }


        $this->db->startTransaction();
        try {
            $user_decoded = $this->checkUsuario($params);
            $options = ['cost' => 12];
            $password = password_hash($user_decoded->password, PASSWORD_BCRYPT, $options);

            $data = array(
                'nombre' => $user_decoded->nombre,
                'apellido' => $user_decoded->apellido,
                'mail' => $user_decoded->mail,
                'nacionalidad_id' => $user_decoded->nacionalidad_id,
                'tipo_doc' => 0,
                'nro_doc' => $user_decoded->nro_doc,
                'comentarios' => $user_decoded->comentarios,
                'marcado' => $user_decoded->marcado,
                'telefono' => $user_decoded->telefono,
                'fecha_nacimiento' => $user_decoded->fecha_nacimiento,
                'profesion_id' => 0,
                'saldo' => 0,
                'password' => $password,
                'rol_id' => $user_decoded->rol_id,
                'news_letter' => $user_decoded->news_letter,
                'social_login' => $user_decoded->social_login
            );

            $result = $this->db->insert('usuarios', $data);

            if (!$result) {
                $this->db->rollback();
                $this->sendResponse('Caught exception: ' . $this->db->getLastError() . "\n");
                return;
            }

            // $data = array(
            //     'usuario_id' => $result,
            //     'calle' => '',
            //     'nro' => 0,
            //     'piso' => $user_decoded->piso,
            //     'puerta' => $user_decoded->puerta,
            //     'ciudad_id' => $user_decoded->ciudad_id
            // );

            // $dir = $this->db->insert('direcciones', $data);


            // if (!$dir) {
            //     $this->db->rollback();
            //     $this->sendResponse('Caught exception: ' . $this->db->getLastError() . "\n");
            //     return;
            // }


            $ret = array(
                'usuario_id' => $result,
                'rol_id' => 3,
                'nombre' => $user_decoded->nombre,
                'apellido' => $user_decoded->apellido,
                'mail' => $user_decoded->mail,
                'calle' => $user_decoded->calle,
                'nro' => $user_decoded->nro,
                'password' => '',
                'fecha_nacimiento' => '',
                'news_letter' => 0,
                'provincia_id' => 0,
                'telefono' => '',
                'social_login' => $user_decoded->social_login);

            $token = json_encode(
                array(
                    'token' => $this->createToken($ret),
                    'user' => $ret)
            );

            $this->db->commit();
            $this->sendResponse($token);


        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }


    /* @name: clientExist
     * @param $mail
     * @description: Verifica si un usuario existe
     * todo:
     */
    function userExist($mail)
    {
        //Armo el filtro por email
        $this->db->where("mail", $mail);

        //Que me retorne el usuario filtrando por email
        $this->db->get("usuarios");

        //retorno el resultado serializado
        if ($this->db->count > 0) {
            $this->sendError('Existe el Usuario');
        } else {
            $this->sendResponse($this->db->count);

        }
    }


    /* @name: changePassword
     * @param $usuario_id
     * @param $pass_old
     * @param $pass_new
     * @description: Cambia el password, puede verificar que el anterior sea correcto o simplemente hacer un update
     * (pass_old == ''), depende de la seguridad que se requiera.
     * todo:
     */
    function changePassword($usuario_id, $pass_old, $pass_new)
    {

        $this->db->where('usuario_id', $usuario_id);
        $results = $this->db->get("usuarios");

        if ($this->db->count > 0) {
            $result = $results[0];

            if ($pass_old == '' || password_verify($pass_old, $result['password'])) {

                $options = ['cost' => 12];
                $password = password_hash($pass_new, PASSWORD_BCRYPT, $options);

                $this->db->where('usuario_id', $usuario_id);
                $data = array('password' => $password);
                if ($this->db->update('usuarios', $data)) {
                    echo json_encode(1);
                } else {
                    echo json_encode(-1);
                }
            } else {
                echo json_encode(-2);
            }
        } else {
            echo json_encode(-1);
        }
    }


    /* @name: create
     * @param $user
     * @description: Update de usuario y direcci�n
     * todo: Sacar direcci�n, el usuario puede tener varias direcciones.
     */
    function update($params)
    {
        $this->db->startTransaction();
        try {

            $user_decoded = $this->checkUsuario($params);

            $this->db->where('usuario_id', $user_decoded->usuario_id);

            $data = array(
                'nombre' => $user_decoded->nombre,
                'apellido' => $user_decoded->apellido,
                'mail' => $user_decoded->mail,
                'nacionalidad_id' => $user_decoded->nacionalidad_id,
                'tipo_doc' => 0,
                'nro_doc' => $user_decoded->nro_doc,
                'comentarios' => $user_decoded->comentarios,
                'marcado' => $user_decoded->marcado,
                'telefono' => $user_decoded->telefono,
                'fecha_nacimiento' => $user_decoded->fecha_nacimiento,
                'profesion_id' => 0,
                'saldo' => 0,
                'password' => $user_decoded->password,
                'rol_id' => $user_decoded->rol_id,
                'news_letter' => $user_decoded->news_letter,
                'social_login' => $user_decoded->social_login
            );

            if ($user_decoded->password != '') {
                $this->changePassword($user_decoded->usuario_id, '', $user_decoded->password);
            }

            if ($this->db->update('usuarios', $data)) {


                // $this->db->where('usuario_id', $user_decoded->usuario_id);
                // $data = array(
                //     'calle' => $user_decoded->calle,
                //     'nro' => $user_decoded->nro,
                //     'provincia_id' => $user_decoded->provincia_id
                // );

                // $this->db->update('direcciones', $data);
            }
            $this->db->commit();
            $this->sendResponse('Ok');

        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendError('Caught exception: ' . $e->getMessage() . "\n");
        }

    }

    function updateAddress($params)
    {
        $this->db->startTransaction();
        try {


            $this->db->where('usuario_id', $this->user->id);
            $data = array(
                'calle' => $params->calle,
                'nro' => $params->nro,
                'provincia_id' => $params->provincia_id
            );

            $this->db->update('direcciones', $data);
            $this->db->commit();
            $this->sendResponse('Ok');

        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendError('Caught exception: ' . $e->getMessage() . "\n");
        }
    }


    /**
     * @desciption Crea un registro de login en el hist�rico
     * @param $usuario_id
     * @param $sucursal_id
     * @param $ok
     */
    function addLogin($usuario_id, $sucursal_id, $ok)
    {
        $data = array('usuario_id' => $usuario_id,
            'sucursal_id' => $sucursal_id,
            'ok' => $ok);

        $this->db->insert('logins', $data);

    }

    /**
     * @description Verifica todos los campos de usuario para que existan
     * @param $usuario
     * @return mixed
     */
    function checkUsuario($usuario)
    {


        $usuario->nombre = (!array_key_exists("nombre", $usuario)) ? '' : $usuario->nombre;
        $usuario->apellido = (!array_key_exists("apellido", $usuario)) ? '' : $usuario->apellido;
        $usuario->mail = (!array_key_exists("mail", $usuario)) ? '' : $usuario->mail;
        $usuario->nacionalidad_id = (!array_key_exists("nacionalidad_id", $usuario)) ? 0 : $usuario->nacionalidad_id;
        $usuario->tipo_doc = (!array_key_exists("tipo_doc", $usuario)) ? '' : $usuario->tipo_doc;
        $usuario->nro_doc = (!array_key_exists("nro_doc", $usuario)) ? '' : $usuario->nro_doc;
        $usuario->comentarios = (!array_key_exists("comentarios", $usuario)) ? '' : $usuario->comentarios;
        $usuario->marcado = (!array_key_exists("marcado", $usuario)) ? 0 : $usuario->marcado;
        $usuario->telefono = (!array_key_exists("telefono", $usuario)) ? '' : $usuario->telefono;
        $usuario->fecha_nacimiento = (!array_key_exists("fecha_nacimiento", $usuario)) ? '' : $usuario->fecha_nacimiento;
        $usuario->profesion_id = (!array_key_exists("profesion_id", $usuario)) ? 0 : $usuario->profesion_id;
        $usuario->saldo = (!array_key_exists("saldo", $usuario)) ? 0.0 : $usuario->saldo;
        $usuario->password = (!array_key_exists("password", $usuario)) ? '' : $usuario->password;
        $usuario->rol_id = (!array_key_exists("rol_id", $usuario)) ? 0 : $usuario->rol_id;
        $usuario->news_letter = (!array_key_exists("news_letter", $usuario)) ? 0 : $usuario->news_letter;
        $usuario->calle = (!array_key_exists("calle", $usuario)) ? '' : $usuario->calle;
        $usuario->puerta = (!array_key_exists("puerta", $usuario)) ? '' : $usuario->puerta;
        $usuario->piso = (!array_key_exists("piso", $usuario)) ? 0 : $usuario->piso;
        $usuario->nro = (!array_key_exists("nro", $usuario)) ? 0 : $usuario->nro;
        $usuario->ciudad_id = (!array_key_exists("ciudad_id", $usuario)) ? 0 : $usuario->ciudad_id;
        $usuario->social_login = (!array_key_exists("social_login", $usuario)) ? 0 : $usuario->social_login;

        return $usuario;
    }


    function generateTemporaryToken($params)
    {
        $this->db->startTransaction();

        try {

            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < 63; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }


            $this->db->where('mail', $params->mail);
            $data = array(
                'token' => $randomString
            );

            $this->db->update('usuarios', $data);

            $this->db->commit();

            $params->token = $randomString;
            $params->email = $params->mail;
            if (new Mails('forgotPassword', $params, null)) {
                $this->sendResponse('Ok');
            } else {
                $this->sendResponse('Caught exception: ' . 'El mail no ha sido enviado, por favor intente nuevamente' . "\n");
            }


        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendError('Caught exception: ' . $e->getMessage() . "\n");
        }

    }

    function setPassword($params)
    {

        $this->db->where('token', $params->token);
        $this->db->get('usuarios');

        if ($this->db->count > 0) {
            $this->db->startTransaction();

            try {
                $this->db->commit();

                $this->db->where('token', $params->token);


                $options = ['cost' => 12];
                $password = password_hash($params->password, PASSWORD_BCRYPT, $options);
                $data = array(
                    'password' => $password,
                    'token' => ''
                );

                $this->db->update('usuarios', $data);

                $this->db->commit();

                $this->sendResponse('Ok');

            } catch
            (Exception $e) {
                $this->db->rollback();
                $this->sendError('Caught exception: ' . $e->getMessage() . "\n");
            }
        } else {
            $this->sendError('Caught exception: ' . 'Su password no requiere modificaci�n' . "\n");
        }


    }


}