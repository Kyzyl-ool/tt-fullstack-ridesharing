import { IValidator } from './types';

export const isString: IValidator = value => {
  if (typeof value !== 'string') {
    return 'Значение некорректно';
  }
};
