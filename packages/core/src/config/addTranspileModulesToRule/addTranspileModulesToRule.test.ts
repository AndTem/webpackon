import webpack from 'webpack';

import { addTranspileModulesToRule } from './addTranspileModulesToRule';

describe('addTranspileModulesToRule', () => {
  it('Remove node_modules', () => {
    const result = addTranspileModulesToRule({ exclude: [/node_modules/] }, [
      'package1',
    ]) as webpack.RuleSetRule;

    expect((result?.exclude as any).length).toBe(1);
  });
});
