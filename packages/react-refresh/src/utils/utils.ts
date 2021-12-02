import { Config } from '@webpackon/core';
import webpack from 'webpack';

export const findLoaderIndex = ({
  config,
  loaderName,
}: {
  config: Config;
  loaderName: string;
}): number =>
  config?.module?.rules.findIndex((rule: webpack.RuleSetRule) => {
    if (typeof rule !== 'object') return false;

    if (typeof rule.use === 'string') {
      return rule.use === loaderName;
    }

    if (Array.isArray(rule.use)) {
      return rule.use.some((useItem) => {
        if (typeof useItem === 'string') {
          return useItem === loaderName;
        }

        if ('loader' in useItem) {
          return useItem.loader === loaderName;
        }

        return false;
      });
    }

    return false;
  });

type UseItem = {
  ident?: string;
  loader?: string;
  options?: { [index: string]: any };
};

export const modifyLoader =
  ({
    ruleIndex,
    generateNewUseItem,
    loaderName,
  }: {
    ruleIndex: number;
    generateNewUseItem: (use: UseItem) => webpack.RuleSetUseItem;
    loaderName: string;
  }) =>
  (config: Config): Config => {
    const rules = config.module.rules as webpack.RuleSetRule[];

    const generateNewRule = (
      rule: webpack.RuleSetRule
    ): webpack.RuleSetRule => {
      if (typeof rule.use === 'string') {
        return { ...rule, use: [generateNewUseItem({})] };
      }

      if (Array.isArray(rule.use)) {
        return {
          ...rule,
          use: rule.use.reduce<webpack.RuleSetUseItem[]>((result, useItem) => {
            if (typeof useItem === 'string' && useItem === loaderName) {
              return [...result, generateNewUseItem({})];
            }

            if (
              typeof useItem === 'object' &&
              'loader' in useItem &&
              useItem.loader === loaderName
            ) {
              return [...result, generateNewUseItem(useItem as UseItem)];
            }

            return [...result, useItem];
          }, []),
        };
      }

      return rule;
    };

    return {
      ...config,
      module: {
        ...config?.module,
        rules: [
          ...rules.slice(0, ruleIndex),
          generateNewRule(rules[ruleIndex]),
          ...rules.slice(ruleIndex + 1, rules.length),
        ],
      },
    };
  };
