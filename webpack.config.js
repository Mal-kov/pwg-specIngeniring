const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


module.exports = {

    entry:['./src/index.js'],
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            // new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin()
        ]
    },
    devServer: {
        contentBase: __dirname + '/dist'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin( {
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'product_list.html',
            template: 'src/product_list.html',
            chunks: ['product_list']
          }),
        new HtmlWebpackPlugin({
            filename: 'product_single.html',
            template: 'src/product_single.html',
            chunks: ['product_single']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CopyPlugin([
            { 
                from: './src/images', 
                to: 'images' 
            },
            
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules:[
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        outputPath: 'images'
                    }  
                }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                //include: path.resolve(__dirname, 'src/scss/fonts/'),
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                    } 
                }]
            }

        ]
    }
    

}