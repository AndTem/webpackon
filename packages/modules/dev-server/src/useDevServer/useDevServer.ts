import path from 'path';

import {
  createConfigDecorator,
  Mode,
  isProduction,
  addPlugins,
} from '@webpackon/core';

type UseDevServerParams = {
  mode: Mode;
  open?: boolean;
  hot?: boolean;
  useLocalIp?: boolean;
  proxy?: Record<string, unknown>;
};

export const useDevServer = createConfigDecorator<UseDevServerParams, true>(
  (config, { mode, open = false, useLocalIp = false, proxy, hot = true }) => {
    if (isProduction(mode)) return config;

    const plugins = [];

    const modifyConfig = addPlugins(plugins);

    const outputPath =
      config.output?.path || path.resolve(process.cwd(), 'dist');

    return modifyConfig({
      ...config,
      devtool: 'eval-source-map',
      devServer: {
        static: outputPath,
        host: useLocalIp ? 'local-ip' : undefined,
        hot,
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
        cacheLocation: path.join(outputPath, '.cache-dev'),
        compression: 'brotli',
      },
    });
  }
);
