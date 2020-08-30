import { IValidator } from './types';

export const isString: IValidator = value => {
  console.log(value, 'value is string');
  if (!value.match(/[A-Z|а-я|0-9|/\s]+$/i)) {
    return 'Значение некорректно';
  }
};
