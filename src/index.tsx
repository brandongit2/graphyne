import React, {useEffect, useRef} from "react";

import {useGraph} from "./hooks/useGraph";

export default function Graphy() {
  const canvas = useRef(null);

  useGraph(canvas);

  return <canvas ref={canvas} className="w-full h-full" />;
}
