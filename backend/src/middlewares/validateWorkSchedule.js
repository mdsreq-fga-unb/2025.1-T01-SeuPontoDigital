const validateWorkSchedule = (req, res, next) => {
    const workSchedule = req.body;
    
    // Função para calcular diferença entre horários em minutos
    const calculateTimeDifference = (startTime, endTime) => {
        if (!startTime || !endTime) return 0;
        
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);
        
        const startTotalMin = startHour * 60 + startMin;
        const endTotalMin = endHour * 60 + endMin;
        
        return endTotalMin - startTotalMin;
    };
    
    // Função para converter minutos em horas e minutos
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h${mins.toString().padStart(2, '0')}min`;
    };
    
    // Coletar todos os dias trabalhados
    const workDays = [];
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    dayNames.forEach(day => {
        const startKey = `${day}_start`;
        const endKey = `${day}_end`;
        
        if (workSchedule[startKey] && workSchedule[endKey]) {
            const workMinutes = calculateTimeDifference(workSchedule[startKey], workSchedule[endKey]);
            workDays.push({
                day,
                start: workSchedule[startKey],
                end: workSchedule[endKey],
                workMinutes
            });
        }
    });
    
    // Verificar se há dias de trabalho
    if (workDays.length === 0) {
        return res.status(400).json({
            message: "É necessário definir pelo menos um dia de trabalho"
        });
    }
    
    // Verificar limite de dias trabalhados
    if (workDays.length > 6) {
        return res.status(400).json({
            message: "Não é permitido trabalhar mais de 6 dias por semana"
        });
    }
    
    // Verificar horários inválidos (fim antes do início)
    const invalidDays = workDays.filter(day => day.workMinutes <= 0);
    if (invalidDays.length > 0) {
        return res.status(400).json({
            message: `Horário inválido: o horário de saída deve ser posterior ao de entrada nos dias: ${invalidDays.map(d => d.day).join(', ')}`
        });
    }
    
    // Aplicar regras conforme número de dias trabalhados
    if (workDays.length === 5) {
        // 5 dias: máximo 10h48min por dia (648 minutos)
        const maxMinutesPerDay = 648; // 10h48min
        
        const invalidDays = workDays.filter(day => day.workMinutes > maxMinutesPerDay);
        if (invalidDays.length > 0) {
            return res.status(400).json({
                message: `Para jornada de 5 dias, cada dia pode ter no máximo ${formatTime(maxMinutesPerDay)} (incluindo intervalo). Dias inválidos: ${invalidDays.map(d => `${d.day} (${formatTime(d.workMinutes)})`).join(', ')}`
            });
        }
        
    } else if (workDays.length === 6) {
        // 6 dias: máximo 10h por dia (600 minutos) nos primeiros 5 dias e 4h (240 minutos) no 6º dia
        const maxMinutesFirst5Days = 600; // 10h
        const maxMinutesSixthDay = 240; // 4h
        
        // Ordenar dias por duração (do maior para o menor)
        const sortedDays = [...workDays].sort((a, b) => b.workMinutes - a.workMinutes);
        
        // Os 5 primeiros dias (mais longos) podem ter até 10h
        const first5Days = sortedDays.slice(0, 5);
        const sixthDay = sortedDays[5];
        
        const invalidFirst5Days = first5Days.filter(day => day.workMinutes > maxMinutesFirst5Days);
        if (invalidFirst5Days.length > 0) {
            return res.status(400).json({
                message: `Para jornada de 6 dias, 5 dias podem ter no máximo ${formatTime(maxMinutesFirst5Days)} (incluindo intervalo). Dias inválidos: ${invalidFirst5Days.map(d => `${d.day} (${formatTime(d.workMinutes)})`).join(', ')}`
            });
        }
        
        if (sixthDay.workMinutes > maxMinutesSixthDay) {
            return res.status(400).json({
                message: `Para jornada de 6 dias, o dia mais curto pode ter no máximo ${formatTime(maxMinutesSixthDay)} (incluindo intervalo). Dia inválido: ${sixthDay.day} (${formatTime(sixthDay.workMinutes)})`
            });
        }
        
    } else {
        // Para outros números de dias (1-4), aplicar regra padrão de 8h por dia
        const maxMinutesPerDay = 480; // 8h
        
        const invalidDays = workDays.filter(day => day.workMinutes > maxMinutesPerDay);
        if (invalidDays.length > 0) {
            return res.status(400).json({
                message: `Para jornada de ${workDays.length} dias, cada dia pode ter no máximo ${formatTime(maxMinutesPerDay)} (incluindo intervalo). Dias inválidos: ${invalidDays.map(d => `${d.day} (${formatTime(d.workMinutes)})`).join(', ')}`
            });
        }
    }
    
    // Verificar se há break_start e break_end definidos para validar intervalo
    if (req.body.break_start && req.body.break_end) {
        const breakMinutes = calculateTimeDifference(req.body.break_start, req.body.break_end);
        
        if (breakMinutes < 30) {
            return res.status(400).json({
                message: "O intervalo de descanso deve ter no mínimo 30 minutos"
            });
        }
        
        if (breakMinutes > 120) {
            return res.status(400).json({
                message: "O intervalo de descanso deve ter no máximo 2 horas (120 minutos)"
            });
        }
    }
    
    // Se chegou até aqui, a validação passou
    next();
};

export default validateWorkSchedule;
