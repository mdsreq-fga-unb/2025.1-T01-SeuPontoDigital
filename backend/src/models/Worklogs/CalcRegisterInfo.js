export default function calcRegistroInfo({
  id_employee,
  date,
  diaSemana,
  clock_in,
  clock_out,
  break_start,
  break_end,
}) {
  const entrada = new Date(`${date}T${clock_in}`);
  const saida = new Date(`${date}T${clock_out}`);
  const idaAlmoco = new Date(`${date}T${break_start}`);
  const voltaAlmoco = new Date(`${date}T${break_end}`);

  const horasTrabalhadas =
    (saida - entrada - (voltaAlmoco - idaAlmoco)) / (1000 * 60 * 60);
  const horaExtra = horasTrabalhadas - cargaHorariaDia;

//  pegar com base no número do contrato
//   "intervalo_contrato": 60,
//   "carga_horaria_dia": 8,

  return {
    intervalo_contrato: intervaloMinutosContrato,
    carga_horaria_dia: cargaHorariaDia,
    horas_trabalhadas: horasTrabalhadas.toFixed(2),
    horas_extra: horaExtra > 0 ? horaExtra.toFixed(2) : "0.00"
  };
}
