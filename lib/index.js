const path = require('path');
// cli
const fse = require('fs-extra');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const replace = require('replace-in-file');
const { isString } = require('typeis.js');
const exe = require('child_process').exec;

class Devkit {
  static clear = () => clear();

  static banner = () => console.log(chalk.yellow(figlet.textSync('Devkit', 'Chunky')));

  static chdir = (destPath) => {
    return new Promise((resolve, reject) => {
      if (fse.existsSync(destPath)) {
        process.chdir(destPath);
        resolve(true);
      } else {
        reject(new Error(`Error - cli.chdir: Unable to find ${destPath}`));
      }
    });
  };

  static run = (command = '') => {
    return new Promise((resolve, reject) => {
      if (isString(command) && command.length > 0) {
        exe(command, function (err) {
          if (err) {
            reject(new Error(`Error - cli.run: Failed to run "${command}"`));
          } else {
            resolve(true);
          }
        });
      }
    });
  };

  static setFiles = async (srcPath, destPath) => {
    if (!fse.pathExistsSync(srcPath)) throw new Error(`Source path does not exist!`);
    if (fse.pathExistsSync(destPath)) throw new Error(`The project ${path.basename(destPath)} already exists!`);
    try {
      await fse.copy(srcPath, destPath);
    } catch (err) {
      throw new Error(`Unable to copy the files in ${destPath}`);
    }
  };

  static setName = async (destPath, projectName) => {
    const files = ['package.json', 'README.md', 'src/index.html'];
    const target = '--project-name--';
    try {
      await replace({
        files: files.map((file) => {
          return path.resolve(`${destPath}/${file}`);
        }),
        from: target,
        to: projectName,
      });
    } catch (error) {
      throw new Error(`Unable to set name "${projectName}"`);
    }
  };
}

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

  Devkit.clear();
  Devkit.banner();
  await Devkit.setFiles(srcPath, destPath);
  await Devkit.setName(destPath, projectName);
  await Devkit.chdir(destPath);
  await Devkit.run('npm install');
};

module.exports = create;
