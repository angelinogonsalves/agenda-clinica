import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createSchedule,
  getSchedules,
  deleteSchedule,
} from "../services/appointmentService";

export default function AdminSchedulesPage() {
  const [dateTime, setDateTime] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = () =>
    getSchedules().then((res) => setSchedules(res.data));

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleCreate = async () => {
    if (!dateTime) return alert("Selecione um horário.");
    setLoading(true);
    try {
      await createSchedule({ dateTime: new Date(dateTime) });
      setDateTime("");
      fetchSchedules();
      alert("Horário criado com sucesso!");
    } catch (err) {
      alert("Erro ao criar horário.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja remover este horário?")) return;
    await deleteSchedule(id);
    fetchSchedules();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Cadastrar Horário Disponível
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="flex-1 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow disabled:opacity-50"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Horários Cadastrados
        </h2>
        <ul className="space-y-2 text-sm text-gray-800">
          {schedules.map((s) => (
            <li
              key={s._id}
              className="border rounded px-4 py-2 flex justify-between items-center"
            >
              <span>
                {new Date(s.dateTime).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
              <button
                className="text-red-600 hover:underline text-xs"
                onClick={() => handleDelete(s._id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>

        <div className="text-center mt-8">
          <Link
            to="/admin"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            ← Voltar para o Painel
          </Link>
        </div>
      </div>
    </div>
  );
}
