import webpack from 'webpack';
import path from 'path';
import {
  createConfigDecorator,
  Mode,
  isProduction,
  addPlugins,
} from '@webpackon/core';

type WithDevServerParams = {
  mode: Mode;
  outputPath: string;
  open?: boolean;
  useLocalIp?: boolean;
  proxy?: Record<string, unknown>;
  enableHotModuleReplacement?: boolean;
};

export const withDevServer = createConfigDecorator<WithDevServerParams, true>(
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
        contentBase: outputPath,
        host: useLocalIp ? 'local-ip' : undefined,
        hot: true,
        historyApiFallback: true,
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
