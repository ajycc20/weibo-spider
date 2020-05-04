
var isTopic = true // 如果是 #话题# 类型 则true
var searchWords = ''
var keywords = encodeURI(searchWords)

var typeList = require('./typelist.json')
// 可选类型：全部  热门  原创  关注人  认证用户  媒体  观点
var type = ''

var subList = require('./sublist.json')
// 可选参数：全部  含图片  含视频  含音乐  含短链
var sub = ''

// timescope=custom:2020-05-01-0:2020-05-03-9
var startTime = '' // yyyy-mm-dd-h
var endTime = '' // yyyy-mm-dd-h


var area = require('./region.json') // 陕西西安
var province = '' // 省份
var city = '' // 城市

var provinceAll = true // 如果province == 全部, 则provinceAll = true

// 下载时间间隔 单位：秒(s)
var timeDelay = 10 // default

var pageConfig = {
  'q': isTopic ? `%23${keywords}%23` : `${keywords}`,
  'type': `${typeList[type]}`,
  'include': `${subList[sub]}`,
  'timescope':`${startTime}:${endTime}`,
  'region': provinceAll ? ``: `${area[province].code}:${area[province].city[city]}`,
  'delay': timeDelay * 1000
}

module.exports = pageConfig
