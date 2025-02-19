import React from "react";
import { useLocation } from "react-router-dom";
import ShowRecord from "../Components/ShowRecord";
import ShowCallSummary from "../Components/ShowCallSummary";
import "../Styles/SearchRecord.css";

const ShowDetails = () => {
  const location = useLocation();
  const { id } = location.state || {};

  return (
    <div className="ShowDetails-container">
      <div className="ShowRecord-container">
        <ShowRecord id={id} />
      </div>
      <div className="ShowCallSummary-container">
        <ShowCallSummary id={id} />
      </div>
    </div>
  );
};

export default ShowDetails;
