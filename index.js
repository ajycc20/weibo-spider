const superagent = require('superagent')
const fs = require('fs')
const xlsx = require('node-xlsx')
const { JSDOM } = require('jsdom')
const config = require('./config')

const url = `https://s.weibo.com/weibo?q=${config.q}&${config.type}&${config.include}&timescope=custom:${config.timescope}&region=custom:${config.region}&Refer=g`

const xlsxName = `index.xlsx`
const cookie = `your cookie`

function setText(weiboUrl) {
  return superagent
    .get(weiboUrl)
    .set({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7',
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
    })
    .then(res => {
      const { window } = new JSDOM(res.text)
      const $ = require('jquery')(window)

      var userName = $('.name') // 用户名 数组对象
      var userNameArr = Array.from(userName).map(val => val.text.trim()) // 用户名 数组值
  
      var userText = $('.txt') // 用户发言文本 数组对象
      var userTextArr = Array.from(userText).map(val => val.innerHTML) // 用户发言文本
      var regText = /展开全文/g
      var trueTextInfo = userTextArr.filter(val => !regText.test(val))
      var regTag = /<\/?.+?\/?>/g
      var userTextInfo = trueTextInfo.map(val => val.replace(regTag, '')).map(val => val.trim()) // 用户发言文本 数组

      var infoFrom = $('.from') // 用户from 信息数组对象
      var regcreateTime = /(\d{2}月\d{2}日.*?\d{2}:\d{2})|(\d{1}.*?前)/
      var regFrom = /rel="nofollow">(.*?)<\/a>/

      var infoFromArr = Array.from(infoFrom).map(val => val.innerHTML) // 数组值

      var createTime = infoFromArr.map(val => val.match(regcreateTime)).map(val => val[1]) // 创建时间
      var deviceInfo = infoFromArr.map(val => val.match(regFrom)).map(val => val ? val[1] : '') // 设备信息

      var controlPanel = $('.card-act ul li a')
  
      var repeat = controlPanel.filter(val => val % 4 === 1) // 转发数 数组对象
      var repeatArr = Array.from(repeat).map(val => val.text.trim().split(" ")[1]) // 转发数 数组值
  
      var comment = controlPanel.filter(val => val % 4 === 2) // 评论数 数组对象
      var commentArr = Array.from(comment).map(val => val.text.trim().split(" ")[1]) // 评论数 数组值
  
      var star = controlPanel.filter(val => val % 4 === 3) // 点赞数 数组对象
      var starArr = Array.from(star).map(val => val.text.trim()) // 点赞数 数组值
  
      var pageInfoArr = []
  
      for (let i = 0; i < userNameArr.length; i++) {
        pageInfoArr.push([userNameArr[i], userTextInfo[i], createTime[i], deviceInfo[i], repeatArr[i], commentArr[i], starArr[i]])
      }

      var title = ['name', 'text', 'createTime', 'deviceInfo', 'repeat', 'comment', 'star']

      var arr = []

      arr.push(title)
      arr = arr.concat(pageInfoArr)

      writeXls(arr)

      function writeXls(datas) {
        let buffer = xlsx.build([
          {
            name: 'sheet1',
            data: datas
          }
        ])
        fs.writeFile(`./${xlsxName}`, buffer, err => {
          if (err) {
            console.log(err)
          } else {
            console.log('OK')
          }
        })
      }
      
    })
}

setText(url)
