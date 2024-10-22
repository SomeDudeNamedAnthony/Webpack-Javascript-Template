const Path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootDir = Path.join(__dirname, "..");
const sourceDir = Path.join(rootDir, "src");

const publicDir = Path.join(rootDir, "public");

const viewsDir = Path.join(publicDir, "views");
const stylesDir = Path.join(publicDir, "styles");
const scriptsDir = Path.join(publicDir, "scripts");

const assetsDir = Path.join(publicDir, "assets");
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
                test: /\.(js|jsx)$/,
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
                    from: publicDir,
                    to: "",
                    globOptions: {
                        ignore: [Path.join(viewsDir)],
                    },
                },
                {
                    from: viewsDir,
                    to: "[name][ext]",
                    globOptions: {
                        ignore: [Path.join(viewsDir, "index.html")],
                    },
                },
            ],
        }),
    ],
};
