import Const from '../const/Const'
import { CommonApiResult, commonResponse, axios, init  } from './common';


/**
 * 中央 API 封装
 */
const api = {
  init,
  login,
  logout,
  getAuthInfo,
  getUserInfo,
  getCustomerPageable,
  getCustomerIndustry,
  getCustomerCount,
  getCustomerCountByUserId,
  deleteCustomerById,
  updateCustomerById,
  addCustomer,
  addCustomerrIndustry
}


export * from './common';
export default api;

/* API SET */

/**
 * 登录
 * @param loginData 
 */
function login(loginData) {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.post(Const.API_ROOT + '/auth', loginData), resolve, reject));
}
/**
 * 退出登录
 */
function logout() {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.get(Const.API_ROOT + '/auth/end'), resolve, reject));
}
/**
 * 获取当前用户登录信息
 */
function getAuthInfo() {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.get(Const.API_ROOT + '/auth'), resolve, reject));
}
/**
 * 获取用户信息
 * @param userId 
 */
function getUserInfo(userId : number) {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.get(Const.API_ROOT + '/user/' + userId), resolve, reject));
}

/**
 * 获取客户分页
 */
function getCustomerPageable(pageIndex : number, pageSize = 10, searchParams : any = {}) {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.post(Const.API_ROOT + '/customer/' + pageIndex + '/' + pageSize + (searchParams != {} ? '?search=true' : '?search=false'), searchParams), resolve, reject));
}
/**
 * 获取客户分页
 */
function getCustomerIndustry() {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.get(Const.API_ROOT + '/customer/industry'), resolve, reject));
}


function getCustomerCount() {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.get(Const.API_ROOT + '/customer/count'), resolve, reject));
}
function getCustomerCountByUserId(userId : number) {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.get(Const.API_ROOT + '/customer/count/' + userId), resolve, reject));
}
function deleteCustomerById(customerId : number) {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.delete(Const.API_ROOT + '/customer/' + customerId), resolve, reject));
}
function updateCustomerById(customerId : number, customer) {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.post(Const.API_ROOT + '/customer/' + customerId, customer), resolve, reject));
}
function addCustomer(customer) {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.put(Const.API_ROOT + '/customer/', customer), resolve, reject));
}

function addCustomerrIndustry(customerIndustry) {
  return new Promise<CommonApiResult>((resolve, reject) => commonResponse(axios.put(Const.API_ROOT + '/customer/industry', customerIndustry), resolve, reject));
}

