const path = require("path");
const zl = require("zip-lib");

const distDir = path.join(__dirname, "dist");
const archPath = path.join(distDir, "bundle.zip");

zl.archiveFolder(distDir, archPath).then(
    function () {
        console.log("We successfully packaged your application.");
    },
    function (err) {
        console.error(`We couldn't bundle your application because of an issue.\n${err}`);
    },
);
