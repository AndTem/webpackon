import {
  createLoader,
  LoaderCreatorParams,
  getExcludePackagesRegexp,
} from '@webpackon/core/lib';
import webpack from 'webpack';

type TsLoaderAddParams = {
  transpileLoaderUseItems: webpack.RuleSetUseItem[];
  transpileModules?: string[];
  enableTypeCheck?: boolean;
  options?: Record<string, unknown>;
};

export type TsLoaderOptions = LoaderCreatorParams<TsLoaderAddParams>;

export const createTsLoader = createLoader<TsLoaderAddParams>(
  ({
    transpileModules,
    enableTypeCheck = false,
    options,
    transpileLoaderUseItems,
  }) => {
    if (!transpileLoaderUseItems) {
      throw Error(
        '@webpackon/use-typescript error: transpileLoaderItem params is required'
      );
    }

    return {
      test: /\.(ts|tsx)$/,
      exclude: transpileModules
        ? getExcludePackagesRegexp(transpileModules)
        : /node_modules/,
      use: [
        ...transpileLoaderUseItems,
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
