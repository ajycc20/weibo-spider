# weibo-spider

## Install & Start

```bash
# clone
git clone https://github.com/ajycc20/weibo-spider.git

# install
npm install

# start
node index
```

## Desc

### config/index.js

```bash
# keywords
the words you want to search

# type 可选类型：全部  热门  原创  关注人  认证用户  媒体  观点
type = '全部'

# sub 可选参数：全部  含图片  含视频  含音乐  含短链
sub = '全部'

# startTime endTime
## eg. 2020年5月1日9时 ~ 2020年5月1日20时
startTime = '2020-05-01-9'
endTime = '2020-05-01-20'

# province city
## view in config/region.json
province = '陕西'
city = '西安'

# provinceAll
## if province == 全部
provinceAll = true

# delay default(10 s)
## download delay
timeDelay = 10
```

### index.js 

```bash
# url
# config/index.js
the page url you want to crawl

# xlsxName
the xlsx flie name

# cookie
your weibo cookie

```

### result
```bash
# generate multiple xlsx files based on page numbers
## eg. 
##### page1.xlsx
##### page2.xlsx
##### page3.xlsx
##### ...
```
