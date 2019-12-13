import request from '@/utils/request'

export function getRecommendationList(params) {
  return request({
    url: 'api/v1/a/applytoteacher/list',
    method: 'get',
    params
  })
}

export function applyPass(params, id) {
  return request({
    url: 'api/v1/a/applytoteacher/pass/{id}'.replace("{id}", id),
    method: 'post',
    params
  })
}
export function applyDeny(params,id) {
  return request({
    url: 'api/v1/a/applytoteacher/deny/{id}'.replace("{id}", id),
    method: 'post',
    params
  })
}

export function applyDetail(id) {
  return request({
    url: 'api/v1/a/applytoteacher/detail/{id}'.replace("{id}", id),
    method: 'get'
  })
}