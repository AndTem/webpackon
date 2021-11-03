import { ModifyConfigFunc, compose } from '@webpackon/core';
import { useOptimization } from '@webpackon/use-optimization';

import { AdditionalEntryParams } from '../entry';

export const modify: ModifyConfigFunc<AdditionalEntryParams> = (
  config,
  context
) => {
  const { mode, production = {} } = context;
  const { splitChunkCacheGroups = [] } = production;

  const modifyConfig = compose(
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
