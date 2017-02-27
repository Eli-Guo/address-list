require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var fs = require('fs')
var url = require('url')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
//read json
var appData = require('../data.json');
var datas = appData.datas;
var coldat = appData.collect;
console.log(datas)

var apiRoutes = express.Router();

apiRoutes.get('/data',function (req,res) {
  res.json({
    errno:0,
    data:datas
  });
});
apiRoutes.get('/datac',function (req,res) {
  res.json({
    errno:0,
    data:coldat
  });
});
apiRoutes.get('/setdata',function (req,res) {
  var loca = url.parse(req.url,true).query;
  var obj = {
    "title": loca.name,
    "txt": loca.num,
    "src": loca.img,
    "iscol": false
  };
  datas.push(obj);
  console.log(datas);
  res.send("ok");
});
apiRoutes.get('/deldata',function (req,res) {
  var idx = url.parse(req.url,true).query.idx;
  datas.splice(idx,1);
  res.send("ok");
});
apiRoutes.get('/changedata',function (req,res) {
  var idx = url.parse(req.url,true).query.idx;
  var num = url.parse(req.url,true).query.num;
  datas[idx].txt = num;
  res.send("ok");
});
apiRoutes.get('/addcol',function (req,res) {
  var loca = url.parse(req.url,true).query;
  var obj = {
    "title": loca.name,
    "txt": loca.num,
    "src": loca.img,
    "idx": loca.idx,
    "iscol": loca.col
  };
  coldat.push(obj);
  for (var i = 0; i < datas.length; i++){
    if (datas[i].title == loca.name){
      datas[i].iscol = true;
      console.log(1)
    }
  }
  res.json({
    error: 0,
    data: ''
  })
});
apiRoutes.get('/remcol',function (req,res) {
  var idx = url.parse(req.url,true).query.idx;
  for (var i = 0; i < coldat.length; i++){
    if (coldat[i].title == idx){
      coldat.splice(i,1);
    }
  }
  for (var i = 0; i < datas.length; i++){
    if (datas[i].title == idx ){
      datas[i].iscol = false;
      console.log(2)
    }
  }
  res.json({
    error: 0,
    data: ''
  })
});

app.use('/api',apiRoutes);
//end
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    // opn(uri)
  }
})
