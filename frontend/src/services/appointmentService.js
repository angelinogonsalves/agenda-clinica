import api from "./api";

// Horários disponíveis
export const getSchedules = () => api.get("/schedules");
export const createSchedule = (data) => api.post("/schedules", data);
export const deleteSchedule = (id) => api.delete(`/schedules/${id}`);

// Agendamentos
export const createAppointment = (data) => api.post("/appointments", data);

export const getAppointmentsByName = (name) =>
  api.get(`/appointments/patient/${encodeURIComponent(name)}`);

export const getAllAppointments = () => api.get("/appointments");

export const updateAppointmentStatus = (id, status) =>
  api.put(`/appointments/${id}/status`, { status });
