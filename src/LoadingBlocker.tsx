import React from "react";
import "./LoadingBlocker.scss";

export function LoadingBlocker() {
  return (
    <div className="loading-blocker">
      <div className="loading-overlay" />
      <div className="loading-ring-box">
        <div className="loading-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}
