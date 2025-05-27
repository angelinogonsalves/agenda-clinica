import { useEffect, useState } from "react";
import {
  getAllAppointments,
  updateAppointmentStatus,
} from "../services/appointmentService";
import AppointmentList from "../components/AppointmentList";
import { Link } from "react-router-dom";

export default function AdminPage() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () =>
    getAllAppointments().then((res) => setAppointments(res.data));

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAction = async (id, status) => {
    await updateAppointmentStatus(id, status);
    fetchAppointments();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
          Painel Administrativo
        </h1>

        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700 border-b pb-2">
            Todos os Agendamentos
          </h2>

          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhum agendamento no momento.
            </p>
          ) : (
            <AppointmentList
              appointments={appointments}
              onAction={handleAction}
            />
          )}
        </section>

        <div className="text-center mt-6">
          <Link
            to="/admin/horarios"
            className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition"
          >
            ➕ Cadastrar novo horário disponível
          </Link>
        </div>
      </div>
    </div>
  );
}
