import axios from './axios'

export function getTypes() {
  return axios.instance.get(`/types`)
}
