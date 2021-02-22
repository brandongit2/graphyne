import Graphy from "graphy";
import React from "react";
import ReactDOM from "react-dom";

export default function Index() {
  return (
    <p>
      <Graphy />
    </p>
  );
}

ReactDOM.render(<Index />, document.getElementById("react-root"));
