import axios from './axios'

export function getBuildOrderListByState(state) {
  return axios.instance.get(`/buildorders/list/admin/${state}`)
}
