import {Graphyne} from "graphyne-react";
import React, {useState} from "react";
import ReactDOM from "react-dom";

import FunctionList from "./FunctionList";

const styles = {
  graphyContainer: "w-screen h-screen absolute z-n10",
};

function Index() {
  const [functions, setFunctions] = useState<{[key: string]: string}>({});

  return (
    <div>
      <div className={styles.graphyContainer}>
        <Graphyne />
      </div>
      <FunctionList functions={functions} setFunctions={setFunctions} />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("react-root"));

if ((import.meta as any).hot) {
  (import.meta as any).hot.accept();
}
