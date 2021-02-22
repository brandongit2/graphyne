import Graphy from "graphy";
import React from "react";
import ReactDOM from "react-dom";

export default function Index() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Graphy />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("react-root"));
