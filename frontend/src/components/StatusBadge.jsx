const statusMap = {
  pending: {
    text: "Pendente",
    color: "bg-yellow-100 text-yellow-800 ring-yellow-300",
  },
  approved: {
    text: "Aprovado",
    color: "bg-green-100 text-green-800 ring-green-300",
  },
  rejected: {
    text: "Rejeitado",
    color: "bg-red-100 text-red-800 ring-red-300",
  },
};

export default function StatusBadge({ status }) {
  const { text, color } = statusMap[status] || statusMap.pending;

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ring-1 ${color}`}
    >
      {text}
    </span>
  );
}
