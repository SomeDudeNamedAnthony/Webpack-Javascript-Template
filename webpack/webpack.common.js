const Path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootDir = Path.join(__dirname, "..");
const sourceDir = Path.join(rootDir, "src");
const viewsDir = Path.join(sourceDir, "views");
const stylesDir = Path.join(sourceDir, "styles");
const assetsDir = Path.join(sourceDir, "assets");
const distDir = Path.join(rootDir, "dist");

const appName = "My Application";

module.exports = {
    entry: {
        app: Path.join(sourceDir, "index.js"),
    },
    output: {
        path: Path.resolve(distDir),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        clean: true,
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    filename: "[name].js",
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            appName: appName,
            template: Path.join(viewsDir, "index.html"),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: Path.join(viewsDir, "*.html"),
                    to: "[name].html",
                    globOptions: {
                        ignore: [Path.join(viewsDir, "index.html")],
                    },
                },
                {
                    from: Path.join(stylesDir, "*.css"),
                    to: "[name].css",
                },
                {
                    from: Path.join(assetsDir),
                    to: "",
                },
            ],
        }),
    ],
};
