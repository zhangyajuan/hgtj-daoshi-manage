import request from '@/utils/request'

export function getSchoolList(params) {
  return request({
    url: 'api/v1/schools',
    method: 'get',
    params
  })
}
