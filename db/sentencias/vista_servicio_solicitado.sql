-- View: public.vista_servicio_solicitado

-- DROP VIEW public.vista_servicio_solicitado;

CREATE OR REPLACE VIEW public.vista_servicio_solicitado AS 
 SELECT a.id,
    a.id_servicio,
    a.fecha_creacion,
    d.id AS solicitud,
    b.nombre AS nombre_servicio,
    c.nombre AS tipo_servicio
   FROM servicio_solicitado a
     JOIN solicitud d ON d.id = a.id_solicitud
     JOIN servicio b ON b.id = a.id_servicio
     JOIN tipo_servicio c ON c.id = b.id_tipo_servicio
  WHERE a.estatus = 'A'::bpchar;

ALTER TABLE public.vista_servicio_solicitado
  OWNER TO postgres;
