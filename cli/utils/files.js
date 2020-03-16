const fs = require("fs");
const path = require("path");
const log = require("./logger");
// const json = require("./json");
const git = require("download-git-repo");

const createDir = (dirPath) => {
  // think if should be better to use async variant
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    log.info(`new dir created: ${path.basename(dirPath)}"`);
  } catch (err) {
    log.error("There was an error: ", err);
  }
};

const createFile = (_path, content) => {
  // think if should be better to use async variant
  try {
    fs.writeFileSync(_path, content);
    log.info(`new file created: ${path.basename(_path)}"`);
  } catch (err) {
    log.error("There was an error when trying to create a file: ", err);
  }
};

const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

const directoryExists = (filePath) => {
  return fs.existsSync(filePath);
};

const downloadRepo = (url, destination, cb) => {
  git(url, destination, cb);
};

const editPackageData = (appName) => {
  try {
    let rawdata = fs.readFileSync(`./${appName}/package.json`);
    let package = JSON.parse(rawdata);
    package.name = appName;
    let data = JSON.stringify(package, null, 2);
    fs.writeFileSync(`./${appName}/package.json`, data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  createDir,
  createFile,
  downloadRepo,
  editPackageData
};
