import {graphyne} from "graphyne";
import React, {useEffect, useRef} from "react";

export function Graphyne() {
  const canvas = useRef(null);

  useEffect(() => {
    graphyne(canvas.current);
  }, [canvas]);

  return (
    <div>
      <canvas ref={canvas} />
    </div>
  );
}
