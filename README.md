<p align="center">
  <img src="assets/logo.svg" alt="Bus Reservation System" width="700"/>
</p>

<p align="center">
  <strong>A full-featured Bus Reservation System — built first in C++, then brought to the web.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/C++-OOP%20Console%20App-00599C?style=flat-square&logo=cplusplus&logoColor=white"/>
  <img src="https://img.shields.io/badge/Web-HTML%20%7C%20CSS%20%7C%20JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Status-Complete-brightgreen?style=flat-square"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square"/>
</p>

---

## 📖 About the Project

**BusRoute** is a Bus Reservation System built in two stages:

1. **C++ Console Application** — A terminal-based program applying Object-Oriented Programming concepts (classes, inheritance, vectors, arrays) to manage bus routes and seat bookings.
2. **Web Application** — A modern, fully interactive single-page web app that recreates every feature of the C++ version in a premium, responsive UI — complete with real-time seat maps, animated ticket generation, and live search.

Both implementations share the same core logic: create routes, reserve seats, prevent duplicate bookings, and display bus information.

---

## ✨ Features

| Feature | C++ App | Web App |
|---|:---:|:---:|
| Create bus routes | ✅ | ✅ |
| Reserve seats by passenger name | ✅ | ✅ |
| Interactive seat map (32 seats) | — | ✅ |
| View all available buses | ✅ | ✅ |
| Search / filter buses | — | ✅ |
| Prevent duplicate bus numbers | ✅ | ✅ |
| Prevent double-booking a seat | ✅ | ✅ |
| Display full bus details | ✅ | ✅ (modal) |
| Seat availability progress bar | — | ✅ |
| Booking confirmation ticket | — | ✅ |
| Sample / demo data loader | — | ✅ |
| Mobile responsive layout | — | ✅ |
| Toast notifications | — | ✅ |

---

## 🗂️ Project Structure

```text
Bus-Reservation/
│
├── assets/
│   └── logo.svg          # Project logo used in README
│
├── index.html            # Web app — HTML structure & views
├── style.css             # Web app — complete design system & animations
├── app.js                # Web app — all business logic (routing, booking, UI)
│
├── reservation.cpp       # C++ console application (original implementation)
│
├── .gitattributes
└── README.md
```

---

## 🌐 Web Application

The web app is a single-page application with four views navigated via a sticky navbar.

### Pages / Views

| View | Description |
|---|---|
| **Home** | Hero section, live stats (routes & open seats), feature cards, demo loader |
| **All Buses** | Searchable grid of all routes with availability bars and "View Seats" modals |
| **Reserve** | 3-step guided flow: select bus → pick seat from map → enter passenger name |
| **Manage** | Add new routes via form; view existing routes with seat counts |

### Tech Stack — Web

- **HTML5** — Semantic markup, single-page view routing
- **CSS3** — Custom design system, CSS variables, glassmorphism, keyframe animations
- **Vanilla JavaScript** — All state management, DOM rendering, and booking logic (no frameworks, no dependencies)
- **Google Fonts** — `Syne` (headings) + `Inter` (body)

### How to Run the Web App

No build step needed. Just open the file in any modern browser:

```bash
# Option 1 — open directly
start index.html          # Windows
open index.html           # macOS

# Option 2 — serve with a local dev server (e.g. VS Code Live Server)
# Right-click index.html → "Open with Live Server"
```

---

## 🖥️ C++ Console Application

### How to Compile & Run

**Compile** using `g++`:

```bash
g++ reservation.cpp -o reservation
```

**Run:**

```bash
# Linux / macOS
./reservation

# Windows
reservation.exe
```

### Menu Options

```
==================================================
 BUS RESERVATION SYSTEM
==================================================
1. Create bus route
2. Make reservation
3. Display seats
4. Show all buses
5. Print bus details
6. Exit
```

### OOP Design

```
BusRoute  (base class)
│  busNo, driver, fromPlace, toPlace, arrivalTime, departureTime
│  Default & parameterized constructors
│
└── Bus  (derived class)
       seats[32]  — array tracking passenger names per seat
       isSeatBooked(seatNo)
       bookSeat(seatNo, name)
       displaySeats()
       printInfo()
```

### C++ Concepts Applied

- **Classes & Objects** — `BusRoute` base class, `Bus` derived class
- **Inheritance** — `Bus` extends `BusRoute`
- **Constructors** — default and parameterized
- **Arrays** — fixed-size `seats[32]` array inside `Bus`
- **Vectors** — global `vector<Bus> buses` collection
- **Pointers** — `Bus* findBus(...)` returns pointer or `nullptr`
- **Input validation** — duplicate bus numbers, out-of-range seats, already-booked seats
- **Menu-driven programming** — `do-while` loop with `switch`

---

## 🚀 How It Works — Web App Flow

```
1. User visits the app
        │
        ├─ Load demo data (optional) → 5 pre-built routes with pre-booked seats
        │
2. Browse routes (All Buses view)
        │
        ├─ Search by bus no, from, to, or driver name
        ├─ View seat map in a modal
        └─ Click "Reserve →" to jump to booking
        │
3. Reserve a Seat (3-step flow)
        │
        ├─ Step 1: Select a bus from the list
        ├─ Step 2: Click an available seat on the visual seat map
        └─ Step 3: Enter passenger name → Confirm Booking
        │
4. Booking Confirmed ✅
        └─ Ticket card displayed with route, seat, driver, departure info
```

---

## 🔮 Future Improvements

- [ ] Ticket cancellation / refund system
- [ ] Persistent storage (localStorage or backend DB)
- [ ] Fare calculation based on route distance
- [ ] User authentication (login / registration)
- [ ] PDF ticket download
- [ ] Admin dashboard with analytics
- [ ] Filter buses by date, origin, and destination
- [ ] Dark / light mode toggle

---

## 🧑‍💻 Author

**Geo Jose**  
Sree Narayana Gurukulam College of Engineering

---

## 📝 Note

This project was developed for academic learning purposes — applying OOP concepts in C++ and then translating that logic into a modern web application. Suggestions and contributions are always welcome!

---

<p align="center">Made with ❤️ by Geo Jose</p>
