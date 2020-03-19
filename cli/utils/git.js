const git = require("download-git-repo");

const downloadRepo = (url, destination, cb) => {
  git(url, destination, cb);
};

module.exports = { downloadRepo };
