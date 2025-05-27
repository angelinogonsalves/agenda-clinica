import StatusBadge from "./StatusBadge";

export default function AppointmentList({ appointments, onAction }) {
  if (!appointments.length)
    return (
      <p className="text-center text-gray-500 italic">
        Nenhum agendamento encontrado.
      </p>
    );

  return (
    <ul className="space-y-4">
      {appointments.map((appt) => (
        <li
          key={appt._id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition hover:shadow-md"
        >
          <div className="space-y-1 text-sm text-gray-700 mb-3 sm:mb-0">
            <div>
              <span className="font-semibold text-gray-800">Paciente:</span>{" "}
              {appt.patientName}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Especialidade:</span>{" "}
              {appt.specialty}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Horário:</span>{" "}
              {appt.dateTime ? (
                new Date(appt.dateTime).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })
              ) : (
                <span className="text-gray-400 italic">Indefinido</span>
              )}
            </div>
            <StatusBadge status={appt.status} />
          </div>

          {onAction && appt.status === "pending" && (
            <div className="flex space-x-2">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm shadow-sm"
                onClick={() => onAction(appt._id, "approved")}
              >
                Aprovar
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm shadow-sm"
                onClick={() => onAction(appt._id, "rejected")}
              >
                Rejeitar
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
