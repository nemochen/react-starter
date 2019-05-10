/**
 * Object to url args
 * TODO: 需要一个反向转的逻辑
 * @param  {Object} obj 参数对象
 * @return {String}     转换后的参数
 */
const param = obj => {
  const str = [];
  const paramStr = [];

  const paramHandle = (paramObj, keyName) => {
    let type = Object.prototype.toString.call(paramObj);

    if (type === '[object String]' || type === '[object Number]') {
      str.push([keyName, paramObj]);
    } else if (type === '[object Boolean]' || type === '[object Null]') {
      str.push([keyName, paramObj || '']);
    } else {
      for (const key in paramObj) {
        type = Object.prototype.toString.call(paramObj[key]);
        if (type === '[object Object]') {
          paramHandle(paramObj[key], keyName ? `${keyName}[${key}]` : key);
        } else if (type === '[object Array]') {
          paramObj[key].map((v, k) => {
            paramHandle(v, keyName ? `${keyName}[${key}][${k}]` : `${key}[${k}]`);
          });
        } else if (type === '[object Boolean]' || type === '[object Null]') {
          str.push([keyName ? `${keyName}[${key}]` : key, paramObj[key] || '']);
        } else {
          str.push([keyName ? `${keyName}[${key}]` : key, paramObj[key]]);
        }
      }
    }
  };

  paramHandle(obj);

  str.map(v => {
    paramStr.push(`${encodeURIComponent(v[0])}=${encodeURIComponent(v[1])}`);
  });

  return paramStr.join('&');
};

export default param;
