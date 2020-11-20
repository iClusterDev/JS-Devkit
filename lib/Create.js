const notify = require('./Notify');
const path = require('path');
const Files = require('./Files');
const Terminal = require('./Terminal');

const srcDir = () => {
  const SRC_DIR = path.resolve(`${__dirname}`);
  return path.join(SRC_DIR, '../', 'template');
};

const destDir = (projectName) => {
  const DEST_DIR = path.resolve(`${process.cwd()}`);
  return path.join(DEST_DIR, projectName);
};

const create = async (projectName) => {
  try {
    const srcPath = srcDir();
    const destPath = destDir(projectName);
    Terminal.clear();
    Terminal.banner();

    notify.progress(`creating files`);
    await Files.setFiles(srcPath, destPath);
    await Files.setName(destPath, projectName);
    notify.success(`project files created`);

    notify.progress(`installing dependencies`);
    await Terminal.chdir(destPath);
    await Terminal.run('npm install');
    notify.success(`project dependencies installed\n`);

    Terminal.clear();
    Terminal.banner();
    notify.info(`good to go!`);
  } catch (error) {
    notify.failure(error.message);
    process.exit();
  }
};

module.exports = create;
