import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import terser from '@rollup/plugin-terser';
import nodePolyfills from "rollup-plugin-polyfill-node";

export default [
  // ESM build
  // {
  //   input: 'src/browserInstance.ts', // Entry point for the ESM build
  //   output: {
  //     file: './bin/index.js', // Output file
  //     format: 'umd', // Universal Module Definition for browsers
  //     name: 'NoLagJS', // Global variable for browser UMD builds
  //     exports: 'named',
  //     sourcemap: true, // Generate sourcemap for debugging
  //   },
  //   plugins: [
  //     resolve(), // Resolves module dependencies
  //     json(),
  //     commonjs(), // Converts CommonJS modules to ES Modules
  //     typescript({ tsconfig: './tsconfig.json' }), // TypeScript support
  //     terser(), // Optional: Minify the code for production
  //   ],
  //   external: ['fs', 'path'], // Exclude Node.js built-in modules
  // },
  // {
  //   input: 'src/index.ts',
  //   output: {
  //     // file: './bin/index.js',
  //     dir: './bin',
  //     format: 'esm',
  //     sourcemap: true,
  //     exports: 'named',
  //     inlineDynamicImports: true
  //   },
  //   plugins: [
  //     // nodePolyfills(),
  //     resolve(),
  //     json(),
  //     commonjs(),
  //     typescript({ tsconfig: './tsconfig.json' }),
  //     terser(),
  //   ],
  //   external: ['fs', 'path'], // Exclude Node.js built-in modules
  // },
  // ESM build
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
  // ESM build
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
      terser(), // Optional: Minify the code for production,code
    ],
    external: ["fs", "path"], // Exclude Node.js built-in modules
  },
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
  // // Browser build
  // {
  //   input: 'src/index.ts',
  //   output: {
  //     file: './bin/browser.js',
  //     format: 'umd', // Universal Module Definition for browsers
  //     name: 'NoLagJS', // Global variable for browser UMD builds
  //     sourcemap: true,
  //   },
  //   plugins: [
  //     resolve({
  //       browser: true, // Resolve browser-compatible modules
  //     }),
  //     json(),
  //     commonjs(), // Convert CommonJS to ES modules
  //     typescript({ tsconfig: './tsconfig.json' }), // Compile TypeScript
  //     terser(), // Minify for production
  //   ],
  // },

  // // Node.js build
  // {
  //   input: 'src/node.ts',
  //   output: {
  //     file: './bin/node.js',
  //     format: 'cjs', // CommonJS for Node.js
  //     sourcemap: true,
  //   },
  //   plugins: [
  //     resolve(), // Resolve Node.js modules
  //     json(),
  //     commonjs(), // Convert CommonJS to ES modules
  //     typescript({ tsconfig: './tsconfig.json' }), // Compile TypeScript
  //     terser(), // Minify for production
  //   ],
  //   external: ['fs', 'path'], // Exclude Node.js built-in modules
  // },
];
