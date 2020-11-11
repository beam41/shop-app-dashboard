import axios from './axios'

export function getOrderListByState(state) {
  return axios.instance.get(`/orders/list/admin/${state}`)
}

export function getOrderById(id) {
  return axios.instance.get(`/orders/${id}`)
}
