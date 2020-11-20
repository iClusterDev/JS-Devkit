#!/usr/bin/env node

const program = require('commander');
const create = require('./lib/Create');
const notify = require('./lib/Notify');

program.version('1.0.0').description('DevKit CLI');

program
  .command('create <projectName>')
  .description('create project')
  .action(async (projectName) => {
    try {
      await create(projectName);
    } catch (error) {
      notify.failure(error.message);
    }
  });

program.parse(process.argv);
