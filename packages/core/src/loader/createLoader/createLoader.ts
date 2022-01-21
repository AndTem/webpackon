import { Loader } from '../types';
import { getExcludePackagesRegexp } from '../../common/utils';

export type LoaderCreatorParams<AdditionalParams = {}> = Partial<
  Pick<Loader, 'test' | 'exclude'>
> &
  AdditionalParams & { transpileModules?: string[] };

export function createLoader<AdditionalParams>(
  loaderCreator: (params: LoaderCreatorParams<AdditionalParams>) => Loader
) {
  return (params: LoaderCreatorParams<AdditionalParams>): Loader => {
    const { test, exclude, transpileModules } = params;
    const loader = loaderCreator(params);

    return {
      ...loader,
      test: test || loader.test,
      exclude: transpileModules
        ? getExcludePackagesRegexp(transpileModules)
        : exclude || loader.exclude || /node_modules/,
    };
  };
}
