export default {

  isNullOrEmpty(str){
    return !str || typeof str == 'undefined' || str == ''
  },
  isBase64,
  isJSON,
  isArray,
  isNumber,
  isChinaPoneNumber,
  isEmail,
  mergeJSON,
  mergeJsonArray,

  getReadableFileSize,
  
  pad,

  clone,
  cloneValue,

  swapItems,
  upData,
  downData,

  setCookie,
  setCookieWithPath,
  getCookie,
  delCookie,
}



/**
 * 克隆对象
 * @param {Object} obj 要克隆对象
 */
function clone(obj) {
  let temp : any = null;
  if (obj instanceof Array) {
    temp = obj.concat();
  } else if (obj instanceof Function) {
    //函数是共享的是无所谓的，js也没有什么办法可以在定义后再修改函数内容
    temp = obj;
  } else {
    temp = new Object();
    for (let item in obj) {
      let val = obj[item];
      if(val == null) temp[item] = null;
      else temp[item] = typeof val == 'object' ? clone(val) : val; //这里也没有判断是否为函数，因为对于函数，我们将它和一般值一样处理
    }
  }
  return temp;
}
/**
 * 将源对象每个属性都复制到目标对象（不管目标对象有没有对应属性）
 * @param {*} setObj 
 * @param {*} sourceObj 
 */
function cloneValue(setObj, sourceObj){
  if(!setObj || !sourceObj) return;
  Object.keys(setObj).forEach(function(key){
    if(typeof sourceObj[key] != 'undefined') {
      if(isJSON(setObj[key])) cloneValue(setObj[key], sourceObj[key]);
      else setObj[key] = sourceObj[key];
    }
  });
}


function mergeJSON(minor, main) {
  for (var key in minor) {
    if (main[key] === undefined) { // 不冲突的，直接赋值 
      main[key] = minor[key];
      continue;
    }
    // 冲突了，如果是Object，看看有么有不冲突的属性
    // 不是Object 则以（minor）为准为主，
    if (isJSON(minor[key]) || isArray(minor[key])) { // arguments.callee 递归调用，并且与函数名解耦 
      main[key] = mergeJSON(minor[key], main[key]);
    } else {
      main[key] = minor[key];
    }
  }
  return main;
}
function isJSON(target) {
  return target != null && typeof target == "object" && target.constructor == Object;
}
function isArray(o) {
  return Object.prototype.toString.call(o) == '[object Array]';
}
/**
 * 混合两个 JsonArray
 * @param {*} a 
 * @param {*} b 
 */
function mergeJsonArray(a, b) {
  var r = {};
  var i = 0;
  for (var key in a) {
    r[i] = a[key];
    i++;
  }
  for (var key in b) {
    r[i] = b[key];
    i++;
  }
  return r;
}

// 字符串操作
//================


/**
* 判断字符串是否是 Base64 编码
* @param {String} str 
*/
function isBase64(str : string) {
  return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(str);
}
/**
 * 检测字符串是否是一串数字
 * @param {String} val 
 */
function isNumber(val : string) {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}
/**
 * 数字补0
 */
function pad(num : number, n : number) {
  var len = num.toString().length;
  var str = '';
  while (len < n) {
    str = "0" + num;
    len++;
  }
  return str;
}

// Cookie 操作
//================

/**
 * 设置 Cookie
 * @param {String} name Cookie 名称
 * @param {*} value 
 */
function setCookie(name : string, value : string) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function setCookieWithPath(name : string, value : string, path : string) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + path;
}
/**
 * 读取 Cookie
 * @param {String} name Cookie 名称
 */ 
function getCookie(name : string) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
/**
 * 删除 Cookie
 * @param {String} name Cookie 名称
 */ 
function delCookie(name : string) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//数组操作
//================

/**
 * 交换数组两个元素
 * @param {Array} arr 数组
 * @param {Number} index1 索引1
 * @param {Number} index2 索引2
 */
function swapItems(arr : Array<any>, index1 : number, index2 : number){
  　arr[index1] = arr.splice(index2,1,arr[index1])[0]
  　return arr
}
/**
 * 指定数组索引位置元素向上移
 * @param {Array} arr 数组
 * @param {Number} index 索引
 */
function upData (arr : Array<any>, index : number) {
  　if (arr.length > 1 && index !== 0)
  　　　return swapItems(arr, index, index - 1)
}
/**
 * 指定数组索引位置元素向下移
 * @param {Array} arr 数组
 * @param {Number} index 索引
 */
function downData (arr : Array<any>, index : number) {
  　if (arr.length > 1 && index !== (arr.length - 1))
    　　return swapItems(arr, index, index + 1)
}

//字符串工具

function isChinaPoneNumber(str : string) {
  var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
      return false;
  } else {
      return true;
  }
}
function isEmail(str : string){
  var re=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (re.test(str) != true) {
    return false;
  }else{
    return true;
  }
}

function getReadableFileSize(filesize : number){
  let str = '';
  if(filesize >= 1073741824){
    filesize = Math.round(filesize/1073741824*100)/100;
    str = filesize + "GB";
  }else if(filesize >= 1048576) {
    filesize = Math.round(filesize/1048576*100)/100;
    str = filesize + "MB";
  }else{
    filesize = Math.round(filesize/1024*100)/100;
    str = filesize + "KB";
  }
  return str;
}