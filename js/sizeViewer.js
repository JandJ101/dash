var getRatio = function (w, h) {
    var r = 16 / 9;
    var wid, hi;

    if (w) {
        wid = w;
        hi = w / r;
    } else {
        hi = h;
        wid = h * r;
    }

    var val = {};
    val.h = hi;
    val.w = wid;

    return (val);

};

var cont, hc, wc, vid, hvideo, wvideo;

var resizeView = function () {
    if (currentType == "video") {
        cont = $("#videoContainer")[0];
        hc = cont.offsetHeight;
        wc = cont.offsetWidth;

        vid = $("#mainVideo")[0];
        hvideo = vid.offsetHeight;
        wvideo = vid.offsetWidth;

        var wh;
        var cwh = getRatio(wc);


        if (cwh.h > hc) {
            wh = getRatio(null, hc);

            vid.style.height = wh.h;
            vid.style.width = wh.w;

        } else {
            wh = getRatio(wc, null);

            vid.style.height = wh.h;
            vid.style.width = wh.w;


        }

    }

};

$(document).ready(function () {
    $(window).resize(resizeView);

})
