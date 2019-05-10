/**
 * fetch作为一个 redux 中间件异步处理网络请求
 */
import fetch from 'isomorphic-fetch';
import keyMirror from 'keymirror';
import param from '../utils/urlParam';

export const CALL_API = Symbol('CALL_API');
// 返回reducer的action请求类型
export const ACTION_TYPES = keyMirror({
  // 服务器错误
  FETCH_SERVER_ERROR: null
});

/**
 * 模拟Promise 类
 *
 * 该类实现自动给传入的promise实例，调用then 方法时，主动加入了一个onReject参数 promise.then(onResolve, onReject)
 * 同时支持自定义传入catch方法 或者 onReject 函数
 * 可以解决不传入onReject函数，或导致JS报错的问题
 * 构造函数需要传入一个Promise实例作为，初始化条件
 */
class PromiseSimulator {
  constructor(promise) {
    if (!promise) throw new Error('Promise instance required.');
    this.promise = promise;
  }

  loop(e) {
    this.catchedError = e;
  }

  then(then, catchFn) {
    if (!catchFn) {
      catchFn = e => this.loop(e);
    }

    this.promise.then(then, catchFn);
    return this;
  }

  catch(catchFn) {
    this.promise.catch(catchFn);
    return this;
  }
}

const checkStatus = async response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  error.response = response;
  throw error;
};

const remote = options => {
  const fetchOptions = {};

  options.method = options.method || 'POST';
  const method = options.method.toUpperCase();
  const contentType = method === 'GET' ? 'text/plain; charset=UTF-8' : 'application/json';

  fetchOptions.headers = {
    'Content-Type': contentType,
    // header param...
    'Access-Control-Allow-Origin': 'http://118.123.251.115',
    'Access-Control-Allow-Credentials': true
  };
  fetchOptions.credentials = 'include';

  const params = {
    ...options.data,
    ...options.urlParam
  };

  let concatStr = '?';
  const queryStr = param(params);

  if (options.url.indexOf(concatStr) > -1) {
    concatStr = '&';
  }

  if (queryStr) {
    if (method === 'GET') {
      options.url += concatStr + queryStr;
    } else {
      fetchOptions.body = JSON.stringify(params);
    }
  }

  fetchOptions.method = options.method;

  const t = fetch(options.url, fetchOptions)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => {
      return json || {};
    })
    .catch(e => {
      return Promise.reject(e);
    });

  return new PromiseSimulator(t);
};

// -----------------------------
// fetch middleware
// -----------------------------
export default () => next => action => {
  const callAPI = action[CALL_API];

  // 普通的 Action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  // 参数
  let {
    // request dataType 默认为json
    type
  } = callAPI;

  // 参数
  const {
    // request url
    url,
    // Content-type
    contentType,
    // request data
    data,
    // url参数
    urlParam,
    // 异常
    hideError,
    // 中间参数,该参数不会被提交到request,在reducer里可获取
    args,
    // request method 默认为POST
    method,
    // 请求成果回调函数 result => {}
    success,
    // 请求失败回调函数 result => {}
    fail
  } = callAPI;

  if (!type) type = Date.now();

  const createNewAction = pData => {
    const newAction = {
      ...action,
      ...pData
    };

    delete newAction[CALL_API];
    return newAction;
  };

  // 返回reducer的action类型:[请求, 成功, 失败]
  const [typeRequesting, typeSuccess, typeFail] = [`REQUESTING_${type}`, type, `FAIL_${type}`];

  next(
    createNewAction({
      type: typeRequesting,
      args,
      request: data,
      urlParam
    })
  );

  return remote({
    url,
    contentType,
    data,
    urlParam,
    hideError,
    method
  })
    .then(
      r => {
        switch (r.code) {
          // 成功
          case 0:
            success && success(r.data, r.code, r.message);
            next(
              createNewAction({
                type: typeSuccess,
                data: r.data,
                message: r.message,
                args,
                urlParam,
                request: data
              })
            );
            break;
          // 失败
          default:
            fail && fail(r.data, r.code, r.message);
            next(
              createNewAction({
                type: typeFail,
                data: r.data,
                code: r.code,
                message: r.message,
                args,
                urlParam,
                request: data
              })
            );
            break;
        }
      }
    )
    .catch(e => {
      fail && fail(e.data, e.code, e.message);
      next(
        createNewAction({
          type: typeFail,
          code: e.code,
          message: e.message,
          args,
          urlParam,
          request: data
        })
      );
    });
};
