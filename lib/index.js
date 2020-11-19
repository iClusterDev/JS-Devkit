const path = require('path');
const Terminal = require('./Terminal');
const Files = require('./Files');

const srcDir = () => {
  const SRC_DIR = path.resolve(`${__dirname}`);
  return path.join(SRC_DIR, '../', 'template');
};

const destDir = (projectName) => {
  const DEST_DIR = path.resolve(`${process.cwd()}`);
  return path.join(DEST_DIR, projectName);
};

const create = async (projectName) => {
  const srcPath = srcDir();
  const destPath = destDir(projectName);

  Terminal.clear();
  Terminal.banner();
  await Files.setFiles(srcPath, destPath);
  await Files.setName(destPath, projectName);
  await Terminal.chdir(destPath);
  await Terminal.run('npm install');
};

module.exports = create;
