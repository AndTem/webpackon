import { createConfigDecorator, Mode, compose } from '@webpackon/core';
import { useOptimization } from '@webpackon/use-optimization';
import { useReactRefresh } from '@webpackon/use-react-refresh';

export type UseReactParams = { mode: Mode };

export const useReact = createConfigDecorator<UseReactParams, true>(
  (config, { mode }) =>
    compose(
      useOptimization({
        mode,
        splitChunkCacheGroups: [
          { chunkName: 'react', includePackages: ['react', 'react-dom'] },
        ],
      }),
      useReactRefresh({ mode })
    )(config)
);
