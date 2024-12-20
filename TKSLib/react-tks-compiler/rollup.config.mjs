import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.tsx',  // Adjust the entry point to your library's main file
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',  // CommonJS format
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',  // ES module format
      sourcemap: true,
    },
    // {
    //   file: 'dist/index.css', 
    //   format: 'esm',
    //   sourcemap: true,
    // },
  ],
  plugins: [
    commonjs(), // Handle CommonJS modules
    resolve(),  // This will help Rollup resolve modules from node_modules
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true
    }),
    postcss({
      // extract: true,  // Optional: Extracts CSS to a separate file
      minimize: true, // Optional: Minifies CSS
      inject: true,  // Nhúng CSS vào tệp JS
    })
  ],
  external: ['react', 'react-dom'],  // Make sure react and react-dom are treated as external
};