-- View: public.vista_servicios_categoria

-- DROP VIEW public.vista_servicios_categoria;

CREATE OR REPLACE VIEW public.vista_servicios_categoria AS 
 SELECT a.id,
    a.nombre,
    a.imagen,
    a.precio,
    a.descripcion,
    a.id_tipo_servicio,
    a.fecha_creacion,
    a.estatus,
    b.nombre AS tipo_servicio,
    b.id_categoria_servicio,
    c.nombre AS categoria_servicio
   FROM servicio a
     JOIN tipo_servicio b ON b.id = a.id_tipo_servicio
     JOIN categoria_servicio c ON c.id = b.id_categoria_servicio
  WHERE a.estatus = 'A'::bpchar;

