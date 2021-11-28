var fs = require("fs-extra");
var path = require("path");

var options = {
  marked: require("marked")
};

var datapath = "src/data";
var files = fs.readdirSync(datapath);
files.forEach((file) => {
  var data = fs.readFileSync(path.join(__dirname, datapath, file));
  Object.assign(options, JSON.parse(data));
});

if (process.env.env.trim() == "DEV") {
  fs.copy("src/assets", "dev/assets");
} else {
  fs.copy("src/assets", "dist/assets");
}

module.exports = options;