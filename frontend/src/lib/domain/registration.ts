export interface IUserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface IDriverRegistrationData {
  // Договорились пока слать пустые строки вместо паспорта
  // так как на словах успели отказаться от указания паспорта при регистрации
  // а на бэке паспорт еще присутствует
  id: number;
  passportUrl1: string;
  passportUrl2: string;
  passportUrlSelfie: string;
  license1: string;
  license2: string;
}
