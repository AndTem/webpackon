import { Config } from '@webpackon/core';
import webpack from 'webpack';

import { findLoaderIndex, modifyLoader } from './utils';

const getConfigMock = (rules: webpack.RuleSetRule[]): Config => ({
  module: {
    rules,
  },
});

describe('findLoaderIndex', () => {
  it.each<
    [Parameters<typeof findLoaderIndex>[0], ReturnType<typeof findLoaderIndex>]
  >([
    [
      {
        config: getConfigMock([{ test: '', use: 'babel-loader' }]),
        loaderName: 'babel-loader',
      },
      0,
    ],
    [
      {
        config: getConfigMock([
          {
            test: '',
            use: [{ loader: 'my-loader' }],
          },
          {
            test: '',
            use: [{ loader: 'my-loader' }, { loader: 'babel-loader' }],
          },
        ]),
        loaderName: 'babel-loader',
      },
      1,
    ],
  ])('Entry: %j, output: %s', (etnry, result) => {
    expect(findLoaderIndex(etnry)).toBe(result);
  });
});

describe('modifyLoader', () => {
  it.each<[Parameters<typeof modifyLoader>[0] & { config: Config }, Config]>([
    [
      {
        config: getConfigMock([{ use: 'babel-loader' }]),
        ruleIndex: 0,
        generateNewUseItem: (useItem) => ({
          ...useItem,
          loader: 'babel-loader',
        }),
        loaderName: 'babel-loader',
      },
      getConfigMock([{ use: [{ loader: 'babel-loader' }] }]),
    ],
    [
      {
        config: getConfigMock([{ use: [{ loader: 'babel-loader' }] }]),
        ruleIndex: 0,
        generateNewUseItem: (useItem) => ({ ...useItem, options: {} }),
        loaderName: 'babel-loader',
      },
      getConfigMock([{ use: [{ loader: 'babel-loader', options: {} }] }]),
    ],
  ])('Entry: %j, output: %j', ({ config, ...etnry }, result) => {
    expect(modifyLoader(etnry)(config)).toEqual(result);
  });
});
