import React, { useEffect, useState } from "react";

const RowDetails = ({ row }) => {
  if (!row) {
    return (
      <div className="row-details-container">
        <div className="left-panel">
          <div className="row-detail-item">
            <p>Flood from </p>
            <div className="highlight-box">02-07-1967</div>
          </div>
          <div className="row-detail-item">
            <p>Caused by </p>
            <div className="highlight-normal">----</div>
          </div>
          <div className="row-detail-item">
            <p>Duration: </p>
            <div className="highlight-normal">---- {"  "} days</div>
          </div>
          <div className="row-detail-item">
            <p>Human Casualties: </p>
            <div className="highlight-normal">----</div>
          </div>
        </div>
        <div className="right-panel">
          <div className="row-detail-item">
            <p>Affected States </p>
            <div className="highlight-box">All over India</div>
          </div>
          <div className="row-detail-item">
            <p>Affected Districts </p>
            <div className="highlight-box">All over India</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row-details-container">
      <div className="left-panel">
        <div className="row-detail-item">
          <p>Flood on </p>
          <div className="highlight-box">{row.startDate}</div>
        </div>
        <div className="row-detail-item">
          <p>Caused by </p>
          <div className="highlight-line">{row.cause}</div>
        </div>
        <div className="row-detail-item">
          <p>Duration: </p>
          <div className="highlight-normal">
            {row.duration} {"  "} days
          </div>
        </div>
        <div className="row-detail-item">
          <p>Human Casualties: </p>
          <div className="highlight-normal">
            {row.humanFatality ? row.humanFatality : 0}
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className="row-detail-item">
          <p>Affected States </p>
          <div className="highlight-box">
            {row.states ? row.states : "No data available"}
          </div>
        </div>
        <div className="row-detail-item">
          <p>Affected Districts </p>
          <div className="highlight-box">
            {row.districts ? row.districts : "No data available"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RowDetails;
