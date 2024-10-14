const { merge } = require("webpack-merge");
const Path = require("node:path");
const mainConfig = require(Path.join(__dirname, "webpack.common.js"));

const config = {
	mode: "development",
	stats: "errors-warnings",
	devtool: "source-map",
	devServer: {
		open: false,
		devMiddleware: {
			writeToDisk: true,
		},
	},
};

module.exports = merge(mainConfig, config);
