var successRes = {
  "result": 1,
  "success": true,
  "err_msg": "请求处理成功",
  "err_code": 8888
}

var dataTpl = {
  "result": 1,
  "success": true,
  "err_msg": "请求处理成功",
  "err_code": 8888
}

export default {

  inservice: false,
  tests() {
    dataTpl.result = '我是数据测试'
    return dataTpl;
  }
}
