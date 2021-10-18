import { ModifyConfigFunc, compose } from '@webpackon/core';
import { useOptimization } from '@webpackon/use-optimization';

import { AdditionalEntryParams } from '../entry';
import { useReactRefresh } from '../useReactRefresh';

export const modify: ModifyConfigFunc<AdditionalEntryParams> = (
  config,
  context
) => {
  const { mode, production = {}, useTs, transpileModules } = context;
  const { splitChunkCacheGroups } = production;

  const modifyConfig = compose(
    // includes useBabel and useTs
    useReactRefresh({ mode, useTs, transpileModules }),
    useOptimization({
      mode,
      splitChunkCacheGroups: [
        ...splitChunkCacheGroups,
        { chunkName: 'react', includePackages: ['react', 'react-dom'] },
      ],
    })
  );

  return modifyConfig(config);
};
