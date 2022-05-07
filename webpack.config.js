const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        // loader: "style-loader",
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                            },
                        },
                    },
                    {
                        loader: "less-loader",
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.worker\.js$/,
                use: {loader: "worker-loader"},
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "MetaQuotes",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "data",
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    optimization: {
        moduleIds: "deterministic",
        usedExports: true,
    },
}
