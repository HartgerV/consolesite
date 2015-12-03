function textglitch() {
    clrtextglitch();
    var elements = $("ul#lines li");
    $(elements.get(Math.round(elements.length * Math.random() - .5))).addClass("glitch");
}

function clrtextglitch() {
    $(".glitch").removeClass("glitch");
}

function scanglitch() {
    function loop() {
        var i = Math.round(10 * Math.random());
        e.css({
            translate: i + "px"
        }), requestAnimationFrame(loop);
    }
    var e = $("#wrapper").clone().appendTo("#glitchcontainer");
    e.addClass("scanglitch"), e.transit({
        clip: "rect(" + (window.innerHeight - 15) + "px,3830px," + window.innerHeight + "px,0px)"
    }, 3500, "ease-in", function() {
        e.remove();
    }), requestAnimationFrame(loop);
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

function glitchcanvas() {
    function drawGlitchedImageData(image_data) {
        context.putImageData(image_data, 0, 0);
    }
    var canvas = document.getElementById("test"), context = canvas.getContext("2d");
    domvas.toImage(document.getElementById("console"), function() {
        context.drawImage(this, 20, 20);
    });
    var image_data = context.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight), parameters = {
        amount: 10,
        seed: 45,
        iterations: 30,
        quality: 30
    };
    glitch(image_data, parameters, drawGlitchedImageData);
}

setInterval(function() {
    var rand = 100 * Math.random();
    40 > rand ? 10 > rand ? Math.random() > .2 ? verticalscreentear() : horizontalscreentear() : textglitch() : rand > 60 && (clrtextglitch(), 
    rand > 95 && scanglitch());
}, 1500);