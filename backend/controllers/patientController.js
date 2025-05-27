import Patient from '../models/Patient.js';

// Cria novo paciente
export const createPatient = async (req, res) => {
    const { name, phone } = req.body;

    try {
        const exists = await Patient.findOne({ phone });
        if (exists) {
            return res.status(400).json({ message: 'Já existe um paciente com este telefone.' });
        }
        const patient = new Patient({ name, phone });
        await patient.save();
        return res.status(201).json({ message: 'Paciente cadastrado com sucesso.', patient });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cadastrar paciente.', error: error.message });
    }
};

// Lista todos os pacientes
export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        return res.status(200).json(patients);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar pacientes.', error: error.message });
    }
};

// Busca paciente por telefone
export const getPatientByPhone = async (req, res) => {
    const { phone } = req.params;

    try {
        const patient = await Patient.findOne({ phone });
        if (!patient) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }
        return res.status(200).json(patient);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar paciente.', error: error.message });
    }
};

// Remove paciente
export const deletePatient = async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findByIdAndDelete(id);
        if (!patient) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }
        return res.status(200).json({ message: 'Paciente removido com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover paciente.', error: error.message });
    }
};