const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: { main: path.resolve(__dirname, "../src/index.js") },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,//node_modules依赖文件夹不编译，提高编译速度
                use: {
                    loader: 'babel-loader',
                    options: {
                        // cacheDirectory: true,//可以将babel编译的内容缓存到本地，加快babel编译速度
                        presets: [['@babel/preset-env', {
                            useBuiltIns: "usage",
                            corejs: 3
                        }]],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // only enable hot in development
                            hmr: process.env.NODE_ENV == 'development',
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true
                        }

                    },
                    // {
                    //     loader: "style-loader",
                    //     options: {
                    //         injectType: "singletonStyleTag" 
                    //         //默认情况下，每个css文件都会生成一个style标签，
                    //         //"singletonStyleTag"使得所有的css文件使用同一个注入的标签
                    //     }
                    // },
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // only enable hot in development
                            hmr: process.env.NODE_ENV == 'development',
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true
                        }

                    },
                    // {
                    //     loader: "style-loader",
                    //     options: {
                    //         injectType: "singletonStyleTag" //所有的css文件使用同一个注入的标签
                    //     }
                    // },
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,//低于指定的限制时，可以返回一个 base64,减少图片请求链接。单位B
                            name: "[name]-[hash].[ext]",//为你的文件配置自定义文件名模板
                            outputPath: "imgs/"//为你的文件配置自定义 output 输出目录
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === 'development' ? 'css/[name].css' : 'css/[name].[contenthash].css',// 直接引用【entry中配置】
            chunkFilename: process.env.NODE_ENV === 'development' ? 'css/[name].css' : 'css/[name].[contenthash].css'// 间接引用【其他地方引入使用的名字】
        }),
        new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "../public/index.html")
            }),
            new BundleAnalyzerPlugin({
                analyzerHost: '127.0.0.1',
                analyzerPort: 8889,
                openAnalyzer: true,
            }),//打包分析
    ],
    optimization: {
        splitChunks: {
            chunks: "all",//async 只支持对异步代码进行优化，all表示对同步和异步代码同时进行优化，initial表示只对同步代码块进行优化
            minSize: 20000,//分割的最小大小
            maxSize: 0,//生成块的最大大小（以字节为单位）如果生成块大于maxSize，webpack 会尝试继续分割
            minChunks: 1,//拆分前必须共享模块的最小块数
            maxAsyncRequests: 30,//按需加载时并行请求的最大数量
            maxInitialRequests: 30,//入口点的最大并行请求数
            automaticNameDelimiter: '~',
            enforceSizeThreshold: 50000,
            cacheGroups: {//缓存组，把所有的import 文件分别缓存到下面的两组中，合并输出
                vendors: { //匹配是否在node_modules中的库，如果是就分割文件
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10//分组的优先级，优先级大的分组优先
                },
                lib: {
                    test: path.resolve(__dirname, "../src/lib_modules"),
                    minSize: 1,
                    priority: -13//分组的优先级，优先级大的分组优先
                },
                default: {//默认情况下匹配default的配置
                    minChunks: 2,
                    minSize: 1,
                    priority: -20,
                    reuseExistingChunk: true//如果模块已经被打包，直接使用不打包
                }
            }
        }
    }
}