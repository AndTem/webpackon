import webpack from 'webpack';

import { addTranspileModulesToRule } from './addTranspileModulesToRule';

describe('addTranspileModulesToRule', () => {
  it.each<
    [
      {
        initialExclude?: webpack.RuleSetRule['exclude'];
        transpileModules: string[];
      },
      webpack.RuleSetRule['exclude']
    ]
  >([
    [{ transpileModules: ['package'] }, /node_modules[\\/](?!(package)).*/],
    [
      { initialExclude: 'package1', transpileModules: ['package2'] },
      ['package1', /node_modules[\\/](?!(package2)).*/],
    ],
    [
      { initialExclude: ['package1'], transpileModules: ['package2'] },
      ['package1', /node_modules[\\/](?!(package2)).*/],
    ],
    [
      {
        initialExclude: [/node_modules/],
        transpileModules: ['package'],
      },
      [/node_modules[\\/](?!(package)).*/],
    ],
    [
      {
        initialExclude: ['node_modules'],
        transpileModules: ['package'],
      },
      [/node_modules[\\/](?!(package)).*/],
    ],
    [
      { initialExclude: 'node_modules', transpileModules: ['package'] },
      /node_modules[\\/](?!(package)).*/,
    ],
  ])(
    'Input: %j, output: %j',
    ({ initialExclude, transpileModules }, resultExclude) => {
      expect(
        addTranspileModulesToRule({ exclude: initialExclude }, transpileModules)
      ).toEqual({ exclude: resultExclude });
    }
  );
});
