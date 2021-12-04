<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='120' width='120'>
</p>
<p align="center">
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>
# @webpackon/use-babel

Features:
- adds babel support
- simple transpiling of modules

## Install
```shell
npm i @webpackon/use-babel --save
```

```shell
yarn add @webpackon/use-babel
```

## API

```ts
const { useBabel } = require('@webpackon/use-babel');

useBabel(params?: UseBabelParams)(config: WebpackConfig)
```

### UseBabelParams
```ts
export type UseBabelParams = {
  transpileModules?: string[];
  useTs?: boolean;
  loaderParams?: {
    options?: Record<string, any>;
  };
};
```

 - transpileModules
```ts
useBabel({
  transpileModules: ['lodash-es', 'antd']
})
```

- useTs - enables ts support

- loaderParams.options - [babel-loader options](https://www.npmjs.com/package/babel-loader#Options)

## TS example
Full example is [here](https://github.com/AndTem/webpackon/tree/master/examples/react-babel)

```webpack.config.js```
```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useTs } = require('@webpackon/use-ts');
const { useBabel } = require('@webpackon/use-babel');

module.exports = (_, { mode }) =>
  compose(
    useBabel({ useTs: true, transpileModules: ['my-module'] }),
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
const { useBabel } = require('@webpackon/use-babel');

module.exports = (_, { mode }) =>
  compose(
    useBabel(),
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
