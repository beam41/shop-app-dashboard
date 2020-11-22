import axios from './axios'

export function getBuildOrderListByState(state) {
  return axios.instance.get(`/buildorders/list/admin/${state}`)
}

export function getBuildOrderById(id) {
  return axios.instance.get(`/buildorders/${id}`)
}

export function cancelBuildOrder(id, data) {
  return axios.instance.put(`/buildorders/${id}/cancelled/admin`, data)
}
