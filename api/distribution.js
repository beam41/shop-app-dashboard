import axios from './axios'

export function getDistributionMethod() {
  return axios.instance.get(`/distributionmethods`)
}

export function editDistributionMethod(data) {
  return axios.instance.put(`/distributionmethods`, data)
}
