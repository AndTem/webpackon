import { createConfigDecorator, addLoaders } from '@webpackon/core';

import { createTsLoader, TsLoaderOptions } from './tsLoader';

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

export type UseTsParams = Pick<
  TsLoaderOptions,
  'transpileModules' | 'enableTypeCheck' | 'transpileLoaderUseItems'
> & {
  loaderParams?: TsLoaderOptions;
};

const TS_EXTENSIONS = ['.ts', '.tsx'];

export const useTs = createConfigDecorator<UseTsParams, true>(
  (
    config,
    { transpileModules, enableTypeCheck, loaderParams, transpileLoaderUseItems }
  ) => {
    const modify = addLoaders([
      createTsLoader({
        transpileModules,
        enableTypeCheck,
        transpileLoaderUseItems,
        ...loaderParams,
      }),
    ]);

    const { extensions: configExtensions = [], plugins: configPlugins = [] } =
      config.resolve || {};

    const extensions = Array.from(
      new Set([...configExtensions, ...TS_EXTENSIONS])
    );

    return modify({
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [...configPlugins, new TsconfigPathsPlugin({ extensions })],
        extensions,
      },
    });
  }
);