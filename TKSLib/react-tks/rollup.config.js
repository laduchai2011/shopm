import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
// import alias from '@rollup/plugin-alias';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postcss()
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },

  // components
  {
    input: "src/components.ts",
    output: [
      {
        file: packageJson.exports["./components"].require, // Output CommonJS
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.exports["./components"].import, // Output ES Module
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postcss()
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/components.ts",
    output: [{ file: packageJson.exports["./components"].types }],
    plugins: [
      dts.default()
    ],
    external: [/\.css$/],
  },

  // handles
  {
    input: "src/handles.ts",
    output: [
      {
        file: packageJson.exports["./handles"].require, // Output CommonJS
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.exports["./handles"].import, // Output ES Module
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postcss()
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/handles.ts",
    output: [{ file: packageJson.exports["./handles"].types }],
    plugins: [
      dts.default()
    ],
    external: [/\.css$/],
  },

  // hooks
  {
    input: "src/hooks.ts",
    output: [
      {
        file: packageJson.exports["./hooks"].require, // Output CommonJS
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.exports["./hooks"].import, // Output ES Module
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postcss()
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/hooks.ts",
    output: [{ file: packageJson.exports["./hooks"].types }],
    plugins: [
      dts.default()
    ],
    external: [/\.css$/],
  }
];