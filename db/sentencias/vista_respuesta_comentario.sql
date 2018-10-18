-- View: vista_respuesta_comentario

-- DROP VIEW vista_respuesta_comentario;

CREATE OR REPLACE VIEW vista_respuesta_comentario AS 
SELECT a.id, 
   a.id_tipo_respuesta_comentario, 
   a.id_comentario, 
   a.descripcion, 
   b.nombre AS tipo_respuesta_comentario, 
   c.descripcion AS comentario, 
   d.nombre AS nombre_cliente, 
   d.id AS id_cliente
  FROM respuesta_comentario a
  JOIN tipo_respuesta_comentario b ON b.id = a.id_tipo_respuesta_comentario
  JOIN comentario c ON c.id = a.id_comentario
  JOIN cliente d ON d.id = c.id_cliente
 WHERE a.estatus = 'A'::bpchar;

ALTER TABLE vista_respuesta_comentario
 OWNER TO postgres;