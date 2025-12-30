import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Events() {
  const token = localStorage.getItem("token");

  // auth states
  const [login, setLogin] = useState({ email: "", password: "" });
  const [register, setRegister] = useState({ name: "", email: "", password: "" });

  // event states
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: ""
  });

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then(res => res.json())
      .then(setEvents);
  }, []);

  // AUTH
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.reload();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register)
    });
    alert("Registered successfully");
  };

  // CREATE EVENT
  const createEvent = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(event)
    });
    window.location.reload();
  };

  // RSVP
  const rsvp = async (id) => {
    await fetch(`${API_URL}/api/rsvp/${id}`, {
      method: "POST",
      headers: { authorization: token }
    });
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini Event Platform</h1>

      {!token && (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input placeholder="Email" onChange={e => setLogin({ ...login, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setLogin({ ...login, password: e.target.value })} />
            <button>Login</button>
          </form>

          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input placeholder="Name" onChange={e => setRegister({ ...register, name: e.target.value })} />
            <input placeholder="Email" onChange={e => setRegister({ ...register, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setRegister({ ...register, password: e.target.value })} />
            <button>Register</button>
          </form>
        </>
      )}

      {token && (
        <>
          <button onClick={logout}>Logout</button>

          <h2>Create Event</h2>
          <form onSubmit={createEvent}>
            <input placeholder="Title" onChange={e => setEvent({ ...event, title: e.target.value })} />
            <textarea placeholder="Description" onChange={e => setEvent({ ...event, description: e.target.value })} />
            <input type="datetime-local" onChange={e => setEvent({ ...event, date: e.target.value })} />
            <input placeholder="Location" onChange={e => setEvent({ ...event, location: e.target.value })} />
            <input type="number" placeholder="Capacity" onChange={e => setEvent({ ...event, capacity: e.target.value })} />
            <button>Create</button>
          </form>
        </>
      )}

      <h2>Events</h2>
      {events.map(e => (
        <div key={e._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <p>Seats left: {e.capacity}</p>
          {token && <button onClick={() => rsvp(e._id)}>RSVP</button>}
        </div>
      ))}
    </div>
  );
}
