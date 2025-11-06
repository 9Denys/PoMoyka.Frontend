import React from "react";
import "./SendRequest.css";

export default function SendRequest() {
  return (
    <div className="worker-sendrequest">
      <h1 className="request-title">Send request</h1>

      <form className="request-form">
        <textarea
          className="request-textarea"
          placeholder="Write your message here..."
        ></textarea>

        <button type="button" className="request-btn">
          Send message
        </button>
      </form>
    </div>
  );
}
