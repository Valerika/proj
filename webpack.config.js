const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js',
    minChunks: 2
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
    filename: '[name].bundle.css',
        allChunks: true,
});

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: ['./app.js', './style.scss']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src'),
            use:['css-hot-loader'].concat(ExtractTextPlugin.extract({
                fallback: ['css-loader','sass-loader'],
                use: 'css-loader'
            }))
        }, {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015'] }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
        }),
        new webpack.HotModuleReplacementPlugin(),
        extractCommons,
        extractCSS
    ]
};

module.exports = config;