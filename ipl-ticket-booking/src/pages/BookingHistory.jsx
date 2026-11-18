
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setBookings(data);
    }

    setLoading(false);
  }

  async function deleteBooking(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Unable to delete booking: " + error.message);
      return;
    }

    setBookings((previousBookings) =>
      previousBookings.filter((booking) => booking.id !== id)
    );

    alert("Booking deleted successfully!");
  }

  return (
    <main className="history-page">
      <h1 style={{ textAlign: "center" }}>Booking History</h1>

      {loading && <p>Loading bookings...</p>}

      {error && <p>Unable to load bookings: {error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      <div className="matches-grid">
        {bookings.map((booking) => (
          <div className="match-card" key={booking.id}>
            <h2>
              {booking.team1 && booking.team2
                ? `${booking.team1} vs ${booking.team2}`
                : "Match details unavailable"}
            </h2>

            <p>Name: {booking.name}</p>
            <p>Match Date: {booking.match_date || "-"}</p>
            <p>Tickets: {booking.tickets}</p>
            <p>Stand: {booking.stand}</p>
            <p>Venue: {booking.venue}</p>

            <button
              onClick={() => deleteBooking(booking.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px 16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete Booking
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default BookingHistory;
