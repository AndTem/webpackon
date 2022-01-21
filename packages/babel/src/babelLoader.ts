import { createLoader, LoaderCreatorParams } from '@webpackon/core';

type BabelLoaderAddParams = {
  options?: Record<string, any>;
  useTs?: boolean;
};

export type BabelLoaderOptions = LoaderCreatorParams<BabelLoaderAddParams>;

export const createBabelLoader = createLoader<BabelLoaderAddParams>(
  ({ options, useTs }) => ({
    test: useTs ? /\.(ts|tsx)$/ : /\.(js|jsx)$/,
    use: [
      {
        loader: 'babel-loader',
        options,
      },
    ],
  })
);
