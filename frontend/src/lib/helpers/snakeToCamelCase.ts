const snakeToCamel = (str: string): string =>
  str.replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );

export const snakeObjectToCamel = (obj: Record<string, any>): Record<string, any> => {
  return Object.keys(obj).reduce((acc: Record<string, any>, snakeKey: string) => {
    const camelKey = snakeToCamel(snakeKey);
    if (obj[snakeKey] && typeof obj[snakeKey] === 'object' && !(obj[snakeKey] instanceof Array)) {
      // apply recursively if value is object
      acc[camelKey] = snakeObjectToCamel(obj[snakeKey]);
      return acc;
    }
    acc[camelKey] = obj[snakeKey];
    return acc;
  }, {});
};
