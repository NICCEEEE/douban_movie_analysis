var photos = [
  '上帝之城',
  '一一',
  '东京教父',
  '二手狮王',
  '千与千寻',
  '可可西里',
  '告白',
  '大宅门',
  '大鱼',
  '奇迹男孩',
  '少年派的奇幻漂流',
  '忠犬八公的故事',
  '悲惨世界',
  '战争之王',
  '摔跤吧！爸爸',
  '放牛班的春天',
  '熔炉',
  '猫鼠游戏',
  '盗梦空间',
  '禁闭岛',
  '三块广告牌',
  '入殓师',
  '冬之蝉',
  '开心家族',
  '无主之地',
  '消失的爱人',
  '真爱至上',
  '简爱',
  '花样年华',
  '让子弹飞',
]

var bindChange = function() {
  var list = [1, 2, 3]
  var change = $('#change')
  change.click(function() {
    for (var i = 0; i < list.length; i++) {
      var random = Math.floor(Math.random() * 30)
      var name = photos[random]
      var selector = `div[data-p1="img${list[i]}"]`
      var img = $(selector).find('img')
      var span = $(selector).find('span')
      var src = `img/${name}`
      img.attr('src', src + '.jpg')
      span.text(name)
    }
  })
}

var bindAnalysis = function() {
  var btn = $('#analysis')
  btn.click(function() {
    var home = $('li.HOME')
    var nextPage = $('div.First')
    var nextLi = $('li.First')
    btn.closest('.HOME').addClass('hide')
    home.removeClass('active')
    nextPage.removeClass('hide')
    nextLi.addClass('active')
    var myChart = echarts.init(document.getElementById('Analysis_One'));
    myChart.clear()
    myChart.setOption(optionOne);
  })
}

var searchData = function(value) {
  var lis = $('.searchTo>ul li')
  for (var i = 0; i < lis.length; i++) {
    if (value === '') {
      $(lis[i]).show()
    } else {
      if ($(lis[i]).text().includes(value)) {
        $(lis[i]).show()
      } else {
        $(lis[i]).hide()
      }
    }
  }
}

var bindSearch = function() {
  var input = $('input[name="search"]')
  input.on('keyup', function() {
    var value = input.val()
    searchData(value)
  })
}

var bindDirList = function() {
  var ul = $('ul.list-group')
  ul.click(function(event){
    var target = event.target
    var current = ul.find('li.active')
    current.removeClass('active')
    $(target).addClass('active')
    var works = directors[$(target).text()].work
    var rates = directors[$(target).text()].rate
    var optionTwo = {
        title: {
            text: '评分曲线图'
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: works
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'电影评分',
                type:'line',
                stack: '总量',
                data:rates
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('Analysis_Two'));
    myChart.clear()
    myChart.setOption(optionTwo);
  })
}

var main = function() {
  bindChange()
  bindAnalysis()
  bindSearch()
  bindDirList()
}

main()
