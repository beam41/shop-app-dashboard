import axios from './axios'

export function getTypes() {
  return axios.instance.get(`/types`)
}

export function getTypeList() {
  return axios.instance.get(`/types/list`)
}
