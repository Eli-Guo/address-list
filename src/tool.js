import Vue  from 'vue'
//import moke from './mokeconfig'

//const mokeData = Vue.__Developing ? moke : {};

if (Vue.__Developing) {
  console.warn('开发完成请卸载moke数据');
}

function aJax (arg) {

  let urls = arg.url.split('.');

  let realUrl = Vue.apiConfig;

  for (let i = 0, len = urls.length; i < len; i++){
    realUrl = realUrl[urls[i]];
  }

  realUrl = Vue.__Bathpath + realUrl;

  let options = {
    url: realUrl,
    data: arg.data,
    method: arg.method || Vue.__HttpMethod,
    success: arg.success || function () {},
    error: arg.error || function () {}
  };

  if (!!urls[1] && moke[urls[1]] && moke[urls[1]].inservice){

    function mokeTest(prop) {

      let mokeData = moke;

      for (let i = 1; i < urls.length; i++){

        if(typeof(moke[urls[i]]) == 'function') {
          mokeData = moke[urls[i]](prop)
        }else {
          mokeData = moke[urls[i]]
        }

      }

      return {
        data: mokeData.result,
        res: {
          data: mokeData
        }
      }

    }

    var mokeData = mokeTest(arg.data);

    options.success(mockdata.data,mockdata.res);
    return;
  }

  Vue.http({
    url: options.url,
    data: options.data,
    method: options.method,
    headerse: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (res) {

    if (!res.data.err_code){

      options.success(res.data,res)

    }else if(res.data.err_code-0 == 4444) {

      window.localStorage.removeItem('hashLogin');
      window.location.reload();

    }else {

      options.error(res.data.err_msg)

    }

  }, function (res) {

    options.error(res.statusText)

  })

}

function install(Vue) {

  Vue.Tool = Vue.tool = {
    aJax
  }

  Object.defineProperties(Vue.prototype,{

    $Tool: {
      get: function () {
        return Vue.Tool;
      }
    }

  });

}

if(window.Vue) {

  Vue.use(install)

}

module.exports = install;



