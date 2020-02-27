import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/order/list',
    method:'get',
    params:params
  })
}

export function closeOrder(params) {
  return request({
    url:'/order/update/close',
    method:'put',
    params:params
  })
}

export function deleteOrder(params) {
  return request({
    url:'/order/delete',
    method:'delete',
    params:params
  })
}

export function deliveryOrder(data) {
  return request({
    url:'/order/update/delivery',
    method:'put',
    data:data
  });
}

export function getOrderDetail(id) {
  return request({
    url:'/order/'+id,
    method:'get'
  });
}

export function updateReceiverInfo(data) {
  return request({
    url:'/order/update/receiverInfo',
    method:'put',
    data:data
  });
}

export function updateMoneyInfo(data) {
  return request({
    url:'/order/update/moneyInfo',
    method:'put',
    data:data
  });
}

export function updateOrderNote(params) {
  return request({
    url:'/order/update/note',
    method:'put',
    params:params
  })
}
