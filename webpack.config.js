const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            //ts handler
            {
                test: /\.ts$/i,
                use: 'ts-loader'
            },
            //scss handler
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            //image copy
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('assets/img', '[name][ext]'),
                },
            },
            //svg
            {
                test: /\.svg$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('assets/svg', '[name][ext]'),
                },
            },
            //fonts copy inline
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('assets/fonts', '[name][ext]'),
                },
            },
            {
                test: /\.json$/,
                type: 'json'
            }
        ],
    },
    resolve: {
        extensions: ['.ts','.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../../async-race'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions:['ts']}),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
    return merge(baseConfig, envConfig);
};