import { ModifyConfigFunc, compose } from '@webpackon/core';
import { withOptimization } from '@webpackon/optimization';

import { AdditionalEntryParams } from '../entry';
import { withReactRefresh } from '../withReactRefresh';

export const modify: ModifyConfigFunc<AdditionalEntryParams> = (
  config,
  context
) => {
  const { mode, production = {}, useTs, transpileModules } = context;
  const { splitChunkCacheGroups } = production;

  const modifyConfig = compose(
    // includes withBabel and withTs
    withReactRefresh({ mode, useTs, transpileModules }),
    withOptimization({
      mode,
      splitChunkCacheGroups: [
        ...splitChunkCacheGroups,
        { chunkName: 'react', includePackages: ['react', 'react-dom'] },
      ],
    })
  );

  return modifyConfig(config);
};
