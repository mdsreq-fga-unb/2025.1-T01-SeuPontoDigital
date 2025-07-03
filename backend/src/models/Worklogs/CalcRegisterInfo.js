import supabase from "../../config/supabase.js";

export default async function calcRegistroInfo(id_contract, date, id_log) {
  console.log("Começando calcRegistroInfo")
  
  const diaSemana = new Date(date).getDay(); // 0 = domingo, 1 = segunda, ...

  // Sobre pegar o intervalo de trabalho
  const { data: fixed, error: errFixed } = await supabase
    .from('fixed_breaks')
    .select('break_start, break_end')
    .eq('id_contract', id_contract)
    .single();

  let intervaloMinutos = 0;

  if (fixed) {
    const inicio = new Date(`${date}T${fixed.break_start}`);
    const fim = new Date(`${date}T${fixed.break_end}`);
    intervaloMinutos = (fim - inicio) / (1000 * 60);
  } else {
    const { data: flex } = await supabase
      .from('flex_breaks')
      .select('duration_minutes')
      .eq('id_contract', id_contract)
      .single();

    intervaloMinutos = flex?.duration_minutes ?? 0;
  }

  console.log("intervalo de trabalho", intervaloMinutos)

  // sobre pegar carga horária
  const { data: schedule } = await supabase
    .from('work_schedules')
    .select('*')
    .eq('id_contract', id_contract)
    .single();

//const diaSemana = new Date(date).getDay(); // 0 = domingo, 1 = segunda, ...

const dias = [
  ['sunday_start', 'sunday_end'],
  ['monday_start', 'monday_end'],
  ['tuesday_start', 'tuesday_end'],
  ['wednesday_start', 'wednesday_end'],
  ['thursday_start', 'thursday_end'],
  ['friday_start', 'friday_end'],
  ['saturday_start', 'saturday_end']
];

// if (!Array.isArray(dias[diaSemana])) {
//   throw new Error(`Dia da semana inválido ou data inválida: ${date} (diaSemana=${diaSemana})`);
// }

  const [startField, endField] = dias[diaSemana];
  const start = new Date(`${date}T${schedule[startField]}`);
  const end = new Date(`${date}T${schedule[endField]}`);
  const cargaHorariaDia = ((end - start) / (1000 * 60 * 60)) || 0;

  console.log("carga_horaria do dia", cargaHorariaDia)

  // sobre buscar 
  const { data: log } = await supabase
    .from('work_logs')
    .select('clock_in, clock_out, break_start, break_end')
    .eq('id', id_log)
    .single();

  const entrada = new Date(`${date}T${log.clock_in}`);
  const saida = new Date(`${date}T${log.clock_out}`);
  const idaAlmoco = new Date(`${date}T${log.break_start}`);
  const voltaAlmoco = new Date(`${date}T${log.break_end}`);

  // sobre calcular horas trabalhadas
  const horasTrabalhadas = (saida - entrada - (voltaAlmoco - idaAlmoco)) / (1000 * 60 * 60);
  console.log("horastrabalhadas", horasTrabalhadas)

  // sobre calcular as horas extras
  const horaExtra = horasTrabalhadas - cargaHorariaDia;
  console.log("horaExtra", horaExtra)

  console.log("Terminando calcRegistroInfo")
  return {
    intervalo_contrato: intervaloMinutos,
    carga_horaria_dia: cargaHorariaDia.toFixed(2),
    horas_trabalhadas: horasTrabalhadas.toFixed(2),
    horas_extra: horaExtra > 0 ? horaExtra.toFixed(2) : "0.00"
  };
}
