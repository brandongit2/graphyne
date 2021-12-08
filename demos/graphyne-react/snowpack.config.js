/** @type {import("snowpack").SnowpackUserConfig} */

module.exports = {
  mount: {src: "/"},
  alias: {
    "@app": "./src",
  },
  plugins: ["@snowpack/plugin-postcss"],
  buildOptions: {
    sourcemap: true,
  },
};
