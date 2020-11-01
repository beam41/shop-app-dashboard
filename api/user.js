import axios from './axios'

export function login(username, password) {
  return axios.instance.post(`/users/login`, { username, password })
}

export function getUserList() {
  return axios.instance.get(`/users/list`)
}

export function getUserById(id) {
  return axios.instance.get(`/users/${id}`)
}

export function editUser(id, data) {
  return axios.instance.put(`/users/${id}`, data)
}

export function deleteUser(id) {
  return axios.instance.delete(`/users/${id}`)
}

export function checkUserExist(username) {
  return axios.instance.get(`/users/check-exist?username=${username}`)
}
