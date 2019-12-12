import request from '@/utils/request'

export function getStudentList(params) {
  return request({
    url: 'api/v1/students',
    method: 'get',
    params
  })
}

export function disableStudent(id) {
  return request({
    url: 'api/v1/a/student/disable/{id}'.replace("{id}", id),
    method: 'post'
  })
}
export function enableStudent(id) {
  return request({
    url: 'api/v1/a/student/enable/{id}'.replace("{id}", id),
    method: 'post'
  })
}
