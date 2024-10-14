const { merge } = require("webpack-merge");
const Path = require("node:path");
const mainConfig = require(Path.join(__dirname, "webpack.common.js"));
const WebpackObfuscator = require("webpack-obfuscator");

const config = {
	mode: "production",
	stats: "errors-warnings",
	output: {
		filename: "[name].min.js",
		chunkFilename: "[name].min.chunk.js",
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					filename: "[name].min.js",
				},
			},
		},
	},
	plugins: [
		new WebpackObfuscator({
			rotateStringArray: true,
			stringArray: true,
			stringArrayThreshold: 0.75,
		}),
	],
};

module.exports = merge(mainConfig, config);
