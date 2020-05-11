import { IValidator } from './types';

export const composeValidators = (...validators: IValidator[]) => (value: string) =>
  validators.reduce<string | undefined>((error, validator) => error || validator(value), undefined);
