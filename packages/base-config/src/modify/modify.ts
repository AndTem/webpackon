import path from 'path';

import { ModifyConfigFunc, isProduction, Mode, compose } from '@webpackon/core';
import { useCss } from '@webpackon/use-css';
import { useImages } from '@webpackon/use-images';
import { useFonts } from '@webpackon/use-fonts';
import { useHtmlTemplate } from '@webpackon/use-html';
import { useDevServer } from '@webpackon/use-dev-server';
import { useOptimization } from '@webpackon/use-optimization';

import { AdditionalEntryParams } from '../entry';

const getDefaultOutput = (mode: Mode) => ({
  publicPath: '/',
  filename: isProduction(mode) ? '[name].[hash].bundle.js' : '[name].bundle.js',
  path: path.join(process.cwd(), 'build'),
  assetModuleFilename: 'static/[hash][ext][query]',
  clean: isProduction(mode),
});

const DEFAULT_RESOLVE = {
  modules: ['node_modules'],
  extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less'],
};

export const modify: ModifyConfigFunc<AdditionalEntryParams> = (_, context) => {
  const {
    entry,
    output,
    resolve = DEFAULT_RESOLVE,
    mode,
    htmlTitle,
    templatePath,
    dev = {},
    production = {},
  } = context;
  const { useLocalIp, autoOpen, proxy, hot } = dev;
  const { dropConsole, splitChunkCacheGroups } = production;

  const currentOutput = output || getDefaultOutput(mode);

  const baseConfig = {
    target: 'web',

    entry,

    output: currentOutput,

    resolve,
  };

  const configModifiers = [
    useDevServer({
      mode,
      useLocalIp,
      proxy,
      hot,
      open: autoOpen,
    }),
    useFonts(),
    useImages({ mode }),
    useCss({ mode }),
    useHtmlTemplate({ mode, title: htmlTitle, templatePath }),
    useOptimization({ mode, dropConsole, splitChunkCacheGroups }),
  ];

  return compose(...configModifiers)(baseConfig);
};
