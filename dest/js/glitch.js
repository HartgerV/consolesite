function textglitch() {
    clrtextglitch();
    var elements = $("ul#lines li");
    $(elements.get(Math.round(elements.length * Math.random() - .5))).addClass("glitch");
}

function clrtextglitch() {
    $(".glitch").removeClass("glitch");
}

function scanglitch() {
    var e = $("#wrapper").clone().appendTo("#glitchcontainer"), i = 0;
    e.css({
        clip: "rect(" + i + "px,3830px," + (i + 15) + "px,0px)"
    }), e.css("z-index", 200);
    var interval = setInterval(function() {
        e.css({
            clip: "rect(" + i + "px,3830px," + (i + 15) + "px,0px)"
        }), e.css({
            left: Math.round(10 * Math.random()) + "px"
        }), i += 4, i > window.innerHeight && (e.remove(), window.clearInterval(interval));
    }, 40);
}

function verticalscreentear() {
    var c = $(".console"), w = window.innerWidth, x = Math.round(w / 2 + (Math.random() - .5) * w), e = c.clone().appendTo("#glitchcontainer");
    e.css("z-index", 200), e.css({
        clip: "rect(0px,3830px,3830px," + x + "px)"
    }), c.css({
        clip: "rect(0px," + x + "px,3830px,0px)"
    });
    for (var i = 0; 100 > i; i++) e.css({
        top: Math.round(40 * (Math.random() - .5)) + "px"
    });
    setTimeout(function() {
        e.remove(), c.css("clip", "auto");
    }, 100);
}

function horizontalscreentear() {
    var c = $(".console"), h = window.innerHeight, x = Math.round(h / 2 + (Math.random() - .5) * h), e = c.clone().appendTo("#glitchcontainer");
    e.css("z-index", 200), e.css({
        clip: "rect(" + x + "px,3830px,3830px,0px)"
    }), c.css({
        clip: "rect(0px,3830px," + x + "px,0px)"
    });
    for (var i = 0; 100 > i; i++) e.css({
        left: Math.round(40 * (Math.random() - .5)) + "px"
    });
    setTimeout(function() {
        e.remove(), c.css("clip", "auto");
    }, 100);
}

setInterval(function() {
    var rand = 100 * Math.random();
    40 > rand ? 10 > rand ? Math.random() > .2 ? verticalscreentear() : horizontalscreentear() : textglitch() : rand > 60 && (clrtextglitch(), 
    rand > 95 && scanglitch());
}, 1500);