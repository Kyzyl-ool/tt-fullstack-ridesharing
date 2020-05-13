import { IValidator } from './types';

export const validRegistryNumber: IValidator = value => {
  if (!value.match(/^[А-Я]{1}[0-9]{3}[А-Я]{2}[0-9]{2,3}$/)) {
    return 'Некорректный регистрационный номер';
  }
};
