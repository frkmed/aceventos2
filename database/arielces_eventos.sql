-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-02-2018 a las 16:17:08
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `arielces_eventos`
--
CREATE DATABASE IF NOT EXISTS `arielces_eventos` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `arielces_eventos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `apellido` varchar(250) DEFAULT '',
  `nombre` varchar(250) DEFAULT '',
  `telefono` int(11) DEFAULT NULL,
  `direccion` varchar(250) DEFAULT '',
  `codigo_postal` varchar(10) DEFAULT '',
  `pais_id` int(11) NOT NULL DEFAULT '-1',
  `provincia_id` int(11) NOT NULL DEFAULT '-1',
  `localidad_id` int(11) NOT NULL DEFAULT '-1',
  `contacto` varchar(250) DEFAULT '',
  `mail` varchar(250) DEFAULT '',
  `estado_cliente_id` int(1) NOT NULL DEFAULT '1',
  `empresa_id` int(11) NOT NULL DEFAULT '-1',
  `cuil` varchar(20) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `apellido`, `nombre`, `telefono`, `direccion`, `codigo_postal`, `pais_id`, `provincia_id`, `localidad_id`, `contacto`, `mail`, `estado_cliente_id`, `empresa_id`, `cuil`) VALUES
(1, 'Maneff', 'Mateo', 4326698, 'Don Bosco 1500', '4000', 1, 1, 1, 'Mateo Maneff', 'mmaneff@gmail.com', 1, 1, '20282234786');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
CREATE TABLE `direcciones` (
  `direccion_id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `calle` varchar(150) NOT NULL,
  `nro` int(11) NOT NULL,
  `piso` int(3) DEFAULT NULL,
  `puerta` varchar(3) DEFAULT NULL,
  `ciudad_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

DROP TABLE IF EXISTS `empresas`;
CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT '',
  `direccion` varchar(250) DEFAULT '',
  `codigo_postal` varchar(10) DEFAULT '',
  `pais_id` int(11) NOT NULL DEFAULT '-1',
  `provincia_id` int(11) NOT NULL DEFAULT '-1',
  `localidad_id` int(11) NOT NULL DEFAULT '-1',
  `cuit` varchar(20) DEFAULT '',
  `contacto` varchar(250) DEFAULT '',
  `telefono` int(11) DEFAULT NULL,
  `mail` varchar(250) DEFAULT '',
  `web` varchar(100) DEFAULT '',
  `detalle` varchar(1000) DEFAULT '',
  `estado_empresa_id` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`id`, `nombre`, `direccion`, `codigo_postal`, `pais_id`, `provincia_id`, `localidad_id`, `cuit`, `contacto`, `telefono`, `mail`, `web`, `detalle`, `estado_empresa_id`) VALUES
(1, 'Sheraton Tucuman', 'Lavalle 1200', '4000', 1, 1, 1, '11225556663', 'Mario Toledo', 4236985, 'sheraton@gmail.com', 'www.sheraton.com.ar', '', 1),
(2, 'Isabella', 'Don Bosco 2000', '4000', 1, 1, 1, '20213336664', 'Isabel Macedo', 4321598, 'isabella@gmail.com', 'www.isabella.com.ar', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_eventos`
--

DROP TABLE IF EXISTS `estado_eventos`;
CREATE TABLE `estado_eventos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estado_eventos`
--

INSERT INTO `estado_eventos` (`id`, `nombre`) VALUES
(1, 'Inicial'),
(2, 'Finalizado'),
(3, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_invitados`
--

DROP TABLE IF EXISTS `estado_invitados`;
CREATE TABLE `estado_invitados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estado_invitados`
--

INSERT INTO `estado_invitados` (`id`, `nombre`) VALUES
(1, 'Invitado'),
(2, 'Cancelado'),
(3, 'En Duda');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

DROP TABLE IF EXISTS `eventos`;
CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT '',
  `tipo_evento_id` int(11) NOT NULL DEFAULT '-1',
  `estado_evento_id` int(1) NOT NULL DEFAULT '1',
  `cliente_id` int(11) NOT NULL DEFAULT '-1',
  `fecha_pedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de la reserva',
  `fecha_evento` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora del Evento',
  `invitados` int(11) NOT NULL DEFAULT '0',
  `salon_id` int(11) NOT NULL DEFAULT '-1',
  `detalle` varchar(1000) DEFAULT '',
  `empresa_id` int(1) NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `nombre`, `tipo_evento_id`, `estado_evento_id`, `cliente_id`, `fecha_pedido`, `fecha_evento`, `invitados`, `salon_id`, `detalle`, `empresa_id`) VALUES
