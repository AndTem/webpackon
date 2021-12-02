import {
  createConfigDecorator,
  addPlugins,
  Mode,
  isProduction,
} from '@webpackon/core';
import HtmlWebpackPlugin, { Options } from 'html-webpack-plugin';

type UseHtmlParams = {
  mode: Mode;
  title?: string;
  templatePath?: string;
};

const getHtmlWebpackPlugin = ({ templatePath, title, mode }: UseHtmlParams) => {
  const options: Options = { template: templatePath, title };

  if (isProduction(mode)) {
    options.minify = {
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      removeComments: true,
    };
  }

  return new HtmlWebpackPlugin(options);
};

export const useHtml = createConfigDecorator<UseHtmlParams, true>(
  (config, params) => {
    const modifyConfig = addPlugins([getHtmlWebpackPlugin(params)]);

    return modifyConfig(config);
  }
);
