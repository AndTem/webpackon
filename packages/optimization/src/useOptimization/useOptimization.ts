import {
  createConfigDecorator,
  addPlugins,
  Mode,
  isProduction,
} from '@webpackon/core';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';

import { getCacheGroups } from './utils';

type UseOptimizationParams = {
  mode: Mode;
  dropConsole?: boolean;
  splitChunkCacheGroups?: Array<{
    chunkName: string;
    includePackages: string[];
  }>;
};

export const useOptimization = createConfigDecorator<
  UseOptimizationParams,
  true
>((config, { mode, dropConsole = true, splitChunkCacheGroups }) => {
  if (!isProduction(mode)) return config;

  const modifyConfig = addPlugins([new CaseSensitivePathsPlugin() as any]);

  return modifyConfig({
    ...config,

    output: {
      filename: '[name].[fullhash].bundle.js',
      assetModuleFilename: 'static/[hash][ext][query]',
      clean: true,
      ...config?.output,
    },

    devtool: 'hidden-source-map',

    optimization: {
      ...config.optimization,
      moduleIds: 'deterministic',
      minimizer: [
        ...(config.optimization?.minimizer || []),
        new TerserWebpackPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: dropConsole,
            },
          },
        }),
      ],
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: getCacheGroups(splitChunkCacheGroups) as any,
        chunks: 'all',
      },
    },
  });
});
