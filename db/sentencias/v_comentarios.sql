-- View: public.v_comentarios

-- DROP VIEW public.v_comentarios;

CREATE OR REPLACE VIEW public.v_comentarios AS 
 SELECT a.id,
    a.id_cliente,
    a.id_tipo_comentario,
    b.nombre,
    b.apellido,
    d.correo,
    c.nombre AS tipo_comentario,
    a.descripcion,
    a.fecha_creacion,
    a.estado
   FROM comentario a
     JOIN tipo_comentario c ON c.id = a.id_tipo_comentario
     JOIN cliente b ON b.id = a.id_cliente
     JOIN usuario d ON d.id = b.id_usuario
  WHERE a.estatus = 'A'::bpchar;

ALTER TABLE public.v_comentarios
  OWNER TO postgres;
