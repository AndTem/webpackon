import {
  createConfigDecorator,
  addPlugins,
  Mode,
  isProduction,
} from '@webpackon/core';
import HtmlWebpackPlugin, { Options } from 'html-webpack-plugin';

type UseHtmlTemplateParams = {
  mode: Mode;
  title?: string;
  templatePath?: string;
};

const getHtmlWebpackPlugin = ({
  templatePath,
  title,
  mode,
}: UseHtmlTemplateParams) => {
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

export const useHtmlTemplate = createConfigDecorator<
  UseHtmlTemplateParams,
  true
>((config, params) => {
  const modifyConfig = addPlugins([getHtmlWebpackPlugin(params)]);

  return modifyConfig(config);
});
