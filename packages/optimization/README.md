<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='120' width='120'>
</p>
<p align="center">
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/use-optimization

Features:
- minification js for production
- enable split chunks
- optimizing chunks ids
- adds hash for result files
- adds hash for assets, places their in the ```static``` directory
- cleaning dist directory before build

## Install
```shell
npm i @webpackon/use-optimization --save
```

```shell
yarn add @webpackon/use-optimization
```

## API

```ts
const { useOptimization } = require('@webpackon/use-optimization');

useOptimization(params: UseOptimizationParams)(config: WebpackConfig)
```

### UseOptimizationParams
```ts
type UseOptimizationParams = {
  mode: 'development' | 'production';
  dropConsole?: boolean;
  splitChunkCacheGroups?: Array<{
    chunkName: string;
    includePackages: string[];
  }>;
};
```

- ```mode``` - webpack mode

- ```dropConsole``` - removes console for production (default - ```true```)

- ```splitChunkCacheGroups``` - unions packages (includePackages) in chunk

## Example
Full examples are [here](https://github.com/AndTem/webpackon/tree/master/examples)

```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useOptimization } = require('@webpackon/use-optimization');

module.exports = (_, { mode }) =>
  compose(
    useOptimization({
      mode,
      splitChunkCacheGroups: [
        { chunkName: 'react', includePackages: ['react', 'react-dom'] },
      ],
    })
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
```
