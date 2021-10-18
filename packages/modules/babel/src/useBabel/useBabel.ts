import { createConfigDecorator, addLoaders } from '@webpackon/core';

import { createBabelLoader, BabelLoaderOptions } from '../babelLoader';

export type UseBabelParams = Pick<BabelLoaderOptions, 'transpileModules'> & {
  loaderParams?: BabelLoaderOptions;
};

export const useBabel = createConfigDecorator<UseBabelParams, false>(
  (config, { transpileModules, loaderParams } = {}) =>
    addLoaders([createBabelLoader({ transpileModules, ...loaderParams })])(
      config
    )
);
