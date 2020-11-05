const path = require("path")
const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const {HashedModuleIdsPlugin} = require('webpack');
module.exports = merge(common, {
    mode: "production",
    devtool: 'none',
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name]-[contenthash].js"//把js文件打包到js文件中
    },
    plugins: [
        new CompressionPlugin(),
        new HashedModuleIdsPlugin()
    ],
    optimization: {
        runtimeChunk: 'single',//把映射清单提取出来
        minimizer: [new OptimizeCSSAssetsPlugin({}),new TerserJSPlugin({})],//css js压缩
    }
})