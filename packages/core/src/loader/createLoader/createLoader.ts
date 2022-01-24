import { Loader } from '../types';
import { addTranspileModulesToRule } from '../../config';

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

    const result = {
      ...loader,
      test: test || loader.test,
      exclude: exclude || loader.exclude || /node_modules/,
    };

    return transpileModules?.length
      ? (addTranspileModulesToRule(result, transpileModules) as Loader)
      : result;
  };
}
