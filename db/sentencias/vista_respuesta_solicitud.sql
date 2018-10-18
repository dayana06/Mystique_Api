-- View: public.vista_respuesta_solicitud

-- DROP VIEW public.vista_respuesta_solicitud;

CREATE OR REPLACE VIEW public.vista_respuesta_solicitud AS 
 SELECT a.id,
    a.id_solicitud,
    a.id_tipo_respuesta_solicitud,
    a.descripcion,
    a.fecha_creacion,
    b.nombre
   FROM respuesta_solicitud a
     JOIN tipo_respuesta_solicitud b ON b.id = a.id_tipo_respuesta_solicitud
  WHERE a.estatus = 'A'::bpchar;

ALTER TABLE public.vista_respuesta_solicitud
  OWNER TO postgres;
