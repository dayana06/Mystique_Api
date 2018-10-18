-- View: public.vista_servicios_categoria

-- DROP VIEW public.vista_servicios_categoria;

CREATE OR REPLACE VIEW public.vista_solicitud_presupuesto AS 
 SELECT a.id,
    a.id_solicitud,
    a.estado,
    a.monto_total,
    b.descripcion,
    b.id_tipo_respuesta_presupuesto,
    c.nombre
   FROM presupuesto a
     JOIN respuesta_presupuesto b ON a.id = b.id_presupuesto
     JOIN tipo_respuesta_presupuesto c ON c.id = b.id_tipo_respuesta_presupuesto
  WHERE a.estatus = 'A'::bpchar;

