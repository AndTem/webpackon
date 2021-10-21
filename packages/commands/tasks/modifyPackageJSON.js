const fs = require('fs');

const modifyPackageJSON = () => {
  const {
    scripts,
    workspaces,
    browser,
    devDependencies,
    keywords = [],
    ...packageData
  } = JSON.parse(fs.readFileSync('./package.json'));

  fs.writeFileSync(
    './lib/package.json',
    JSON.stringify(
      {
        ...packageData,
        author: 'AndTem',
        license: 'MIT',
        repository: {
          type: 'git',
          url: 'git+https://github.com/AndTem/webpackon',
        },
        bugs: {
          url: 'https://github.com/AndTem/webpackon/issues',
        },
        keywords: [
          'webpack',
          'webpack 5',
          'webpack config',
          'webpack-config',
          'webpackon',
          ...keywords,
        ],
        main: './index.js',
        types: './index.d.ts',
      },
      null,
      2
    )
  );
};

module.exports = { modifyPackageJSON };
