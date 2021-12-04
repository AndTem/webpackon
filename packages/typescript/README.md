<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='120' width='120'>
</p>
<p align="center">
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/use-ts

Features:
- adds typescript extensions
- synchronization tsconfig paths with webpack aliases

## Install
```shell
npm i @webpackon/use-ts --save
```

```shell
yarn add @webpackon/use-ts
```

## API

```ts
const { useTs } = require('@webpackon/use-ts');

useTs()(config: WebpackConfig)
```

## Example
Full example is [here](https://github.com/AndTem/webpackon/tree/master/examples/react-config)

```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useTs } = require('@webpackon/use-ts');
const { useBabel } = require('@webpackon/use-babel');

module.exports = (_, { mode }) =>
  compose(
    useBabel({ useTs: true }),
    useTs(),
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });

```
