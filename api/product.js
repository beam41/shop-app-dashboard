import axios from './axios'

export function getProductList() {
  return axios.instance.get(`/products/list`)
}

export function getProductById(id) {
  return axios.instance.get(`/products/${id}/admin`)
}

export function addProduct(data) {
  return axios.instance.post(`/products`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function editProduct(id, data) {
  return axios.instance.put(`/products/${id}`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function archiveProduct(id) {
  return axios.instance.delete(`/products/${id}`)
}


export function searchProduct(query) {
  return axios.instance.get(`/products/search?q=${query}`)
}
