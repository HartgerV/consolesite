setInterval(function(){
   var rand = Math.random()*100;
    if(rand<40) {
        if(rand < 10) {
            (Math.random()>0.2) ? verticalscreentear() : horizontalscreentear();
        }
        else {
            textglitch();
        }
    }
    else if(rand>60) {
        clrtextglitch();
        if(rand>95) {
            scanglitch();
        }
    }
},1500);
function textglitch() {
        clrtextglitch();
        var elements = $('ul#lines li');
        $(elements.get(
            Math.round(elements.length * Math.random() - 0.5)
        )).addClass('glitch');
}
function clrtextglitch() {
    $('.glitch').removeClass('glitch');
}
function scanglitch() {
        var e = $('#wrapper').clone().appendTo('#glitchcontainer');
        var i = 0;
        e.css({"clip": "rect(" + i + "px,3830px," + (i + 15) + "px,0px)"});
        e.css("z-index",200);
        var interval = setInterval(function () {
            e.css({"clip": "rect(" + i + "px,3830px," + (i + 15) + "px,0px)"});
            e.css({"left": Math.round(Math.random() * 10) + "px"});
            i+=4;
            if (i > window.innerHeight) {
                e.remove();
                window.clearInterval(interval);
            }
        }, 40);
}
function verticalscreentear() {
        var c = $('.console');
        var w = window.innerWidth;
        var x = Math.round(w / 2 + (Math.random() - 0.5) * w);
        var e = c.clone().appendTo('#glitchcontainer');
        e.css("z-index", 200);
        e.css({"clip": "rect(0px,3830px,3830px," + x + "px)"});
        c.css({"clip": "rect(0px," + x + "px,3830px,0px)"});
        for (var i = 0; i < 100; i++) {
            e.css({"top": Math.round((Math.random() - 0.5) * 40) + "px"});
        }
        setTimeout(function () {
            e.remove();
            c.css("clip", "auto");
        }, 100);
}
function horizontalscreentear() {
    var c = $('.console');
    var h = window.innerHeight;
    var x = Math.round(h / 2 + (Math.random() - 0.5) * h);
    var e = c.clone().appendTo('#glitchcontainer');
    e.css("z-index", 200);
    e.css({"clip": "rect("+x+"px,3830px,3830px,0px)"});
    c.css({"clip": "rect(0px,3830px," + x + "px,0px)"});
    for (var i = 0; i < 100; i++) {
        e.css({"left": Math.round((Math.random() - 0.5) * 40) + "px"});
    }
    setTimeout(function () {
        e.remove();
        c.css("clip", "auto");
    }, 100);
}
