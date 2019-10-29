import axios from 'axios'
import {BACKEND_URL} from "../../config/backend/backend";
import {type} from "os";

interface IAuth {
  login: string;
  password: string;
}

export async function checkAuth(): Promise<boolean> {
  try {
    const response = await axios.get(`${BACKEND_URL}/get_user_info`, {withCredentials: true})
    if (typeof response.data.user_id === "number")
      return true
  } catch (e) {
    return false
  }

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

export function authOnServer() { }
