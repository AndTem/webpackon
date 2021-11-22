import { PartialConfig } from '../types';

function createConfigDecorator<
  CreatorParams extends Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RequiredParams extends true
>(
  creator: (config: PartialConfig, params: CreatorParams) => PartialConfig
): (params: CreatorParams) => (config: PartialConfig) => PartialConfig;
function createConfigDecorator<
  CreatorParams extends Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RequiredParams extends false
>(
  creator: (config: PartialConfig, params?: CreatorParams) => PartialConfig
): (params?: CreatorParams) => (config: PartialConfig) => PartialConfig;
function createConfigDecorator(creator) {
  return (params) => (config) => creator(config, params);
}

export { createConfigDecorator };
