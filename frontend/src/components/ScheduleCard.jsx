export default function ScheduleCard({ schedule, onBook }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-center hover:shadow-md transition">
      <span className="text-gray-800 font-medium">
        {new Date(schedule.dateTime).toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </span>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        onClick={() => onBook(schedule)}
      >
        Agendar
      </button>
    </div>
  );
}
