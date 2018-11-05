var log = function(){
  console.log.apply(console, arguments)
}

var bindUl = function(){
  var ul = $('.left-col ul')
  ul.click(function(event){
    var target = event.target
    var current = $('.left-col li.active')
    current.removeClass('active')
    $(target).addClass('active')
  })
}

var main = function(){
  bindUl()
}

main()
