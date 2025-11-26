import React, { useState } from "react";
import "./Reports.css";
import {
  getTopCenters,
  downloadTopCentersPdf,
} from "../../api/statisticsApi";

export default function Reports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [centers, setCenters] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCash, setTotalCash] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");

    if (!fromDate || !toDate) {
      setError("Please select both dates");
      return;
    }

    if (fromDate > toDate) {
      setError("Start date cannot be later than end date");
      return;
    }

    setLoading(true);

    try {
      const data = await getTopCenters({ from: fromDate, to: toDate });
      console.log("TOP CENTERS:", data);

      const list = Array.isArray(data) ? data : data.topCenters || data.centers || [];

      setCenters(list);

      const sumQuantity = list.reduce(
        (acc, item) => acc + (item.quantity || item.totalQuantity || 0),
        0
      );

      const sumCash = list.reduce(
        (acc, item) => acc + (item.totalCash || item.totalAmount || 0),
        0
      );

      setTotalQuantity(sumQuantity);
      setTotalCash(sumCash);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  const handleFinancialReports = async () => {
    setError("");

    if (!fromDate || !toDate) {
      setError("Please select both dates");
      return;
    }

    if (fromDate > toDate) {
      setError("Start date cannot be later than end date");
      return;
    }

    setPdfLoading(true);

    try {
      await downloadTopCentersPdf({ from: fromDate, to: toDate });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to download PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="admin-reports">
      <div className="reports-left">
        <h2 className="reports-title">Top-selling center</h2>

        {error && <p className="reports-error">{error}</p>}

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
              {loading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : centers.length === 0 ? (
                <tr>
                  <td colSpan="3">No data</td>
                </tr>
              ) : (
                centers.map((center, index) => (
                  <tr key={center.centerId || center.id || index}>
                    <td>№{index + 1}</td>
                    <td>{center.centerName || center.name || "Unknown"}</td>
                    <td>
                      {center.quantity ??
                        center.totalQuantity ??
                        0}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <table className="sales-table">
            <thead>
              <tr>
                <th colSpan="2">Total sales volume</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total sales</td>
                <td>{totalQuantity}</td>
              </tr>
              <tr>
                <td>Total cash</td>
                <td>{totalCash}</td>
              </tr>
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

        <button className="check-btn" onClick={handleCheck} disabled={loading}>
          {loading ? "Loading..." : "Check"}
        </button>

        <button
          className="financial-btn"
          onClick={handleFinancialReports}
          disabled={pdfLoading}
        >
          {pdfLoading ? "Generating PDF..." : "Financial Reports"}
        </button>
      </div>
    </div>
  );
}
