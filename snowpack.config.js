/** @type {import("snowpack").SnowpackUserConfig} */

module.exports = {
  mount: {demo: "/", src: "/graphy"},
  alias: {
    "@app": "./demo",
    graphy: "./src",
  },
};
