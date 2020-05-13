import { IValidator } from './types';

export const isNumber: IValidator = value => {
  if (!value.match(/^\d+$/)) {
    return 'Требуется числовое значение';
  }
};
