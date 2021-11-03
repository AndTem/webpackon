import path from 'path';

import webpack from 'webpack';
import {
  createConfigDecorator,
  Mode,
  isProduction,
  addPlugins,
} from '@webpackon/core';

type UseDevServerParams = {
  mode: Mode;
  outputPath: string;
  open?: boolean;
  useLocalIp?: boolean;
  proxy?: Record<string, unknown>;
  enableHotModuleReplacement?: boolean;
};

export const useDevServer = createConfigDecorator<UseDevServerParams, true>(
  (
    config,
    {
      mode,
      outputPath,
      open = false,
      useLocalIp = false,
      proxy,
      enableHotModuleReplacement = true,
    }
  ) => {
    if (isProduction(mode)) return config;

    const plugins = [];

    if (enableHotModuleReplacement) {
      plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    const modifyConfig = addPlugins(plugins);

    return modifyConfig({
      ...config,
      devtool: 'eval-source-map',
      devServer: {
        static: outputPath,
        host: useLocalIp ? 'local-ip' : undefined,
        hot: true,
        historyApiFallback: true,
        client: {
          overlay: true,
        },
        devMiddleware: {
          index: true,
        },
        open,
        proxy,
      },
      cache: {
        type: 'filesystem',
        cacheLocation: path.join(outputPath, '.cache'),
        compression: 'brotli',
      },
    });
  }
);
