<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='80' width='80'>
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>
<p align="center">
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/use-dev-server

Enables dev-server and optimizes development mode.

Features:
- adds a cache for faster build in dev mode
- enable hot

## Install
```shell
npm i @webpackon/use-dev-server webpack webpack-dev-server webpack-cli --save
```

```shell
yarn add @webpackon/use-dev-server webpack webpack-dev-server webpack-cli
```

## API

```ts
const { useDevServer } = require('@webpackon/use-dev-server');

useDevServer(params: UseDevServerParams)(config: WebpackConfig)
```

### UseDevServerParams
```ts
export type UseDevServerParams = {
  mode: 'development' | 'production';
  open?: boolean;
  hot?: boolean;
  useLocalIp?: boolean;
  proxy?: Record<string, unknown>;
};
```

- mode - webpack mode

- open - [webpack option](https://webpack.js.org/configuration/dev-server/#devserveropen)

- hot - [webpack option](https://webpack.js.org/configuration/dev-server/#devserverhot)

- useLocalIp - launches dev-server on local ip

- proxy - [webpack option](https://webpack.js.org/configuration/dev-server/#devserverproxy)


## Example

```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useDevServer } = require('@webpackon/use-dev-server');

module.exports = (_, { mode }) =>
  compose(
    useDevServer({ mode })
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
```
