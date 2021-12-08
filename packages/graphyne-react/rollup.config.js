import commonjs from "@rollup/plugin-commonjs";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.tsx",
  output: {
    file: "bundle.js",
    format: "es",
  },
  plugins: [
    typescript({allowSyntheticDefaultImports: true, jsx: "react"}),
    commonjs(),
    nodeResolve(),
  ],
};
