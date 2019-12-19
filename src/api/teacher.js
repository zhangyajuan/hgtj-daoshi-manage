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

export function addTeacher(params) {
  return request({
    url: 'api/v1/a/teacher',
    method: 'post',
    params
  })
}
export function deleteTeacher(id) {
  return request({
    url: 'api/v1/student/delete/{id}'.replace("{id}", id),
    method: 'post'
  })
}
export function detailTeacher(id) {
  return request({
    url: 'api/v1/teacher/{id}'.replace("{id}", id),
    method: 'get'
  })
}
export function updateTeacher(params, id) {
  return request({
    url: 'api/v1/a/teacher/{id}'.replace("{id}", id),
    method: 'post',
    params
  })
}