#!/usr/bin/env node

const { copyCommonFiles } = require('./tasks/copyCommonFiles');
const { modifyPackageJSON } = require('./tasks/modifyPackageJSON');

const [, , task] = process.argv;

switch (task) {
  case 'copyCommonFiles':
    copyCommonFiles();
    break;
  case 'modifyPackageJSON':
    modifyPackageJSON();
    break;
  default:
    console.error('Task not found');
    process.exit(1);
    break;
}
