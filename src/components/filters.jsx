import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "../styles.css";

const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const Filters = ({ states, districts_of_states, onSubmit, onReset }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtOptions, setDistrictOptions] = useState([]);

  const years = range(1960, 2024);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (selectedState) {
      const options = districts_of_states[selectedState.value].map(
        (district) => ({
          label: district,
          value: district,
        })
      );
      setDistrictOptions(options);
    } else {
      setDistrictOptions([]);
    }
  }, [selectedState, districts_of_states]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ startDate, endDate, selectedState, selectedDistrict });
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedState(null);
    setSelectedDistrict(null);
    setDistrictOptions([]);
    onReset();
  };

  return (
    <div className="filter-box">
      <form onSubmit={handleSubmit}>
        <div className="form-group date">
          <label>From: </label>
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>
                <select
                  value={new Date(date).getFullYear()}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[new Date(date).getMonth()]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a Date"
            className="datepicker-input"
          />
        </div>
        <div className="form-group date">
          <label>To:</label>
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>
                <select
                  value={new Date(date).getFullYear()}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[new Date(date).getMonth()]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a Date"
            className="datepicker-input"
          />
        </div>
        <div className="form-group select">
          <label>State:</label>
          <Select
            options={states}
            value={selectedState}
            onChange={setSelectedState}
            placeholder="Select State"
            classNamePrefix="Select"
          />
        </div>
        <div className="form-group select">
          <label>District:</label>
          <Select
            options={districtOptions}
            value={selectedDistrict}
            onChange={setSelectedDistrict}
            isDisabled={!selectedState}
            placeholder="Select District"
            classNamePrefix="Select"
          />
        </div>
        <div className="form-group button">
          <button className="form-button" type="submit">
            Submit
            <span className="transition"></span>
          </button>
        </div>
        <div className="form-group button">
          <button className="form-button" type="button" onClick={handleReset}>
            Reset
            <span className="transition"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
