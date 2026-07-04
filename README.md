<p align="center">
  <img src="assets/logo.svg" alt="Bus Reservation System" width="700"/>
</p>

## About the Project

This is a simple Bus Reservation System developed in **C++** as a console application. The project was created to understand and apply Object-Oriented Programming (OOP) concepts such as classes, inheritance, arrays, vectors, and functions.

The system allows users to create bus routes, reserve seats, view available buses, and check seat availability through an easy-to-use menu.

---

## Features

- Create new bus routes
- Book seats for passengers
- View seat availability for each bus
- Display the list of available buses
- View complete details of a selected bus
- Prevent duplicate bus numbers
- Prevent booking an already reserved seat
- Basic input validation for seat numbers

---

## Technologies Used

- **Programming Language:** C++
- Standard C++ Libraries (`iostream`, `string`, `vector`, `iomanip`)
- Object-Oriented Programming (OOP)

---

## How It Works

When the program starts, a menu is displayed with different options.

Users can:

1. Add a new bus route by entering the bus number, driver name, source, destination, arrival time, and departure time.
2. Reserve a seat by selecting a bus and entering the passenger's name.
3. View all seats of a bus to see which seats are available and which are already booked.
4. Display the details of all available buses.
5. View detailed information about a particular bus.
6. Exit the program.

---

## Seat Management

Each bus has **32 seats**.

- Empty seats are shown as **Available**.
- Once a passenger books a seat, that seat is marked with the passenger's name.
- The program does not allow the same seat to be booked twice.

---

## Concepts Used

This project helped me understand and implement several C++ concepts, including:

- Classes and Objects
- Inheritance
- Constructors
- Arrays
- Vectors
- Functions
- Input validation
- Menu-driven programming

---

## Project Structure

```text
Bus-Reservation
│
├── assets/
│   └── logo.svg          # Logo for README
│
├── .gitattributes        
│
├── README.md             # Project documentation
│
└── reservation.cpp       # Main C++ source code
```

---

## Compiling and Running

Compile the program using g++:

```bash
g++ reservation.cpp -o reservation
```

Run the program:

Linux/macOS

```bash
./reservation
```

Windows

```bash
reservation.exe
```

---

## Future Improvements

Although this project is simple, there are many features that could be added in the future, such as:

- User login system
- Ticket cancellation
- Saving booking data to files
- Fare calculation
- Search buses by source and destination
- Database connectivity
- Online booking system
- Graphical User Interface (GUI)

---

## What I Learned

Building this project gave me practical experience with Object-Oriented Programming in C++. I also learned how to organize a program into multiple functions, manage data using vectors and arrays, and handle user input effectively. It was a good exercise in designing a simple real-world application using the concepts learned in class.

---

## Author

**Geo Jose**

Sree Narayana Gurukulam College of Engineering

---

## Note

This project was developed for learning purposes as part of my academic coursework. Suggestions and improvements are always welcome.
