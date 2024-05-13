import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FlightFilter = ({
  startLocation,
  endLocation,
  startDate,
  endDate,
  flightClass,
  onFilterChange,
  onFilterApply,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate ? new Date(startDate) : null);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate ? new Date(endDate) : null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    onFilterChange("startDate", date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    onFilterChange("endDate", date);
  };

  return (
    <div className="filter-container p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label
            htmlFor="startLocation"
            className="block text-sm font-medium text-gray-700"
          >
            Start Location
          </label>
          <input
            type="text"
            id="startLocation"
            placeholder="Start Location"
            value={startLocation}
            onChange={(e) => onFilterChange("startLocation", e.target.value)}
            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="endLocation"
            className="block text-sm font-medium text-gray-700"
          >
            End Location
          </label>
          <input
            type="text"
            id="endLocation"
            placeholder="End Location"
            value={endLocation}
            onChange={(e) => onFilterChange("endLocation", e.target.value)}
            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <DatePicker 
            id="startDate"
            selected={selectedStartDate}
            onChange={handleStartDateChange}
            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <DatePicker 
            id="endDate"
            selected={selectedEndDate}
            onChange={handleEndDateChange}
            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="flightClass"
            className="block text-sm font-medium text-gray-700"
          >
            Flight Class
          </label>
          <input
            type="text"
            id="flightClass"
            placeholder="Flight Class"
            value={flightClass}
            onChange={(e) => onFilterChange("flightClass", e.target.value)}
            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={onFilterApply}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default FlightFilter;