import { useEffect, useState } from "react";
import {
  getSchedules,
  createAppointment,
  getAllAppointments,
  getAppointmentsByName,
} from "../services/appointmentService";
import ScheduleCard from "../components/ScheduleCard";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";

export default function PatientPage() {
  const [schedules, setSchedules] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (!storedName) {
      alert("Nome de usuário não encontrado. Retorne à tela de login.");
      return;
    }
    setUsername(storedName);
  }, []);

  useEffect(() => {
    if (username) {
      fetchData();
    }
  }, [username]);

  const fetchData = async () => {
    try {
      const [scheduleRes, allAppointmentsRes, myAppointmentsRes] = await Promise.all([
        getSchedules(),
        getAllAppointments(),
        getAppointmentsByName(username),
      ]);

      // Lista de horários ocupados por qualquer paciente
      const agendados = allAppointmentsRes.data.map((a) =>
        new Date(a.dateTime).getTime()
      );

      const horariosDisponiveis = scheduleRes.data.filter(
        (s) => !agendados.includes(new Date(s.dateTime).getTime())
      );

      // Atualiza somente os seus agendamentos
      setSchedules(horariosDisponiveis);
      setAppointments(myAppointmentsRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      alert("Erro ao carregar dados. Verifique sua conexão.");
    }
  };

  const handleBook = (schedule) => setSelectedSchedule(schedule);

  const handleSubmit = async ({ patientName, phone, specialty }) => {
    setLoading(true);
    try {
      await createAppointment({
        patientName: patientName,
        phone,
        specialty,
        dateTime: selectedSchedule.dateTime,
      });
      setSelectedSchedule(null);
      await fetchData();
      alert("Agendamento realizado com sucesso!");
    } catch (error) {
      alert("Erro ao agendar. Verifique se o horário ainda está disponível.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pb-16 pt-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center tracking-tight">
          Agenda da Clínica RIGATTI
        </h1>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 text-gray-700 border-b pb-2">
            Horários Disponíveis
          </h2>

          {schedules.length === 0 ? (
            <p className="text-gray-500 text-center">
              Nenhum horário disponível.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {schedules.map((schedule) => (
                <ScheduleCard
                  key={schedule._id}
                  schedule={schedule}
                  onBook={handleBook}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-700 border-b pb-2">
            Meus Agendamentos
          </h2>
          <AppointmentList appointments={appointments} />
        </section>
      </div>

      {selectedSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setSelectedSchedule(null)}
              aria-label="Fechar"
            >
              &times;
            </button>
            <h3 className="font-bold text-xl mb-4 text-blue-700">
              Agendar Horário
            </h3>
            <AppointmentForm
              schedule={selectedSchedule}
              onSubmit={handleSubmit}
              loading={loading}
            />
            <button
              className="mt-6 block mx-auto text-sm text-blue-600 hover:underline"
              onClick={() => setSelectedSchedule(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
