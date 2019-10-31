import axios from 'axios'
import {BACKEND_URL} from "../../config/backend/backend";

interface IAuth {
  login: string;
  password: string;
}

export async function checkAuth(): Promise<boolean> {
  try {
    const response = await axios.get(`${BACKEND_URL}/get_user_info`, {withCredentials: true})
    if (typeof response.data.id === "number")
      return true
  } catch (e) {
    return false
  }

}

export async function logout(): Promise<boolean> {
  try {
    const response = await axios.post(`${BACKEND_URL}/logout`, {}, {withCredentials: true})
    return true
  } catch {
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
