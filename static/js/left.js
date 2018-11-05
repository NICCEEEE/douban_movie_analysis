var log = function(){
  console.log.apply(console, arguments)
}

var bindUl = function(){
  var ul = $('.left-col ul')
  ul.click(function(event){
    var target = event.target
    var current = $('.left-col li.active')
    current.removeClass('active')
    var newPage = $('div.' + $(target).attr('class'))
    $(target).addClass('active')
    var divs = $('.right-content>div')
    for (var i = 0; i < divs.length; i++) {
      if (!$(divs[i]).hasClass('hide')) {
        $(divs[i]).addClass('hide')
      }
    }
    $(newPage).removeClass('hide')
  })
}

var main = function(){
  bindUl()
}

main()
