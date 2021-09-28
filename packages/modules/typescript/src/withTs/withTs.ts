import { createConfigDecorator, addLoaders } from '@webpackon/core';

import { createTsLoader, TsLoaderOptions } from '../tsLoader';

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

export type WithTsParams = Pick<
  TsLoaderOptions,
  'transpileModules' | 'enableTypeCheck'
> & {
  loaderParams?: TsLoaderOptions;
};

const TS_EXTENSIONS = ['.ts', '.tsx'];

export const withTs = createConfigDecorator<WithTsParams, false>(
  (config, { transpileModules, enableTypeCheck, loaderParams } = {}) => {
    const modify = addLoaders([
      createTsLoader({ transpileModules, enableTypeCheck, ...loaderParams }),
    ]);

    const extensions = Array.from(
      new Set([...config.resolve.extensions, ...TS_EXTENSIONS])
    );

    return modify({
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [
          ...config.resolve.plugins,
          new TsconfigPathsPlugin({ extensions }),
        ],
        extensions,
      },
    });
  }
);
