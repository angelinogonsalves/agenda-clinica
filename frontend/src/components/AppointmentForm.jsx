import { useState } from "react";

export default function AppointmentForm({ schedule, onSubmit, loading }) {
  const patientName = localStorage.getItem("username") || useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("");

  // Formatar telefone dinamicamente
  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientName) {
      alert("Nome do usuário não encontrado. Faça login novamente.");
      return;
    }

    const payload = {
      patientName: patientName,
      phone,
      specialty,
      dateTime: schedule?.dateTime,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-3 text-sm text-center">
        <strong>Data escolhida:</strong>{" "}
        {schedule?.dateTime
          ? new Date(schedule.dateTime).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })
          : "Indefinida"}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          value={patientName}
          readOnly
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 bg-gray-100 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone
        </label>
        <input
          type="tel"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="(99) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Especialidade
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ex: Pediatria, Clínica Geral..."
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 text-white rounded-lg font-semibold transition-all ${
          loading
            ? "bg-green-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Agendando..." : "Confirmar Agendamento"}
      </button>
    </form>
  );
}
