import { useState } from "react";
import { API_URL } from "../api";

export default function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(event)
    });

    if (res.ok) {
      alert("Event created successfully");
      window.location.href = "/";
    } else {
      alert("You must be logged in");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Event</h2>

      <input
        placeholder="Title"
        required
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        required
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
      />

      <input
        type="datetime-local"
        required
        onChange={(e) => setEvent({ ...event, date: e.target.value })}
      />

      <input
        placeholder="Location"
        required
        onChange={(e) => setEvent({ ...event, location: e.target.value })}
      />

      <input
        type="number"
        placeholder="Capacity"
        required
        onChange={(e) => setEvent({ ...event, capacity: e.target.value })}
      />

      <button>Create Event</button>
    </form>
  );
}
