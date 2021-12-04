import {
  createLoader,
  LoaderCreatorParams,
  getExcludePackagesRegexp,
} from '@webpackon/core/lib';

type SwcLoaderAddParams = {
  transpileModules?: string[];
  options?: Record<string, any>;
  useTs?: boolean;
};

export type SwcLoaderOptions = LoaderCreatorParams<SwcLoaderAddParams>;

export const createSwcLoader = createLoader<SwcLoaderAddParams>(
  ({ options, transpileModules, useTs }) => {
    const loaderOptions = useTs
      ? {
          ...options,
          jsc: {
            ...options?.jsc,
            parser: {
              ...options?.jsc?.parser,
              syntax: 'typescript',
            },
          },
        }
      : options;

    return {
      test: useTs ? /\.(ts|tsx)$/ : /\.(js|jsx)$/,
      exclude: transpileModules
        ? getExcludePackagesRegexp(transpileModules)
        : /node_modules/,
      use: [
        {
          loader: 'swc-loader',
          options: loaderOptions,
        },
      ],
    };
  }
);
