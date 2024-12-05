import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default [
  // ESM build
  {
    input: 'src/index.ts', // Entry point for the ESM build
    output: {
      file: './bin/index.js', // Output file
      format: 'umd', // Universal Module Definition for browsers
      name: 'NoLagJS', // Global variable for browser UMD builds
      sourcemap: true, // Generate sourcemap for debugging
    },
    plugins: [
      resolve(), // Resolves module dependencies
      json(),
      commonjs(), // Converts CommonJS modules to ES Modules
      typescript({ tsconfig: './tsconfig.json' }), // TypeScript support
      terser(), // Optional: Minify the code for production
    ],
  },
  // ESM build
  {
    input: 'src/index.ts', // Entry point for the ESM build
    output: {
      file: './bin/esm.js', // Output file
      format: 'esm', // ECMAScript Module format
      sourcemap: true, // Generate sourcemap for debugging
    },
    plugins: [
      resolve(), // Resolves module dependencies
      json(),
      commonjs(), // Converts CommonJS modules to ES Modules
      typescript({ tsconfig: './tsconfig.json' }), // TypeScript support
      terser(), // Optional: Minify the code for production
    ],
  },
  // Browser build
  {
    input: 'src/index.ts',
    output: {
      file: './bin/browser.js',
      format: 'umd', // Universal Module Definition for browsers
      name: 'NoLagJS', // Global variable for browser UMD builds
      sourcemap: true,
    },
    plugins: [
      resolve({
        browser: true, // Resolve browser-compatible modules
      }),
      json(),
      commonjs(), // Convert CommonJS to ES modules
      typescript({ tsconfig: './tsconfig.json' }), // Compile TypeScript
      terser(), // Minify for production
    ],
  },

  // Node.js build
  {
    input: 'src/node.ts',
    output: {
      file: './bin/node.js',
      format: 'cjs', // CommonJS for Node.js
      sourcemap: true,
    },
    plugins: [
      resolve(), // Resolve Node.js modules
      json(),
      commonjs(), // Convert CommonJS to ES modules
      typescript({ tsconfig: './tsconfig.json' }), // Compile TypeScript
      terser(), // Minify for production
    ],
    external: ['fs', 'path'], // Exclude Node.js built-in modules
  },
];
