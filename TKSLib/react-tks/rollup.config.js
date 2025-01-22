import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import alias from '@rollup/plugin-alias';


const packageJson = require("./package.json");


const entries = [
  // { find: 'Router', replacement: './src/Router' },
  // { find: 'screen', replacement: './src/screen' },
  // { find: 'components', replacement: './src/components' },
  // { find: 'const', replacement: './src/const' },
  // { find: 'define', replacement: './src/define' },
  // { find: 'handles', replacement: './src/handles' },
  // { find: 'myHooks', replacement: './src/myHooks' },
  // { find: 'TKSQuery', replacement: './src/TKSQuery' },
  // { find: 'tricks', replacement: './src/tricks' },
  // { find: 'utils', replacement: './src/utils' }
  { find: 'src', replacement: './src' }
]
const customResolver = resolve({
  extensions: ['.ts', '.tsx', '.js', '.jsx',]
});

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
      postcss(),
      alias({
        entries: entries,
        customResolver
      }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types }],
    plugins: [
      dts.default(),
      typescript({ tsconfig: "./tsconfig.json" }),
      alias({
        entries: entries,
        customResolver
      }),
    ],
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
      postcss(),
      alias({
        entries: entries,
        customResolver
      }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/components.ts",
    output: [{ file: packageJson.exports["./components"].types }],
    plugins: [
      dts.default(),
      typescript({ tsconfig: "./tsconfig.json" }),
      alias({
        entries: entries,
        customResolver
      }),
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
      postcss(),
      alias({
        entries: entries,
        customResolver
      }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/handles.ts",
    output: [{ file: packageJson.exports["./handles"].types }],
    plugins: [
      dts.default(),
      typescript({ tsconfig: "./tsconfig.json" }),
      alias({
        entries: entries,
        customResolver
      }),
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
      postcss(),
      alias({
        entries: entries,
        customResolver
      }),
    ],
    external: ["react", "react-dom", 'src/myHooks/interface'],
  },
  {
    input: "src/hooks.ts",
    output: [{ file: packageJson.exports["./hooks"].types }],
    plugins: [
      dts.default(),
      typescript({ tsconfig: "./tsconfig.json" }),
      alias({
        entries: entries,
        customResolver
      }),
    ],
    external: [/\.css$/],
  },

  // utils
  {
    input: "src/utils.ts",
    output: [
      {
        file: packageJson.exports["./utils"].require, // Output CommonJS
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.exports["./utils"].import, // Output ES Module
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
      postcss(),
      alias({
        entries: entries,
        customResolver
      }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/utils.ts",
    output: [{ file: packageJson.exports["./utils"].types }],
    plugins: [
      dts.default(),
      typescript({ tsconfig: "./tsconfig.json" }),
      alias({
        entries: entries,
        customResolver
      }),
    ],
    external: [/\.css$/],
  }
];