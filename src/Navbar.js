import React from 'react';

const Navbar = ({ onDateChange }) => {
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    onDateChange(selectedDate);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Flight </div>
      <div className="navbar-search">
        <label htmlFor="date">Select Date:</label>
        <input type="date" id="date" onChange={handleDateChange} />
      </div>
    </nav>
  );
};

export default Navbar;