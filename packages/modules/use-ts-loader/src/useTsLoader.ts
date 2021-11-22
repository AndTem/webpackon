import { createConfigDecorator, addLoaders, compose } from '@webpackon/core';
import { useTs } from '@webpackon/use-typescript';

import { createTsLoader, TsLoaderOptions } from './tsLoader';

export type UseTsLoaderParams = Pick<
  TsLoaderOptions,
  'transpileModules' | 'enableTypeCheck' | 'transpileLoaderUseItems'
> & {
  loaderParams?: TsLoaderOptions;
};

export const useTsLoader = createConfigDecorator<UseTsLoaderParams, true>(
  (
    config,
    { transpileModules, enableTypeCheck, loaderParams, transpileLoaderUseItems }
  ) => {
    const modify = compose(
      addLoaders([
        createTsLoader({
          transpileModules,
          enableTypeCheck,
          transpileLoaderUseItems,
          ...loaderParams,
        }),
      ]),
      useTs()
    );

    return modify(config);
  }
);
