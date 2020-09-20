import axios from './axios'

export function getProductList() {
  return axios.instance.get(`/products/list`)
}

export function addProduct(data) {
  return axios.instance.post(`/products/img`, data, {
    'Content-Type': 'multipart/form-data',
  })
}
