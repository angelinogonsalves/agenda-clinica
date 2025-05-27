import Schedule from '../models/Schedule.js';

// Cria um novo horário disponível
export const createSchedule = async (req, res) => {
    const { dateTime, available } = req.body;

    try {
        const exists = await Schedule.findOne({ dateTime });
        if (exists) {
            return res.status(400).json({ message: 'Já existe um horário disponível para este horário.' });
        }
        const schedule = new Schedule({ dateTime, available });
        await schedule.save();
        return res.status(201).json({ message: 'Horário criado com sucesso.', schedule });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar horário.', error: error.message });
    }
};

// Lista todos os horários disponíveis
export const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        return res.status(200).json(schedules);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar horários.', error: error.message });
    }
};

// Remove um horário
export const deleteSchedule = async (req, res) => {
    const { id } = req.params;

    try {
        const schedule = await Schedule.findByIdAndDelete(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Horário não encontrado.' });
        }
        return res.status(200).json({ message: 'Horário removido com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover horário.', error: error.message });
    }
};