<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='120' width='120'>
</p>
<p align="center">
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/use-swc

Features:
- adds babel support
- simple transpiling of modules

## Install
```shell
npm i @webpackon/use-swc --save
```

```shell
yarn add @webpackon/use-swc
```

## API

```ts
const { useSwc } = require('@webpackon/use-swc');

useSwc(params?: UseSwcParams)(config: WebpackConfig)
```

### UseSwcParams
```ts
export type UseSwcParams = {
  transpileModules?: string[];
  useTs?: boolean;
  loaderParams?: {
    options?: Record<string, any>;
  };
};
```

 - transpileModules
```ts
useSwc({
  transpileModules: ['lodash-es', 'antd']
})
```

- useTs - enables ts support for swc-loader

- loaderParams.options - [swc-loader options](https://www.npmjs.com/package/swc-loader)

## TS example
Full examples are [here](https://github.com/AndTem/webpackon/tree/master/examples)

```webpack.config.js```
```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useTs } = require('@webpackon/use-ts');
const { useSwc } = require('@webpackon/use-swc');

module.exports = (_, { mode }) =>
  compose(
    useSwc({ useTs: true, transpileModules: ['my-module'] }),
    useTs(),
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
```

```.swcrc```
```json
{
  "env": {
    "mode": "usage",
    "coreJs": 3
  },
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true
    },
    "transform": {
      "react": { "runtime": "automatic" }
    }
  }
}
```
