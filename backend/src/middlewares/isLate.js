/**
 * Verifica se o horário real está atrasado em relação ao previsto, considerando uma tolerância.
 * 
 * @param {string} scheduledTime - Hora prevista (formato "HH:mm")
 * @param {string} actualTime - Hora real registrada (formato "HH:mm")
 * @param {number} toleranceMinutes - Quantos minutos de tolerância são aceitos
 * @returns {boolean} - true se está atrasado
 */
export default function isLate(scheduledTime, actualTime, toleranceMinutes = 5) {
  const toMinutes = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const scheduled = toMinutes(scheduledTime);
  const actual = toMinutes(actualTime);

  return actual > (scheduled + toleranceMinutes);
}

// console.log("isLate", isLate("11:45:00", "12:00:59", 15))