interface IAuth {
  login: string;
  password: string;
}

export function authorize(data: IAuth) {
  console.log(data);
  return new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000));
}

export function authHandler(fetcher: Promise<any>, onSuccess: CallableFunction, onFail: CallableFunction) {
  fetcher
    .then(value => {
      onSuccess();
    })
    .catch(e => {
      onFail();
    });
}

export function authOnServer() {}
