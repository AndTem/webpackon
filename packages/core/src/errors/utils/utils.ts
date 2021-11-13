export const createPackageErrorGenerator =
  (packageName: string) =>
  (message: string): Error =>
    Error(`${packageName}: ${message}`);
