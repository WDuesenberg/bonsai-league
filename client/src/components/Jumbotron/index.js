import React from "react";
import "./style.scss";

function Jumbotron({ children }) {
  return (
    <div
      // style={{ height: 240, clear: "both", paddingTop: 40, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
