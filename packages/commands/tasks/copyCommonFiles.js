const path = require('path');

const copy = require('recursive-copy');

const copyCommonFiles = () => {
  copy(
    path.resolve(__dirname, '..', '..', '..', 'LICENSE'),
    './lib/LICENSE'
  ).catch((error) => {
    console.error(error);

    process.exit(1);
  });
};

module.exports = { copyCommonFiles };
