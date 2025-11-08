import React, { useState } from "react";
import "./Reports.css";

export default function Reports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleCheck = () => {
    console.log("Check clicked", { fromDate, toDate });
  };

  const handleFinancialReports = () => {
    console.log("Financial Reports clicked");
  };

  return (
    <div className="admin-reports">
      <div className="reports-left">
        <h2 className="reports-title">Top-selling center</h2>

        <div className="reports-content">
          <table className="centers-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Name Center</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>№1</td><td>Pomoyka1</td><td>3</td></tr>
              <tr><td>№2</td><td>Pomoyka2</td><td>5</td></tr>
              <tr><td>№3</td><td>Pomoyka3</td><td>6</td></tr>
              <tr><td>№4</td><td>Pomoyka4</td><td>10</td></tr>
              <tr><td>№5</td><td>Pomoyka5</td><td>13</td></tr>
            </tbody>
          </table>

          <table className="sales-table">
            <thead>
              <tr><th colSpan="2">Total sales volume</th></tr>
            </thead>
            <tbody>
              <tr><td>Total sales</td><td>37</td></tr>
              <tr><td>Total cash</td><td>2500</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="reports-filter">
        <h3>Date range</h3>
        <div className="filter-group">
          <label>From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button className="check-btn" onClick={handleCheck}>Check</button>
        <button className="financial-btn" onClick={handleFinancialReports}>
          Financial Reports
        </button>
      </div>
    </div>
  );
}
