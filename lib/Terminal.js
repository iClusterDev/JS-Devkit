const { isString } = require('typeis.js');
const clear = require('clear');
const fse = require('fs-extra');
const exe = require('child_process').exec;
const chalk = require('chalk');
const figlet = require('figlet');

class Terminal {
  static banner = () => console.log(chalk.yellow(figlet.textSync('Devkit', 'Chunky')));

  static clear = () => clear();

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
}

module.exports = Terminal;
