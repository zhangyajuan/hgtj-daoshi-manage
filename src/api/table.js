import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function getStudentList(params) {
  return request({
    url: '/student/list',
    method: 'get',
    params
  })
}

export function getTeacherList(params) {
  return request({
    url: '/teacher/list',
    method: 'get',
    params
  })
}

export function getRecommendList(params) {
  return request({
    url: '/recommend/list',
    method: 'get',
    params
  })
}
