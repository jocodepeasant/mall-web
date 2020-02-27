import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/returnReason/list',
    method:'get',
    params:params
  })
}

export function deleteReason(params) {
  return request({
    url:'/returnReason/delete',
    method:'delete',
    params:params
  })
}

export function updateStatus(params) {
  return request({
    url:'/returnReason/update/status',
    method:'put',
    params:params
  })
}

export function addReason(data) {
  return request({
    url:'/returnReason/create',
    method:'post',
    data:data
  })
}

export function getReasonDetail(id) {
  return request({
    url:'/returnReason/'+id,
    method:'get'
  })
}

export function updateReason(id,data) {
  return request({
    url:'/returnReason/update/'+id,
    method:'put',
    data:data
  })
}
