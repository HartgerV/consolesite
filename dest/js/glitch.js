setInterval(function() {
    var rand = 100 * Math.random();
    if (30 > rand && $(".glitch").removeClass("glitch"), rand > 80) {
        $(".glitch").removeClass("glitch");
        var elements = $("ul#lines li");
        $(elements.get(Math.round(elements.length * Math.random() - .5))).addClass("glitch");
    }
}, 1e3), setInterval(function() {
    var rand = 100 * Math.random();
    if (10 > rand) {
        var e = $(".console").clone().appendTo("body");
        i = 0;
        var interval = setInterval(function() {
            e.css({
                clip: "rect(" + i + "px,3830px," + (i + 15) + "px,0px)"
            }), e.css({
                left: Math.round(10 * Math.random()) + "px"
            }), i++, i > window.innerHeight && (e.remove(), window.clearInterval(interval));
        }, 10);
    }
}, 5e3);