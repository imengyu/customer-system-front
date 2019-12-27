import { AxiosInstance, AxiosResponse } from "axios";
import Vue from "vue";

export class CommonApiResult {

  public success = false;
  public code = 0;
  public message = '';
  public data : any;

  public constructor(success = false, code? : number, message? : string, data?) {
    this.success = success;
    if(code) this.code = code;
    if(message) this.message = message;
    if(data) this.data = data;
  }
}
export class CommonApiError {

  public networkError = false;
  public errorMessage : string;
  public errorApiData : CommonApiResult;

  public constructor(networkError = false, errorMessage : string = '', errorApiData ?: CommonApiResult) {
    this.networkError = networkError;
    this.errorMessage = errorMessage;
    if(errorApiData) this.errorApiData = errorApiData;
  }

}

export var axios : AxiosInstance;

/**
 * 初始化
 */
export function init() {
  axios = Vue.prototype.$axios;
}
export function getCommonApiResult(data) {
  return new CommonApiResult(data.success, data.code, data.message, data.data);
}
export function commonResponse(promise : Promise<AxiosResponse>, 
  resolve: (value?: CommonApiResult) => void, reject: (reason?: CommonApiError) => void) {
  promise.then((response) => {
    if(response.data.success) resolve(getCommonApiResult(response.data));
    else reject(new CommonApiError(false, response.data.message, getCommonApiResult(response.data)));
  }).catch((e) => {
    reject(new CommonApiError(true, '网络错误：' + e))
  });
}