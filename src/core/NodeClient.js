/**
 * Created by weileizhe on 17/9/6.
 */
import request from 'request';

class NodeClient {

  remote (options) {
    const that = this;
    let {url, method, ...other} = options
    return new Promise((resolve, reject) => {
      if (!url) {
        throw new Error('[http]request url is necessary!');
      }

      request({
        method: method || 'GET',
        url,
        ...other,
      },function (error,response,body) {
        if(!error && response.statusCode < 300) {
          resolve(body);
        } else {
          that.httpErrorHandle(error,reject);
        }
      });
    })
  }

  get(url,options) {
    return this.remote({
      ...options,
      url,
      method: "GET",
    });
  }

  post(url,options) {
    return this.remote({
      ...options,
      url,
      method: 'POST',
    })
  }

  put(url,options) {
    return this.remote({
      ...options,
      url,
      method: 'PUT',
    })
  }

  delete(url,options) {
    return this.remote({
      ...options,
      url,
      method: 'DELETE',
    });
  }


  httpErrorHandle (err,reject) {
    console.log(err);
    reject && reject(err);
  }
}

export default new NodeClient()