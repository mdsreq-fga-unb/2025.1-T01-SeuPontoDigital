SELECT 
  c.id AS contrato_id,
  emp.nome AS nome_empregado,
  empg.nome AS nome_empregador,
  c.data_inicio,
  c.salario
FROM contrato c
JOIN empregado emp ON c.empregado_id = emp.id
JOIN empregador empg ON c.empregador_id = empg.id;
