module.exports = {
  'packages/**/*.{js,jsx,ts,tsx}': [
    'yarn run lint',
    () => 'yarn run tests',
    () => 'yarn run lint:types',
  ],
};
