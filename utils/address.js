import addressData from '@/constants/thai-address-db'

export function getProvinceList() {
  const provinces = addressData.map(({ province }) => province)
  return [...new Set(provinces)].sort((a, b) => a.localeCompare(b))
}

export function getDistrictList(province) {
  const districts = addressData
    .filter((v) => v.province === province)
    .map(({ amphoe }) => amphoe)

  return [...new Set(districts)].sort((a, b) => a.localeCompare(b))
}

export function getSubDistrictList(province, district) {
  const subDistricts = addressData
    .filter((v) => v.province === province && v.amphoe === district)
    .map(({ district }) => district)

  return [...new Set(subDistricts)].sort((a, b) => a.localeCompare(b))
}

export function getZipcode(province, district, subDistrict) {
  return addressData.find(
    (v) =>
      v.province === province &&
      v.amphoe === district &&
      v.district === subDistrict
  )?.zipcode
}
