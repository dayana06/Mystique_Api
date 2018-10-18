-- View: vista_horario_empleado

-- DROP VIEW vista_horario_empleado;

CREATE OR REPLACE VIEW vista_horario_empleado AS 
 SELECT a.id, 
    a.id_horario, 
    a.id_empleado, 
    a.id_cita, 
    b.id_dia_laborable, 
    b.id_bloque, 
    c.dia, 
    d.hora_inicio, 
    d.hora_fin
   FROM horario_empleado a
   JOIN horario b ON b.id = a.id_horario
   JOIN dia_laborable c ON c.id = b.id_dia_laborable
   JOIN bloque d ON d.id = b.id_bloque
  WHERE a.estatus = 'A'::bpchar;

ALTER TABLE vista_horario_empleado
  OWNER TO postgres;