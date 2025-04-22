import replace from '@rollup/plugin-replace';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default [
  // Browser build
  {
    input: "src/browserInstance.ts", // Entry point for the ESM build
    output: {
      file: "./bin/browserInstance.js", // Output file
      format: "esm", // ECMAScript Module format
      sourcemap: true, // Generate sourcemap for debugging
    },
    plugins: [
      resolve(), // Resolves module dependencies
      json(),
      commonjs(), // Converts CommonJS modules to ES Modules
      typescript({ tsconfig: "./tsconfig.json" }), // TypeScript support
      terser(), // Optional: Minify the code for production
    ],
    external: ["fs", "path"], // Exclude Node.js built-in modules
  },
  // browser module build
  {
    input: "src/browserInstance.ts", // Entry point for the ESM build
    output: {
      file: "./bin/browserInstance.mjs", // Output file
      format: "esm", // ECMAScript Module format
      sourcemap: true, // Generate sourcemap for debugging
    },
    plugins: [
      replace({
        preventAssignment: true,
        __PLATFORM__: JSON.stringify('browser'),
      }),
      resolve(), // Resolves module dependencies
      json(),
      commonjs(), // Converts CommonJS modules to ES Modules
      typescript({ tsconfig: "./tsconfig.json" }), // TypeScript support
      terser(), // Optional: Minify the code for production,
    ],
    external: ["fs", "path"], // Exclude Node.js built-in modules
  },
  // CommonJS build
  {
    input: "src/index.ts", // Entry point for the ESM build
    output: {
      file: "./bin/index.cjs", // Output file
      format: "cjs", // ECMAScript Module format
      sourcemap: true, // Generate sourcemap for debugging
    },
    plugins: [
      resolve(), // Resolves module dependencies
      json(),
      commonjs(), // Converts CommonJS modules to ES Modules
      typescript({ tsconfig: "./tsconfig.json" }), // TypeScript support
      terser(), // Optional: Minify the code for production, code
    ],
    external: ["fs", "path"], // Exclude Node.js built-in modules
  },
  // module build
  {
    input: "src/index.ts", // Entry point for the ESM build
    output: {
      file: "./bin/index.mjs", // Output file
      format: "esm", // ECMAScript Module format
      sourcemap: true, // Generate sourcemap for debugging
    },
    plugins: [
      resolve(), // Resolves module dependencies
      json(),
      commonjs(), // Converts CommonJS modules to ES Modules
      typescript({ tsconfig: "./tsconfig.json" }), // TypeScript support
      terser(), // Optional: Minify the code for production,
    ],
    external: ["fs", "path"], // Exclude Node.js built-in modules
  },
];
