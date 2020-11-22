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

export function ableToBuild(id, data) {
  return axios.instance.put(`/buildorders/${id}/is-able-to-built`, data)
}

export function approveProofDeposit(id, data) {
  return axios.instance.put(`/buildorders/${id}/approve-proof-deposit`, data)
}

export function builtComplete(id) {
  return axios.instance.put(`/buildorders/${id}/built-complete`)
}

export function approveProofFull(id) {
  return axios.instance.put(`/buildorders/${id}/approve-proof-full`)
}

export function sent(id, data) {
  return axios.instance.put(`/buildorders/${id}/sent`, data)
}
