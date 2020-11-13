import axios from './axios'

export function getOrderListByState(state) {
  return axios.instance.get(`/orders/list/admin/${state}`)
}

export function getOrderById(id) {
  return axios.instance.get(`/orders/${id}`)
}

export function cancelOrder(id, data) {
  return axios.instance.put(`/orders/${id}/cancelled/admin`, data)
}

export function approveProofOrder(id) {
  return axios.instance.put(`/orders/${id}/approve-proof-full`)
}

export function sentOrder(id, data) {
  return axios.instance.put(`/orders/${id}/sent`, data)
}
