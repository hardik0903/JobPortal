import React from "react";
import "../styles/Advertisement.css";
import { useState } from "react";
import Application from "./Application";
// import choice from "../resources/choice.png";

function Advertisement(props) {
  const [showDescription, setShowDescription] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleShowDescription = () => {
    setShowDescription(!showDescription);
    setIsActive(true);
  };

  const toggleElements = () => {
    setShowDescription(!showDescription);
    setShowApplication(!showApplication);
  };

  const closeEverything = () => {
    setShowDescription(false);
    setShowApplication(false);
    setIsActive(false);
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div className={`paperBackground ${isActive ? "large" : ""}`}>
      <div className="advertisement">
        <h2>
          {props.contract} {props.contract.length > 8 ? "" : "offer"}
        </h2>
        {/* {isActive && <div className = "image-container"><img src={choice} alt="This one marker" /></div>} */}
        <p>
          Company in {props.location} called {props.companyName} is looking for{" "}
          <b className={isActive ? "title" : ""}>{props.title}</b>.
        </p>
        <div className="button-container">
          {showDescription || showApplication ? (
            <button onClick={closeEverything}>Close</button>
          ) : (
            <button onClick={toggleShowDescription}>Learn More</button>
          )}
        </div>
        <div className={`transition-container ${showDescription ? 'active' : ''}`}>
          {showDescription && (
            <div className="description">
              <h2>Description</h2>
              <p>{props.description}</p>
              <p>
                <b>Salary:</b> {props.salary}₹
              </p>
              <p>
                <b>Date of post:</b> {formatDate(props.date)}
              </p>
              <button onClick={toggleElements} className="apply-button">
                Apply
              </button>
            </div>
          )}
        </div>
        <div className={`transition-container ${showApplication ? 'active' : ''}`}>
          {showApplication && (
            <div>
              <Application userData={props.userData} adID={props.adID} />
              <button onClick={toggleElements} className="apply-button">
                Description
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Advertisement;
