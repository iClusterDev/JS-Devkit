#!/usr/bin/env node

const program = require('commander');
const create = require('../lib/index');

program.version('1.0.0').description('DevKit CLI');

program
  .command('create <projectName>')
  .description('create project')
  .action(async (projectName) => {
    await create(projectName);
  });

program.parse(process.argv);
