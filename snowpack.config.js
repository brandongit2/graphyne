/** @type {import("snowpack").SnowpackUserConfig} */

module.exports = {
  mount: {demo: "/", src: "/graphy"},
  alias: {
    "@app": "./demo",
    graphy: "./src",
  },
  plugins: ["@snowpack/plugin-postcss"],
  buildOptions: {
    sourcemap: true,
  },
};
