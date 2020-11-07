import request from '@/utils/request' // @代表的就是src

/**
 * 添加地址
 */
export function addressAdd (params) {
  // 观察实际的接口文档，确定数据请求方案
  return request.post('/address/add', params)
}

/**
 * 修改订单地址
 */
export function updateOrderAddress (params) {
  return request.post('/address/updateOrderAddress', params)
}

/**
 * 获取默认地址
 */
export function defaultAddress (params) {
  return request.post('/address/defaultAddress', params)
}
