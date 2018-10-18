-- View: public.vista_solicitudes

-- DROP VIEW public.vista_solicitudes;
 CREATE OR REPLACE VIEW public.vista_cliente_ciudad AS 
 SELECT a.id,
    a.nombre,
    a.apellido,
    a.cedula,
    a.telefono,
    a.direccion,
    a.fecha_nacimiento,
    a.tipo_cliente,
    a.id_usuario,
    a.estatus,
    a.fecha_creacion,
    a.id_ciudad,
    b.nombre AS ciudad,
    c.nombre AS estado
   FROM cliente a
     JOIN ciudad b ON a.id_ciudad = b.id
     JOIN estado c ON b.id_estado = c.id
  WHERE a.estatus = 'A'::bpchar;
