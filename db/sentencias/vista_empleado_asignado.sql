CREATE OR REPLACE VIEW public.vista_empleado_asignado AS 
 SELECT a.id,
    a.id_empleado,
    a.id_orden_servicio,
    b.nombre,
    b.apellido,
    b.cedula,
    b.telefono,
    b.direccion,
    b.fecha_nacimiento,
    b.sexo
   FROM empleado_asignado a
     JOIN empleado b ON a.id_empleado = b.id
  WHERE a.estatus = 'A'::bpchar;