(1, 'Boda Mateo y Maria', 1, 1, 1, '2018-01-17 18:33:00', '2018-03-31 01:00:00', 250, 1, '', 1),
(2, 'Cumple 15 Camila', 2, 1, 1, '2018-01-23 12:16:08', '2018-02-15 03:00:00', 200, 1, 'Quiere todo lo que viene en el salon', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invitados`
--

DROP TABLE IF EXISTS `invitados`;
CREATE TABLE `invitados` (
  `id` int(11) NOT NULL,
  `apellido` varchar(250) DEFAULT '',
  `nombre` varchar(250) DEFAULT '',
  `telefono` int(11) DEFAULT NULL,
  `estado_invitado_id` int(1) NOT NULL DEFAULT '1',
  `evento_id` int(1) NOT NULL DEFAULT '-1',
  `empresa_id` int(11) NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `invitados`
--

INSERT INTO `invitados` (`id`, `apellido`, `nombre`, `telefono`, `estado_invitado_id`, `evento_id`, `empresa_id`) VALUES
(1, 'LUNA', 'RICARDO ALBERTO', 326179, 1, 1, 1),
(2, 'CUEVAS', 'RICARDO PASTOR', 537137, 1, 1, 1),
(3, 'CARDENAS', 'ROBERTO LUIS', 537141, 1, 1, 1),
(4, 'VILLARREAL', 'MARIA DEL VALLE', 537144, 1, 1, 1),
(5, 'CARRIZO', 'ALFREDO ENRIQUE', 537145, 1, 1, 1),
(6, 'LAZARTE', 'JOSE DIONISIO', 537151, 1, 1, 1),
(7, 'ZELARAYAN', 'MARIO ESTEBAN', 537157, 1, 1, 1),
(8, 'UNGHERINI', 'KARINA ANDREA', 537158, 1, 1, 1),
(9, 'BEMSCH', 'JUAN MIGUEL', 537159, 1, 1, 1),
(10, 'TOSCANO', 'PABLO ESTEBAN', 537170, 1, 1, 1),
(11, 'VALENZUELA', 'RAMON DIEGO', 537176, 1, 1, 1),
(12, 'ATAR', 'PATRICIA ELENA', 537178, 1, 1, 1),
(13, 'MONROY', 'OSVALDO RUBEN', 537184, 1, 1, 1),
(14, 'SORIA', 'ROBERTO ALFREDO', 537187, 1, 1, 1),
(15, 'SIERRA', 'SILVIA PATRICIA', 537188, 1, 1, 1),
(16, 'FACIANO', 'MYRIAN ELIZABETH', 537189, 1, 1, 1),
(17, 'PEREIRA', 'PABLO BENJAMIN', 537192, 1, 1, 1),
(18, 'MIRANDA', 'DANIELA ALEJANDRA', 537193, 1, 1, 1),
(19, 'RUIZ', 'HECTOR ARIEL', 537194, 1, 1, 1),
(20, 'POSSI', 'ELMA DEL VALLE', 537195, 1, 1, 1),
(21, 'COLQUE', 'WALTER SERGIO', 537198, 1, 1, 1),
(22, 'CASTILLO', 'AUGUSTO ARGENTINO', 537207, 1, 1, 1),
(23, 'JUAREZ', 'ALBERTO JOSE', 537211, 1, 1, 1),
(24, 'VACA', 'CARLOS ENRIQUE', 537214, 1, 1, 1),
(25, 'BARRIENTOS', 'MARTIN HECTOR', 537215, 1, 1, 1),
(26, 'BROVIA', 'CARLOS ALFREDO', 537254, 1, 1, 1),
(27, 'SORROZA', 'JOSE MARIA', 537256, 1, 1, 1),
(28, 'DORADO', 'RENE ALFREDO DE JESUS', 537257, 1, 1, 1),
(29, 'NUÑEZ', 'CLEMENTE AURELIO', 537258, 1, 1, 1),
(30, 'CHAVARRIA', 'DANIEL ALEJANDRO', 537259, 1, 1, 1),
(31, 'VERDIA', 'JULIO ANTONIO', 537261, 1, 1, 1),
(32, 'MARTINEZ', 'MARIO ALBERTO', 537262, 1, 1, 1),
(33, 'PRADO', 'CLAUDIA MABEL', 537263, 1, 1, 1),
(34, 'CONTRERAS', 'GUSTAVO ENRIQUE', 537264, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidades`
--

DROP TABLE IF EXISTS `localidades`;
CREATE TABLE `localidades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT '',
  `provincia_id` int(11) NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `localidades`
--

INSERT INTO `localidades` (`id`, `nombre`, `provincia_id`) VALUES
(1, 'San Miguel de Tucumán', 1),
(2, 'La Cocha', 1),
(3, 'Concepción', 1),
(4, 'Las Talitas', 1),
(5, 'Palermo', 2),
(6, 'Quilmes', 2),
(7, 'Nuñez', 2),
(8, 'Avellaneda', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logins`
--

DROP TABLE IF EXISTS `logins`;
CREATE TABLE `logins` (
  `login_id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `sucursal_id` varchar(45) NOT NULL,
  `caja_id` varchar(45) NOT NULL,
  `ok` int(1) NOT NULL DEFAULT '0',
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

DROP TABLE IF EXISTS `paises`;
CREATE TABLE `paises` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id`, `nombre`) VALUES
(1, 'Argentina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos`
--

DROP TABLE IF EXISTS `platos`;
CREATE TABLE `platos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL DEFAULT '',
  `guarnicion` varchar(250) NOT NULL DEFAULT '',
  `cantidad_personas` int(11) NOT NULL DEFAULT '0',
  `detalle` varchar(1000) NOT NULL DEFAULT '',
  `empresa_id` int(11) NOT NULL DEFAULT '0',
  `costo_plato` decimal(8,2) NOT NULL DEFAULT '0.00',
  `margen_ganancia` int(11) NOT NULL DEFAULT '0',
  `estado` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `platos`
--

INSERT INTO `platos` (`id`, `nombre`, `guarnicion`, `cantidad_personas`, `detalle`, `empresa_id`, `costo_plato`, `margen_ganancia`, `estado`) VALUES
(1, 'test', 'wwwwwww', 150, 'dsddddd', 0, '22.00', 15, 1),
(2, 'wwwwwwww', 'wwwwwwwwww', 122, 'dssssssssss', 0, '12.00', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT '',
  `razon_social` varchar(250) DEFAULT '',
  `direccion` varchar(250) DEFAULT '',
  `codigo_postal` varchar(10) DEFAULT '',
  `pais_id` int(11) NOT NULL DEFAULT '-1',
  `provincia_id` int(11) NOT NULL DEFAULT '-1',
  `localidad_id` int(11) NOT NULL DEFAULT '-1',
  `cuil` varchar(20) DEFAULT '',
  `contacto` varchar(250) DEFAULT '',
  `telefono` int(11) DEFAULT NULL,
  `mail` varchar(250) DEFAULT '',
  `detalle` varchar(1000) DEFAULT '',
  `estado_proveedor_id` int(1) NOT NULL DEFAULT '1',
  `empresa_id` int(11) NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre`, `razon_social`, `direccion`, `codigo_postal`, `pais_id`, `provincia_id`, `localidad_id`, `cuil`, `contacto`, `telefono`, `mail`, `detalle`, `estado_proveedor_id`, `empresa_id`) VALUES
(1, 'Don Jamon', 'Don Jamon', 'Av Perón 1000', '4000', 1, 1, 1, '11223334445', 'Doctor Blanco', 4332569, 'donjamon@gmail.com', 'Cel 381-56932145', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincias`
--

DROP TABLE IF EXISTS `provincias`;
CREATE TABLE `provincias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT '',
  `pais_id` int(11) NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `provincias`
--

INSERT INTO `provincias` (`id`, `nombre`, `pais_id`) VALUES
(1, 'Tucumán', 1),
(2, 'Buenos Aires', 1),
(3, 'Salta', 1),
(4, 'Jujuy', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salones`
--

DROP TABLE IF EXISTS `salones`;
CREATE TABLE `salones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT '',
  `telefono` int(11) DEFAULT NULL,
  `direccion` varchar(500) DEFAULT '',
  `cantidad_personas` int(11) NOT NULL DEFAULT '0',
  `estado` char(1) NOT NULL DEFAULT 'S',
  `empresa_id` int(11) NOT NULL DEFAULT '-1',
  `ancho` int(11) NOT NULL DEFAULT '0',
  `alto` int(11) NOT NULL DEFAULT '0',
  `detalle` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `salones`
--

INSERT INTO `salones` (`id`, `nombre`, `telefono`, `direccion`, `cantidad_personas`, `estado`, `empresa_id`, `ancho`, `alto`, `detalle`) VALUES
(1, 'Salon 1', 12345678, 'direccion 1', 100, 'S', 1, 30, 15, 'Mesas redondas\r\nsillas\r\nDecoración'),
(2, 'Salon 2', 4226699, 'Dirección 2', 150, 'S', 1, 25, 12, 'Mesas cuadradas\r\nSillas sin apoya brasos\r\nDecoración en mesa y sillas.\r\n'),
(3, 'Salon 3', 4315577, 'Dirección 3', 200, 'S', 1, 22, 15, 'Mesas cuadradas\r\nSillas sin apoya brasos\r\nDecoración en mesa y sillas.\r\nBarra caribeña\r\nEquipo de sonido'),
(4, 'Salon 4', 4321598, 'Dirección 4', 120, 'N', 1, 20, 10, 'Mesas cuadradas\r\nSillas sin apoya brasos\r\nDecoración en mesa y sillas.\r\nBarra caribeña\r\nEquipo de sonido'),
(5, 'Salon 5', 4292944, 'Dirección 5', 300, 'S', 2, 35, 20, 'Mesas cuadradas\r\nSillas sin apoya brasos\r\nDecoración en mesa y sillas.\r\nBarra caribeña\r\nEquipo de sonido'),
(12, '', NULL, '', 0, 'S', -1, 0, 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_eventos`
--

DROP TABLE IF EXISTS `tipo_eventos`;
CREATE TABLE `tipo_eventos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_eventos`
--

INSERT INTO `tipo_eventos` (`id`, `nombre`) VALUES
(1, 'Bodas'),
(2, 'Bautizos'),
(3, 'Comuniones'),
(4, 'Reuniones'),
(5, 'Celebraciones'),
(6, 'Cumpleaños'),
(7, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `nacionalidad_id` int(11) DEFAULT NULL,
  `tipo_doc` int(11) NOT NULL,
  `nro_doc` varchar(20) NOT NULL,
  `comentarios` varchar(450) DEFAULT NULL,
  `marcado` varchar(8) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` varchar(45) DEFAULT NULL,
  `profesion_id` int(11) DEFAULT NULL,
  `saldo` varchar(8) NOT NULL DEFAULT '0.0',
  `password` varchar(100) DEFAULT NULL,
  `rol_id` int(11) NOT NULL DEFAULT '0',
  `news_letter` int(1) DEFAULT NULL,
  `cbu` varchar(20) DEFAULT NULL,
  `social_login` int(1) DEFAULT '0' COMMENT 'Especifica si utiliza una cuenta social para logearse | 0: no, 1:google, 2:facebook',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(1) DEFAULT '1',
  `cta_cte` int(1) DEFAULT '0',
  `empresa_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nombre`, `apellido`, `mail`, `nacionalidad_id`, `tipo_doc`, `nro_doc`, `comentarios`, `marcado`, `telefono`, `fecha_nacimiento`, `profesion_id`, `saldo`, `password`, `rol_id`, `news_letter`, `cbu`, `social_login`, `modified`, `status`, `cta_cte`, `empresa_id`) VALUES
(6, 'mateo', 'maneff', 'mmaneff@gmail.com', 0, 0, '', '', '0', '', '', 0, '0', '$2y$12$7LetpTg.qP87Bo7VIizuoeW2ffSlTwhvJ9sFJ1VTlKCAGQtGWpOI6', 0, 0, NULL, 0, '2017-12-23 21:47:32', 1, 0, NULL),
(7, 'adriana', 'moreno', 'amoreno@gmail.com', 0, 0, '', '', '0', '', '', 0, '0', '$2y$12$WNtp6YFvCxabUL/0v.m5Nu0T/acIP3sGta/AC039XDBCuoemmMWJ.', 0, 0, NULL, 0, '2017-12-23 21:48:37', 1, 0, NULL),
(8, 'ariel', 'cessario', 'arielcessario@gmail.com', 0, 0, '', '', '0', '', '', 0, '0', '$2y$12$UzOEVH4h9FfOsBRXDJflK.nzCChPuBkaRMMk6UTE9vpusuO9nPwzW', 0, 0, NULL, 0, '2017-12-23 21:49:10', 1, 0, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD PRIMARY KEY (`direccion_id`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estado_eventos`
--
ALTER TABLE `estado_eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estado_invitados`
--
ALTER TABLE `estado_invitados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `invitados`
--
ALTER TABLE `invitados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`login_id`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `platos`
--
ALTER TABLE `platos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `provincias`
--
ALTER TABLE `provincias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `salones`
--
ALTER TABLE `salones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_eventos`
--
ALTER TABLE `tipo_eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `direccion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estado_eventos`
--
ALTER TABLE `estado_eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estado_invitados`
--
ALTER TABLE `estado_invitados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `invitados`
--
ALTER TABLE `invitados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `localidades`
--
ALTER TABLE `localidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `logins`
--
ALTER TABLE `logins`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `platos`
--
ALTER TABLE `platos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `provincias`
--
ALTER TABLE `provincias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `salones`
--
ALTER TABLE `salones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tipo_eventos`
--
ALTER TABLE `tipo_eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
