import Graphy from "graphy";
import React from "react";
import ReactDOM from "react-dom";

export default function Index() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "stretch",
      }}
    >
      <Graphy />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("react-root"));
