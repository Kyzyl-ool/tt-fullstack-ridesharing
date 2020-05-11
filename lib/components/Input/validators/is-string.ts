import { IValidator } from './types';

export const isString: IValidator = value => {
  if (!value.match(/[A-Z|а-я]+$/i)) {
    return 'Значение некорректно';
  }
};
