import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const USER_API_URL = import.meta.env.VITE_API_URL_USER;

export default function Login({ setUser  }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(USER_API_URL);
      const users = response.data;
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setUser (user);
        
        // Simpan user ke localStorage
        localStorage.setItem("user", JSON.stringify(user)); 

        Swal.fire({
            title: "Login Berhasil!",
            text: `Selamat datang, ${user.username}!`,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#318161",
          }).then(() => {
            navigate("/budidaya-tracker");
          });
      } else {
        toast.error("Username atau password salah!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Gagal login!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#318161]"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#318161]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#318161] text-white px-4 py-2 rounded hover:bg-[#265a4a] transition-colors"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}