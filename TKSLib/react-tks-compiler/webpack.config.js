const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const inputArr = [
    'index',
    'components',
    'handles',
    'hooks'
]
  
const input = inputArr[0];

module.exports = {
    mode: 'development', // Set to 'development' for development (production) builds
    entry: `./src/${input}.ts`, // Your component's entry point
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${input}.js`, // The output bundle
        library: 'react-tks', // The name of your component
        libraryTarget: 'umd', // Universal Module Definition for compatibility
        umdNamedDefine: true, // Optional: names the UMD module
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.d.ts'], // Resolve these extensions
        // alias: {
        //     '@define': path.resolve(__dirname, 'dist/define'), // Example alias
        // }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, // Transpile both .ts and .tsx files
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
                resolve: {
                    fullySpecified: false,
                }
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
        // 'react-dom/client': 'react-dom/client'
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],
    devServer: {
        hot: true,
    },
};