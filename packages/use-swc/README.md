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

- useTs - enables ts support

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

```babel.config.js```
```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    [
			"@babel/preset-typescript",
      {
        "isTSX": true,
        "allExtensions": true
      }
		],
  ]
}
```

## JS example

```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useSwc } = require('@webpackon/use-swc');

module.exports = (_, { mode }) =>
  compose(
    useSwc(),
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
```

```babel.config.js```
```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
}
```
