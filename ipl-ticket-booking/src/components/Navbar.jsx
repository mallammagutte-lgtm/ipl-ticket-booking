import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 style={{ textAlign: 'center', color: 'white' }}>IPL Ticket Booking</h1>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/matches">Matches</Link>
        <Link to="/booking">Book Ticket</Link>
        <Link to="/history">Booking History</Link>
      </div>
    </nav>
  );
}
export default Navbar;