import React, {useRef} from "react";

import {useGraph} from "./hooks/useGraph";

interface GraphyProps {
  functions: string[];
}

export default function Graphy({functions}: GraphyProps) {
  const canvas = useRef(null);
  useGraph(canvas, functions);

  return <canvas ref={canvas} style={{width: "100%", height: "100%"}} />;
}
