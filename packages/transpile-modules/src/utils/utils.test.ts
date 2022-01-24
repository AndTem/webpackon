import webpack from 'webpack';

import { addExcludeToAllLoaders } from './utils';

describe('addExcludeToAllLoaders', () => {
  it.each<
    [
      {
        initialExclude?: webpack.RuleSetRule['exclude'];
        exclude: RegExp;
      },
      webpack.RuleSetRule['exclude']
    ]
  >([
    [{ exclude: /package/ }, /package/],
    [
      { initialExclude: 'package1', exclude: /package2/ },
      ['package1', /package2/],
    ],
    [
      { initialExclude: ['package1'], exclude: /package2/ },
      ['package1', /package2/],
    ],
    [
      { initialExclude: [/node_modules/], exclude: /node_modules\/package/ },
      [/node_modules\/package/],
    ],
    [
      { initialExclude: ['node_modules'], exclude: /node_modules\/package/ },
      [/node_modules\/package/],
    ],
    [
      { initialExclude: 'node_modules', exclude: /node_modules\/package/ },
      /node_modules\/package/,
    ],
  ])('Input: %j, output: %j', ({ initialExclude, exclude }, resultExclude) => {
    expect(
      addExcludeToAllLoaders(
        {
          module: {
            rules: [{ exclude: initialExclude }],
          },
        },
        exclude
      )
    ).toEqual({
      module: {
        rules: [{ exclude: resultExclude }],
      },
    });
  });
});
