// import request from './../utils/request'
import request from '@/utils/request' // @代表的就是src

/**
 * 获取轮播图数据
 */
export function getBannerlist () {
  // 观察实际的接口文档，确定数据请求方案
  return request.get('/banner')
}

/**
 * 获取首页推荐列表的数据
 */
export function getProlist (params) { // 此参数名字不要随意修改
  return request.get('/pro/list', { params })
}

/**
 * 详情获取的数据接口
 */
export function getProDetail (params) {
  return request.get('/pro/detail', { params })
}

/**
 * 发送短信验证码接口
 */
export function senCode (params) {
  return request.post('/user/sendCode', params)
}

/**
 * 注册
 */
export function register (params) {
  return request.post('/user/register', params)
}

/**
 * 登录
 */
export function login (params) {
  return request.post('/user/login', params)
}

/**
 * 添加购物车数据
 */
export function addCart (params) {
  return request.post('/cart/addCart', params)
}

/**
 * 查看购物车
 */
export function getCartList (params) {
  return request.post('/cart/list', params)
}

/**
 * 删除购物车
 */
export function deleteCart (params) {
  return request.post('/cart/delete', params)
}

/**
 * 更新购物车数量
 */
export function updateNum (params) {
  return request.post('/cart/updateNum', params)
}

/**
 * 购物车的全选的选中状态
 */
export function updateAllFlag (params) {
  return request.post('/cart/updateAllFlag', params)
}

/**
 * 购物车的单选的选中状态
 */
export function updateFlag (params) {
  return request.post('/cart/updateFlag', params)
}

/**
 * 添加订单- 提交订单
 */
export function confirmOrder (params) {
  return request.post('/order/confirmOrder', params)
}

/**
 * 确认订单列表信息
 */
export function getConfirmOrder (params) {
  return request.post('/order/getConfirmOrder', params)
}

/**
 * 支付接口
 */
export function pay (params) {
  return request.get('/pay/payment', { params })
}
/**
 * 删除购物车选中的数据
 */
export function deleteCartData (params) {
  return request.post('/order/deleteCartData', params)
}
