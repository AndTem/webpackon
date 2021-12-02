import {
  createConfigDecorator,
  addLoaders,
  addResolveExtensions,
  compose,
} from '@webpackon/core/lib';

import { createBabelLoader, BabelLoaderOptions } from './babelLoader';

export type UseBabelParams = Pick<
  BabelLoaderOptions,
  'transpileModules' | 'useTs'
> & {
  loaderParams?: BabelLoaderOptions;
};

export const useBabel = createConfigDecorator<UseBabelParams, false>(
  (config, { transpileModules, loaderParams, useTs } = {}) =>
    compose(
      addLoaders([
        createBabelLoader({ transpileModules, useTs, ...loaderParams }),
      ]),
      addResolveExtensions(['.js', '.jsx'])
    )(config)
);
