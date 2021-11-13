import {
  createConfigDecorator,
  addLoaders,
  addResolveExtensions,
  compose,
} from '@webpackon/core';

import { createBabelLoader, BabelLoaderOptions } from '../babelLoader';

export type UseBabelParams = Pick<BabelLoaderOptions, 'transpileModules'> & {
  loaderParams?: BabelLoaderOptions;
};

export const useBabel = createConfigDecorator<UseBabelParams, false>(
  (config, { transpileModules, loaderParams } = {}) =>
    compose(
      addLoaders([createBabelLoader({ transpileModules, ...loaderParams })]),
      addResolveExtensions(['.js', '.jsx'])
    )(config)
);
