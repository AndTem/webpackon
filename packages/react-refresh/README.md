<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='120' width='120'>
</p>
<p align="center">
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/use-react-refresh

Adds [react-refresh](https://www.npmjs.com/package/react-refresh) for development.

Supported loaders:
- [babel-loader](https://www.npmjs.com/package/babel-loader) (+ ts)
- [swc-loader](https://github.com/swc-project/swc-loader) (+ ts)

## Install
```shell
npm i @webpackon/use-react-refresh --save
```

```shell
yarn add @webpackon/use-react-refresh
```

## API

```ts
const { useReactRefresh } = require('@webpackon/use-react-refresh');

useReactRefresh(params: UseReactRefreshParams)(config: WebpackConfig)
```

### UseReactRefreshParams
```ts
type UseReactRefreshParams = {
  mode: 'development' | 'production';
  transformRuntime?: 'automatic' | 'classic';
};
```

- ```mode``` - webpack mode
- ```transformRuntime``` - [swc option](https://swc.rs/docs/configuration/compilation#jsctransformreactruntime) (default - ```automatic```)

## Example with babel and ts
Full examples are [here](https://github.com/AndTem/webpackon/tree/master/examples)

```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useTs } = require('@webpackon/use-ts');
const { useReactRefresh } = require('@webpackon/use-react-refresh');
const { useBabel } = require('@webpackon/use-babel');

module.exports = (_, { mode }) =>
  compose(
    useReactRefresh({ mode }),
    useBabel({ useTs: true }),
    useTs(),
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });

```

## Example with swc and ts

```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useTs } = require('@webpackon/use-ts');
const { useReactRefresh } = require('@webpackon/use-react-refresh');

module.exports = (_, { mode }) =>
  compose(
    useReactRefresh({ mode }),
    useTs(),
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    module: {
			rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript'
                }
              }
            }
          }
        }
      ]
    }
  });

```
