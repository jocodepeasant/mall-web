import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/flashSession/list',
    method: 'get',
    params: params
  })
}

export function fetchSelectList(params) {
  return request({
    url: '/flashSession/selectList',
    method: 'get',
    params: params
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/flashSession/update/status/' + id,
    method: 'put',
    params: params
  })
}

export function deleteSession(id) {
  return request({
    url: '/flashSession/delete/' + id,
    method: 'delete'
  })
}

export function createSession(data) {
  return request({
    url: '/flashSession/create',
    method: 'post',
    data: data
  })
}

export function updateSession(id, data) {
  return request({
    url: '/flashSession/update/' + id,
    method: 'put',
    data: data
  })
}
