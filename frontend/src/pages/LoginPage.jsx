import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    if (username.trim().toLowerCase() === "admin") {
      navigate("/admin");
    } else {
      navigate("/paciente");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 animate-fade-in">
        <h1 className="text-4xl font-bold text-blue-700 mb-2 text-center">
          Clínica RIGATTI
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Faça login com seu nome para acessar o sistema.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="border border-blue-300 rounded-lg px-4 py-3 w-full text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Digite seu nome (ex: admin ou João)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-4 py-3 rounded-lg w-full font-medium text-lg shadow-md"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
