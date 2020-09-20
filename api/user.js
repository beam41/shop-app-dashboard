import axios from './axios'

export function login(username, password) {
  return axios.instance.post(`/users/login`, { username, password })
}
