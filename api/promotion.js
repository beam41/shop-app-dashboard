import axios from './axios'

export function getPromotionList() {
  return axios.instance.get(`/promotions/list`)
}

export function addPromotion(data) {
  return axios.instance.post(`/promotions`, data)
}

export function getPromotionById(id) {
  return axios.instance.get(`/promotions/${id}`)
}

export function editPromotion(id, data) {
  return axios.instance.put(`/promotions/${id}`, data)
}

export function archivePromotion(id) {
  return axios.instance.delete(`/promotions/${id}`)
}
