setInterval(function(){
    var rand= Math.random()*100;
    if(rand<30) {
        $('.glitch').removeClass('glitch');
    }
    if(rand>80){
        $('.glitch').removeClass('glitch');
        var elements = $('ul#lines li');
        $(elements.get(
            Math.round (elements.length*Math.random()-0.5)
        )).addClass ('glitch');
    }
} ,1000);
setInterval(function() {
    var rand = Math.random() * 100;
    if (rand < 10) {
        var e = $('.console').clone().appendTo('body');
        i = 0;
        var interval = setInterval(function () {
            e.css({"clip": "rect(" + i + "px,3830px," + (i + 15) + "px,0px)"});
            e.css({"left": Math.round(Math.random() * 10) + "px"});
            i++;
            if (i > window.innerHeight) {
                e.remove();
                window.clearInterval(interval);
            }
        }, 10);

    }
}, 5000);