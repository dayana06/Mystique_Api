-- View: vista_presupuesto

-- DROP VIEW vista_presupuesto;

CREATE OR REPLACE VIEW vista_notificacion AS 
 SELECT a.id,
 a.id_tipo_notificacion,
 a.fecha_creacion,
 a.estatus,
 a.id_usuario,
 a.id_registro,
 b.nombre,
 b.descripcion
  FROM notificacion a
  JOIN tipo_notificacion b ON b.id = a.id_tipo_notificacion
  WHERE a.estatus = 'A'::bpchar;

