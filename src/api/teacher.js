import request from '@/utils/request'

export function getTeacherList(params) {
  return request({
    url: 'api/v1/a/teachers',
    method: 'get',
    params
  })
}
export function disableTeacher(id) {
  return request({
    url: 'api/v1/a/teacher/disable/{id}'.replace("{id}", id),
    method: 'post'
  })
}
export function enableTeacher(id) {
  return request({
    url: 'api/v1/a/teacher/enable/{id}'.replace("{id}", id),
    method: 'post'
  })
}