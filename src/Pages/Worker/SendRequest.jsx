import React, { useState } from "react";
import "./SendRequest.css";
import { createStatement } from "../../api/statementApi";

export default function SendRequest() {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await createStatement({
        topic: topic.trim() || "Request from worker",
        message: message.trim(),
      });

      setSuccess("Your request has been sent");
      setMessage("");
      setTopic("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="worker-sendrequest">
      <h1 className="request-title">Send request</h1>

      <form className="request-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="request-input"
          placeholder="Topic (optional)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={loading}
        />

        <textarea
          className="request-textarea"
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        ></textarea>

        {error && <p className="request-error">{error}</p>}
        {success && <p className="request-success">{success}</p>}

        <button
          type="submit"
          className="request-btn"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}
