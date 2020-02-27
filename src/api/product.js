import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/product/list',
    method:'get',
    params:params
  })
}

export function fetchSimpleList(params) {
  return request({
    url:'/product/simpleList',
    method:'get',
    params:params
  })
}

export function updateDeleteStatus(params) {
  return request({
    url:'/product/update/deleteStatus',
    method:'put',
    params:params
  })
}

export function updateNewStatus(params) {
  return request({
    url:'/product/update/newStatus',
    method:'put',
    params:params
  })
}

export function updateRecommendStatus(params) {
  return request({
    url:'/product/update/recommendStatus',
    method:'put',
    params:params
  })
}

export function updatePublishStatus(params) {
  return request({
    url:'/product/update/publishStatus',
    method:'put',
    params:params
  })
}

export function createProduct(data) {
  return request({
    url:'/product/create',
    method:'post',
    data:data
  })
}

export function updateProduct(id,data) {
  return request({
    url:'/product/update/'+id,
    method:'put',
    data:data
  })
}

export function getProduct(id) {
  return request({
    url:'/product/updateInfo/'+id,
    method:'get',
  })
}

