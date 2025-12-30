import { useState } from "react";
import { API_URL } from "../api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    alert("Login successful");
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button>Login</button>
    </form>
  );
}
