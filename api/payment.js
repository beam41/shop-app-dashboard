import axios from './axios'

export function getPaymentMethod() {
  return axios.instance.get(`/paymentmethods`)
}

export function editPaymentMethod(data) {
  return axios.instance.put(`/paymentmethods`, data)
}
