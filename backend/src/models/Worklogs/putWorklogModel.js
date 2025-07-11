import supabase from '../../config/supabase.js';

const putWorklogModel = async (workLogId, updatePayload) => {
  try {
    const { error: updateError } = await supabase
      .from('work_logs')
      .update(updatePayload)
      .eq('id', workLogId);

    if (updateError) {
      console.error('Erro ao atualizar work log:', updateError.message);
      return { error: updateError.message };
    }

    return { data: true };
  } catch (err) {
    console.error('Erro inesperado no updateWorkLogModel:', err.message);
    return { error: 'Erro interno do servidor ao atualizar registro de ponto.' };
  }
};

export default putWorklogModel;