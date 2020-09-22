import axios from './axios'

export function getTypes() {
  return axios.instance.get(`/types/admin`)
}

export function getTypeList() {
  return axios.instance.get(`/types/list`)
}

export function addType(data) {
  return axios.instance.post(`/types`, data)
}

export function getTypeById(id) {
  return axios.instance.get(`/types/${id}`)
}

export function editType(id, data) {
  return axios.instance.put(`/types/${id}`, data)
}

export function archiveType(id) {
  return axios.instance.delete(`/types/${id}`)
}
