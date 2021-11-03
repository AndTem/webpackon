import {
  createLoader,
  LoaderCreatorParams,
  getExcludePackagesRegexp,
} from '@webpackon/core';
import webpack from 'webpack';

type TsLoaderAddParams = {
  transpileLoader: webpack.RuleSetUseItem;
  transpileModules?: string[];
  enableTypeCheck?: boolean;
  options?: Record<string, unknown>;
};

export type TsLoaderOptions = LoaderCreatorParams<TsLoaderAddParams>;

export const createTsLoader = createLoader<TsLoaderAddParams>(
  ({ transpileModules, enableTypeCheck = false, options, transpileLoader }) => {
    if (!transpileLoader) {
      throw Error(
        '@webpackon/use-typescript error: transpileLoader params is required'
      );
    }

    return {
      test: /\.(ts|tsx)$/,
      exclude: transpileModules
        ? getExcludePackagesRegexp(transpileModules)
        : /node_modules/,
      use: [
        transpileLoader,
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: enableTypeCheck,
            ...options,
          },
        },
      ],
    };
  }
);
