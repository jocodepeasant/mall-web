import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/home/brand/list',
    method:'get',
    params:params
  })
}

export function updateRecommendStatus(data) {
  return request({
    url:'/home/brand/update/recommendStatus',
    method:'put',
    data:data
  })
}

export function deleteHomeBrand(data) {
  return request({
    url:'/home/brand/delete',
    method:'delete',
    data:data
  })
}

export function createHomeBrand(data) {
  return request({
    url:'/home/brand/create',
    method:'post',
    data:data
  })
}

export function updateHomeBrandSort(params) {
  return request({
    url:'/home/brand/update/sort/'+params.id,
    method:'put',
    params:params
  })
}
