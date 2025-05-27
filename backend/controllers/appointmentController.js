// controllers/appointmentController.js

import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';

export const createAppointment = async (req, res) => {
  const { patientName, phone, specialty, dateTime } = req.body;

  try {
    const existingAppointment = await Appointment.findOne({ dateTime });
    if (existingAppointment) {
      return res.status(400).json({ message: 'Já existe um agendamento para este horário.' });
    }

    // 🔍 Verifica se o paciente já existe
    let patient = await Patient.findOne({ name: patientName });

    // 👤 Se não existir, cria
    if (!patient) {
      patient = new Patient({ name: patientName, phone });
      await patient.save();
    }

    // 💾 Cria o agendamento normalmente
    const appointment = new Appointment({
      patientName,
      phone,
      specialty,
      dateTime,
    });

    await appointment.save();

    return res.status(201).json({
      message: 'Agendamento e paciente criados com sucesso.',
      appointment,
    });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return res.status(500).json({
      message: 'Erro ao criar agendamento.',
      error: error.message,
    });
  }
};


// Função para listar todos os agendamentos
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar agendamentos.', error: error.message });
    }
};

// Função para listar agendamentos por paciente
export const getAppointmentsByPatient = async (req, res) => {
    const { patientName } = req.params;

    try {
        const appointments = await Appointment.find({ patientName });
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar agendamentos do paciente.', error: error.message });
    }
};

// Função para atualizar o status de um agendamento
export const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Agendamento não encontrado.' });
        }
        return res.status(200).json({ message: 'Status do agendamento atualizado com sucesso.', appointment });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar status do agendamento.', error: error.message });
    }
};

// Função para deletar um agendamento
export const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Agendamento não encontrado.' });
        }
        return res.status(200).json({ message: 'Agendamento deletado com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar agendamento.', error: error.message });
    }
};