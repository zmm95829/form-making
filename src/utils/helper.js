/**
 * 数组转字符串
 * @param {*} arr 数组
 */
export function arrayToString(arr) {
  let re = "";
  try {
    re = JSON.stringify(arr)
    re = re.substr(1, re.length - 2);
  } catch (e) {
    alert("数组转字符串失败");
    console.error(e);
  }
  return re;
}
/**
 * JSON对象转字符串
 * @param {*} json JSON对象
 */
export function stringToJson(json) {
  let re = json;
  try {
    re = JSON.parse(`${json.replace(/\s/g, "")}`)
  } catch (e) {
    alert("字符串转JSON对象失败");
    console.error(e);
  }
  return re;
}

/**
 * 将json对象转换为格式化的字符串形式
 * @param {*} src 源数据
 * @param {*} space 空格
 * @param {*} isEnd 是否最后一个属性
 */
export function jsonFormat(src, needQuotation = true, space = 0, isEnd = true, lastIsArrAndNotFirst = false) {
  let re = "";
  if (space === 0) {
    src = stringToJson(src);
    if (typeof src === "string") {
      return src;
    }
  }
  switch (Object.prototype.toString.call(src)) {
    case "[object Array]":
      re = "["
      src.forEach((v, index) => {
        re += jsonFormat(v, needQuotation, space, index === src.length - 1, index !== 0);
      })
      re += "]";
      re += isEnd ? "" : ",\n";
      break;
    case "[object Object]":
      re = `${lastIsArrAndNotFirst ? getStringOfTimes(" ", space) : ""}{\n`;
      const keys = Object.keys(src);
      keys.forEach((key, index) => {
        re += `${getStringOfTimes(" ", space + 2)}${needQuotation ? "\"" : ""}${key}${needQuotation ? "\"" : ""}: `;
        re += jsonFormat(src[key], needQuotation, space + 2, index === keys.length - 1);
      });
      re += `\n${getStringOfTimes(" ", space)}}`;
      re += isEnd ? "" : ",\n";
      break;
    case "[object String]":
      re = `"${src}"`;
      re += isEnd ? "" : ",\n";
      break;
    case "[object Number]":
    case "[object Boolean]":
      re = src;
      re += isEnd ? "" : ",\n";
      break;
    default: break;
  }
  return re;
}
function getStringOfTimes(str, times) {
  let re = "";
  for (let i = 0; i < times; i++) {
    re += str;
  }
  return re;
}

/**
 * 每一个基础元素id获取一个路径，返回一个对象
 * @param {*} list 数据数组
 * @param {*} path 当前路径
 */
export function getPath(list, path = "") {
  let re = {};
  list.forEach((item, index) => {
    re = {...re, ...getPathSub(item, `${path ? path + "." : ""}list[${index}]`)};
  })
  return re;
};
/**
 * 给某一个元素获取路径
 * @param {*} item 元素
 * @param {*} path 元素路径
 */
function getPathSub(item, path) {
  let re = {};
  switch (item.type) {
    case "grid":
      item.columns.forEach((v, index) => {
        re = {...re, ...getPath(v.list, `${path}.columns[${index}]`)};
      });
      break;
    case "form":
      re = {...re, ...getPath(item.list, path)};
      break;
    case "collapse":
      item.items.forEach((v, index) => {
        re = {...re, ...getPath(v.top.list, `${path}.items[${index}].top`)};
        re = {...re, ...getPath(v.list, `${path}.items[${index}]`)};
      });
      break;
    default:
      re[item.id] = path + "=" + item.type;
      break;
  }
  return re;
}
/**
 * 对一个对象进行过滤操作
 * @param {*} object 操作对象
 */
export function objectFilter(object, func) {
  console.log(objectFilter)
  const re = { length: 0 };
  try {
    Object.keys(object).forEach(key => {
      if (func(object[key])) {
        re[key] = object[key];
        re.length += 1;
      }
    });
    return re;
  } catch (e) {
    alert("utils.hepler.objectFilter:", e);
    return { length: 0 };
  }
}
