var log = function() {
  console.log.apply(console, arguments)
}

var getAnalysis = function(page) {
  if (page.attr('class') === 'First') {
    var myChart = echarts.init(document.getElementById('Analysis_One'));
    myChart.clear()
    myChart.setOption(optionOne);
  } else if (page.attr('class') === 'Third') {
    var myChart = echarts.init(document.getElementById('Analysis_Three'));
    myChart.clear()
    myChart.setOption(optionThree);
  } else if (page.attr('class') === 'Second') {
    var myChart = echarts.init(document.getElementById('Analysis_Two'));
    myChart.clear()
    myChart.setOption(optionTwo);
  }
}

var pageShow = function(){
  var divs = $('.right-content>div')
  for (var i = 0; i < divs.length; i++) {
    if (!$(divs[i]).hasClass('INFO')) {
      if (!$(divs[i]).hasClass('hide')) {
        $(divs[i]).addClass('hide')
      }
    }
  }
}

var bindUl = function() {
  var ul = $('.left-col ul')
  ul.click(function(event) {
    var target = event.target
    var current = $('.left-col li.active')
    current.removeClass('active')
    var newPage = $('div.' + $(target).attr('class'))
    $(target).addClass('active')
    pageShow()
    $(newPage).removeClass('hide')
    getAnalysis(newPage)
  })
}

var main = function() {
  bindUl()
}

main()
