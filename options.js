var fs = require("fs-extra");
var path = require("path");
var sass = require("sass");

var options = {
  marked: require("marked")
};

var assetpath = "src/assets",
  datapath = "src/data",
  sasspath = "src/sass",
  devpath = "dev",
  publicpath = "docs";

if (fs.pathExistsSync(path.join(__dirname, devpath))) {
  fs.emptyDirSync(path.join(__dirname, devpath));
}
if (fs.pathExistsSync(path.join(__dirname, publicpath))) {
  fs.emptyDirSync(path.join(__dirname, publicpath));
}

var datafiles = fs.readdirSync(datapath);
datafiles.forEach((file) => {
  var data = fs.readFileSync(path.join(__dirname, datapath, file));
  Object.assign(options, JSON.parse(data));
});

var sassfiles = fs.readdirSync(sasspath);
sassfiles.forEach((file) => {
  if (path.extname(file) != ".scss") return;
  let result = sass.compile(path.join(__dirname, sasspath, file));

  if (process.env.env.trim() == "DEV") {
    fs.mkdirpSync(path.join(__dirname, devpath, "assets", "css"))
    fs.writeFileSync(path.join(__dirname, devpath, "assets", "css", path.parse(file).name + ".css"), result.css);
  } else {
    fs.mkdirpSync(path.join(__dirname, publicpath, "assets", "css"))
    fs.writeFileSync(path.join(__dirname, publicpath, "assets", "css", path.parse(file).name + ".css"), result.css);
  }
});

if (process.env.env.trim() == "DEV") {
  fs.copy(path.join("src", "assets"), path.join(devpath, "assets"));
} else {
  fs.copy(path.join("src", "assets"), path.join(publicpath, "assets"));
}

module.exports = options;
