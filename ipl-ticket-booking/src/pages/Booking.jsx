
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabase";

function Booking() {
  const location = useLocation();
  const selectedMatch = location.state?.match;

  const [name, setName] = useState("");
  const [tickets, setTickets] = useState("");
  const [stand, setStand] = useState("");
  const [venue, setVenue] = useState(selectedMatch?.venue || "");
  const [loading, setLoading] = useState(false);

  const ticketPrices = {
    "General Stand": 500,
    "VIP Stand": 2000,
  };

  const totalAmount =
    (ticketPrices[stand] || 0) * (Number(tickets) || 0);

  async function handleBooking() {
    if (!name.trim() || !tickets || !stand || !venue) {
      alert("Please fill all the details");
      return;
    }

    if (!Number.isInteger(Number(tickets)) || Number(tickets) < 1) {
      alert("Please enter a valid number of tickets");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          name: name.trim(),
          tickets: Number(tickets),
          stand,
          venue,
          team1: selectedMatch?.team1 ?? null,
          team2: selectedMatch?.team2 ?? null,
          match_date: selectedMatch?.date ?? null,
        },
      ]);

    setLoading(false);

    if (error) {
      alert("Booking failed: " + error.message);
      return;
    }

    alert(
      "Ticket booked successfully!\nTotal Amount: ₹" +
        totalAmount
    );

    setName("");
    setTickets("");
    setStand("");
    setVenue("");
  }

  return (
    <main className="booking-page">
      <h1 style={{ textAlign: "center" }}>Book Your Ticket</h1>

      {selectedMatch && (
        <section className="booking-details">
          <h3>Selected Match</h3>
          <p>Match: {selectedMatch.team1} vs {selectedMatch.team2}</p>
          <p>Date: {selectedMatch.date}</p>
          <p>Venue: {selectedMatch.venue}</p>
        </section>
      )}

      <div className="booking-form">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label>Number of Tickets</label>
        <input
          type="number"
          min="1"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
          placeholder="Enter number of tickets"
        />

        <label>Select Stand</label>
        <select
          value={stand}
          onChange={(e) => setStand(e.target.value)}
        >
          <option value="">-- Select Stand --</option>
          <option value="General Stand">General Stand - ₹500</option>
          <option value="VIP Stand">VIP Stand - ₹2,000</option>
        </select>

        <label>Select Venue</label>
        <select
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        >
          <option value="">-- Select Venue --</option>
          <option value="M. Chinnaswamy Stadium, Bengaluru">
            M. Chinnaswamy Stadium, Bengaluru
          </option>
          <option value="Wankhede Stadium, Mumbai">
            Wankhede Stadium, Mumbai
          </option>
        </select>

        <h3>Ticket Price: ₹{ticketPrices[stand] || 0}</h3>
        <h2>Total Amount: ₹{totalAmount}</h2>

        <button onClick={handleBooking} disabled={loading}>
          {loading ? "Booking..." : "Book Ticket"}
        </button>
      </div>
    </main>
  );
}

export default Booking;
