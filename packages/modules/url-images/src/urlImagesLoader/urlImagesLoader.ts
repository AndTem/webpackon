import { createLoader, LoaderCreatorParams } from '@webpackon/core';

type UrlImagesLoaderAddParams = {
  generator?: Record<string, any>;
};

export type UrlImagesLoaderOptions =
  LoaderCreatorParams<UrlImagesLoaderAddParams>;

export const createUrlImagesLoader = createLoader<UrlImagesLoaderOptions>(
  ({ generator }) => ({
    test: /\.(png|jpg|jpeg|gif|webp|svg)$/i,
    type: 'asset/resource',
    generator,
  })
);
