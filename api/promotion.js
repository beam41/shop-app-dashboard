import axios from './axios'

export function getPromotionList() {
  return axios.instance.get(`/promotions/list`)
}

export function addPromotion(data) {
  return axios.instance.post(`/promotions`, data)
}
