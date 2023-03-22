const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");

const config = [
  {
    input: "lib/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [typescript(), resolve()],
  },
];

module.exports = config;
