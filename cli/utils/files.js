const fs = require("fs");
const path = require("path");
const log = require("./logger");

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

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  createDir,
  createFile
};
