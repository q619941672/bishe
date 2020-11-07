import request from '@/utils/request' // @代表的就是src

/**
 * 获取分类数据
 */
export function getCategory (params) {
  return request.get('/search/getCategory', { params })
}

/**
 * 获取分类数据下品牌信息
 */
export function getCategoryLogo (params) {
  return request.get('/search/getCategoryLogo', { params })
}

/**
 * 获取分类数据下品牌的对应的具体列表数据
 */
export function getCategoryBrandList (params) {
  return request.get('/search/getCategoryBrandList', { params })
}
