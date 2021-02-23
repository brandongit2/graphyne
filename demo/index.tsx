import Graphy from "graphy";
import React from "react";
import ReactDOM from "react-dom";

export default function Index() {
  return (
    <div className="w-screen h-screen">
      <Graphy />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("react-root"));
