<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='120' width='120'>
</p>
<p align="center">
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/use-transpile-modules

Features:
- forces all loaders to process the specified node_modules (suitable for monorepo)

## Install
```shell
npm i @webpackon/use-transpile-modules --save
```

```shell
yarn add @webpackon/use-transpile-modules
```

## API

```ts
const { useTranspileModules } = require('@webpackon/use-transpile-modules');

useTranspileModules(params: UseTranspileModulesParams)(config: WebpackConfig)
```

### UseTranspileModulesParams
```ts
export type UseTranspileModulesParams = {
  transpileModules: string[];
};
```

- transpileModules - list of node_modules, that need to transpile

## Example
Full example is [here](https://github.com/AndTem/webpackon/tree/master/examples/react-babel)

```webpack.config.js```
```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useTs } = require('@webpackon/use-ts');
const { useBabel } = require('@webpackon/use-babel');
const { useUrlImages } = require('@webpackon/use-url-images');
const { useTranspileModules } = require('@webpackon/use-transpile-modules');

module.exports = (_, { mode }) =>
  compose(
    useTranspileModules({ transpileModules: ['my-module'] }),
    useBabel({ useTs: true }),
    useTs(),
    useUrlImages({ mode })
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
```
