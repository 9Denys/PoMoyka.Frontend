import React, { useEffect, useState } from "react";
import "./Request.css";
import {
  getAllStatements,
  getStatementById,
} from "../../api/statementApi";

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRequests = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAllStatements();
      setRequests(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleRowClick = async (statementId, currentStatus) => {
  
    if (!statementId || currentStatus === "read") return;

    try {
      const updated = await getStatementById(statementId);

      setRequests((prev) =>
        prev.map((req) =>
          req.statementId === statementId
            ? { ...req, status: updated.status }
            : req
        )
      );
    } catch (err) {
      console.error("UPDATE ERROR:", err);
    }
  };

  return (
    <div className="admin-request">
      <h2 className="request-title">Requests from workers</h2>

      {error && <p className="request-error">{error}</p>}

      <div className="request-table">
        <div className="request-header">
          <span className="col-name">Name</span>
          <span className="col-message">Message</span>
          <span className="col-status">Status</span>
        </div>

        {loading && (
          <div className="request-row-info">Loading...</div>
        )}

        {!loading && requests.length === 0 && (
          <div className="request-row-info">No requests</div>
        )}

        {!loading &&
          requests.map((req) => (
            <div
              key={req.statementId}
              className={`request-row ${
                req.status === "unread" ? "request-row-unread" : ""
              }`}
              onClick={() =>
                handleRowClick(req.statementId, req.status)
              }
            >
              <span className="col-name">{req.fullName}</span>
              <span className="col-message">{req.message}</span>
              <span
                className={`col-status ${
                  req.status === "unread"
                    ? "status-unread"
                    : "status-read"
                }`}
              >
                {req.status}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
