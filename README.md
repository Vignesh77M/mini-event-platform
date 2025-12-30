# Mini Event Platform (MERN Stack)

This is a full-stack MERN application that allows users to create events,
view upcoming events, and RSVP to events with strict capacity enforcement.

The project demonstrates secure authentication, event management,
and concurrency-safe RSVP handling.

---

## 🚀 Live Demo

Frontend URL: <ADD_FRONTEND_URL_HERE>  
Backend URL: <ADD_BACKEND_URL_HERE>

---

## 🛠 Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: JWT (JSON Web Tokens)
- Deployment: Vercel (Frontend), Render (Backend)

---

## ✅ Features Implemented

### Authentication
- User Registration
- User Login
- JWT-based authentication
- Protected routes for event creation and RSVP

### Event Management
- Create events with title, description, date, location, and capacity
- View all available events
- Only authenticated users can create events

### RSVP System (Core Feature)
- Users can RSVP to events
- Capacity is strictly enforced
- No duplicate RSVPs allowed
- Prevents overbooking even under concurrent requests

---

## 🔐 RSVP Capacity & Concurrency Handling (IMPORTANT)

To prevent overbooking when multiple users attempt to RSVP simultaneously,
MongoDB atomic operations were used.

The backend uses a single `findOneAndUpdate` operation with conditional checks
and atomic operators (`$inc`, `$push`) to ensure that:

- Capacity is checked and updated in one atomic operation
- A user can RSVP only once per event
- Once capacity reaches zero, further RSVP attempts are rejected

This approach eliminates race conditions and guarantees data consistency
even under concurrent access.

---

## ▶️ How to Run Locally

### Backend Setup
```bash
cd server
npm install
npm run dev
