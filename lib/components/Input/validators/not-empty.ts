import { IValidator } from './types';

export const notEmpty: IValidator = value => {
  if (value === '') {
    return 'Обязательноe поле';
  }
};
