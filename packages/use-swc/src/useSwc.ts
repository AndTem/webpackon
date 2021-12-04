import {
  createConfigDecorator,
  addLoaders,
  addResolveExtensions,
  compose,
} from '@webpackon/core/lib';

import { createSwcLoader, SwcLoaderOptions } from './swcLoader';

export type UseSwcParams = Pick<
  SwcLoaderOptions,
  'transpileModules' | 'useTs'
> & {
  loaderParams?: SwcLoaderOptions;
};

export const useSwc = createConfigDecorator<UseSwcParams, false>(
  (config, { transpileModules, loaderParams, useTs } = {}) =>
    compose(
      addLoaders([
        createSwcLoader({ transpileModules, useTs, ...loaderParams }),
      ]),
      addResolveExtensions(
        useTs ? ['.js', '.jsx', '.ts', '.tsx'] : ['.js', '.jsx']
      )
    )(config)
);
