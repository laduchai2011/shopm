const path = require('path');

module.exports = {
    mode: 'production', // Set to 'development' for development builds
    entry: './src/index.ts', // Your component's entry point
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js', // The output bundle
        library: 'react-tks', // The name of your component
        libraryTarget: 'umd', // Universal Module Definition for compatibility
        umdNamedDefine: true, // Optional: names the UMD module
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'], // Resolve these extensions
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, // Transpile both .ts and .tsx files
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
              test: /\.css$/, // Transpile both .ts and .tsx files
              use: ["style-loader", "css-loader"]
            }
        ],
    },
    externals: {
        react: 'react', // Exclude React from the bundle
        'react-dom': 'react-dom', // Exclude ReactDOM from the bundle
    },
};