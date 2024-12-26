import { defineBuildConfig } from "unbuild";
import * as path from 'node:path';

export default defineBuildConfig({
  // If entries is not provided, will be automatically inferred from package.json
  entries: [
    "./src/index",
  ],

  // Change outDir, default is 'dist'
  outDir: "dist",
    alias: {
        'components': path.resolve(__dirname, 'src/components'),
        'const': path.resolve(__dirname, 'src/const'),
        'define': path.resolve(__dirname, 'src/define'),
        'handles': path.resolve(__dirname, 'src/handles'),
        'myHooks': path.resolve(__dirname, 'src/myHooks'),
        'utils': path.resolve(__dirname, 'src/utils'),
        'tricks': path.resolve(__dirname, 'src/tricks'),
        'TKSQuery': path.resolve(__dirname, 'src/TKSQuery'),
    },

  // Generates .d.ts declaration file
  declaration: true,
  externals: [
      'react',
      'react-dom'
  ],
  rollup: {
      emitCJS: true
  }
});
