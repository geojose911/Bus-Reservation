#include <iostream>
#include <string>
#include <vector>
#include <iomanip>
using namespace std;
// Number of seats in each bus
const int TOTAL_SEATS = 32;
// Base class to store bus route details
class BusRoute {
public:
 string busNo;
 string driver;
 string fromPlace;
 string toPlace;
 string arrivalTime;
 string departureTime;
 // Default constructor
 BusRoute() {}
 // Parameterized constructor
 BusRoute(string b, string d, string f, string t, string a, string dep)
 : busNo(b), driver(d), fromPlace(f), toPlace(t),
 arrivalTime(a), departureTime(dep) {}
};
// Derived Bus class that also manages seats
class Bus : public BusRoute {
private:
 // Array of 32 seats; empty string means available
 string seats[TOTAL_SEATS];
public:
 // Default constructor
 Bus() {
 for (int i = 0; i < TOTAL_SEATS; i++)
 seats[i] = ""; // initialize all seats as available
 }
 // Parameterized constructor
 Bus(string b, string d, string f, string t, string a, string dep)
 : BusRoute(b, d, f, t, a, dep) {
 for (int i = 0; i < TOTAL_SEATS; i++)
 seats[i] = ""; // initialize all seats as available
 }
 // Check if a given seat is already booked
 bool isSeatBooked(int seatNo) const {
 if (seatNo < 1 || seatNo > TOTAL_SEATS) return false;
 return !seats[seatNo - 1].empty();
 }
 // Try to book a seat; returns true if successful
 bool bookSeat(int seatNo, const string &name) {
 if (seatNo < 1 || seatNo > TOTAL_SEATS)
 return false; // invalid seat
 if (!seats[seatNo - 1].empty())
 return false; // already booked
 seats[seatNo - 1] = name;
 return true;
 }
 // Display all 32 seats with status
 void displaySeats() const {
 cout << "\nSeats for bus " << busNo << " (1–" << TOTAL_SEATS << "):\n";
 cout << string(40, '-') << "\n";
 for (int i = 0; i < TOTAL_SEATS; i++) {
 string pass = seats[i];
 if (pass.empty()) pass = "Available";
 cout << "Seat " << setw(2) << (i + 1) << ": " << pass << "\n";
 }
 }
 // Print brief info about this bus
 void printInfo() const {
 cout << "\nBus Details for " << busNo << ":\n";
 cout << string(40, '-') << "\n";
 cout << "Driver : " << driver << "\n";
 cout << "From : " << fromPlace << "\n";
 cout << "To : " << toPlace << "\n";
 cout << "Arrival : " << arrivalTime << "\n";
 cout << "Departure : " << departureTime << "\n";
 }
};
// Global collection of all buses (vector of Bus objects)
vector<Bus> buses;
// Utility function: find a bus by bus number; returns pointer or nullptr
Bus* findBus(const string &busNo) {
 for (Bus &b : buses) {
 if (b.busNo == busNo)
 return &b;
 }
 return nullptr;
}
// Function to create a new bus route
void createBusRoute() {
 string busNo, driver, fromPlace, toPlace, arrivalTime, departureTime;
 cout << "Enter bus number: ";
 cin >> busNo;
 // Check if bus already exists
 if (findBus(busNo) != nullptr) {
 cout << "Bus number already exists.\n";
 return;
 }
 cout << "Enter driver name: ";
 cin.ignore();
 getline(cin, driver);
 cout << "From: ";
 getline(cin, fromPlace);
 cout << "To: ";
 getline(cin, toPlace);
 cout << "Arrival time (HH:MM): ";
 getline(cin, arrivalTime);
 cout << "Departure time (HH:MM): ";
 getline(cin, departureTime);
 // Create a new Bus object and add to the bus list
 buses.push_back(Bus(busNo, driver, fromPlace, toPlace, arrivalTime, departureTime));
 cout << "Bus route '" << busNo << "' created.\n";
}
// Function to make a reservation on a bus
void makeReservation() {
 string busNo;
 cout << "Enter bus number: ";
 cin >> busNo;
 Bus* bus = findBus(busNo);
 if (!bus) {
 cout << "Bus not found.\n";
 return;
 }
 int seatNo;
 cout << "Enter seat number (1–32): ";
 if (!(cin >> seatNo)) {
 cout << "Invalid seat number.\n";
 cin.clear();
 cin.ignore(1000, '\n');
 return;
 }
 if (seatNo < 1 || seatNo > TOTAL_SEATS) {
 cout << "Seat must be between 1 and 32.\n";
 return;
 }
 if (bus->isSeatBooked(seatNo)) {
 cout << "Seat " << seatNo << " is already booked.\n";
 return;
 }
 string name;
 cout << "Enter passenger name: ";
 cin.ignore();
 getline(cin, name);
 if (bus->bookSeat(seatNo, name))
 cout << "Seat " << seatNo << " booked for " << name << ".\n";
 else
 cout << "Booking failed.\n";
}
// Function to display all seats of a given bus
void displaySeats() {
 string busNo;
 cout << "Enter bus number: ";
 cin >> busNo;
 Bus* bus = findBus(busNo);
 if (!bus) {
 cout << "Bus not found.\n";
 return;
 }
 bus->displaySeats();
}
// Function to show all buses in a table
void showAvailableBuses() {
 if (buses.empty()) {
 cout << "No buses available.\n";
 return;
 }
 cout << "\nAvailable buses:\n";
 cout << string(60, '-') << "\n";
 cout << left << setw(10) << "Bus No"
 << setw(15) << "Driver"
 << setw(10) << "From"
 << setw(10) << "To"
 << setw(8) << "Arrival"
 << setw(8) << "Departure" << "\n";
 cout << string(60, '-') << "\n";
 for (const Bus &b : buses) {
 cout << left << setw(10) << b.busNo
 << setw(15) << b.driver
 << setw(10) << b.fromPlace
 << setw(10) << b.toPlace
 << setw(8) << b.arrivalTime
 << setw(8) << b.departureTime << "\n";
 }
}
// Function to print detailed information of a bus
void printBusDetails() {
 string busNo;
 cout << "Enter bus number: ";
 cin >> busNo;
 Bus* bus = findBus(busNo);
 if (!bus) {
 cout << "Bus not found.\n";
 return;
 }
 bus->printInfo();
}
// Main menu function
void menu() {
 int choice;
 do {
 cout << "\n" << string(50, '=') << "\n";
 cout << " BUS RESERVATION SYSTEM\n";
 cout << string(50, '=') << "\n";
 cout << "1. Create bus route\n";
 cout << "2. Make reservation\n";
 cout << "3. Display seats\n";
 cout << "4. Show all buses\n";
 cout << "5. Print bus details\n";
 cout << "6. Exit\n";
 cout << "Enter choice (1–6): ";
 cin >> choice;
 switch (choice) {
 case 1: createBusRoute(); break;
 case 2: makeReservation(); break;
 case 3: displaySeats(); break;
 case 4: showAvailableBuses(); break;
 case 5: printBusDetails(); break;
 case 6: cout << "Goodbye!\n"; break;
 default: cout << "Invalid choice.\n";
 }
 } while (choice != 6);
}
// Main function
int main() {
 menu();
 return 0;
}