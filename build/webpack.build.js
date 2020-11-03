const path = require("path")
const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
module.exports = merge(common, {
    mode: "production",
    devtool: 'none',
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name]-[contenthash].js"//把js文件打包到js文件中
    },
    plugins:[
    ]
})