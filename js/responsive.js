var isSmall;
var handleViewerResize = function() {
    var width = window.innerWidth;
    $('.dropdown-button').dropdown('close');

    isSmall = false;

    if (width < 800) {
        isSmall = true;
    }

    if (isSmall) {
        $("#viewer")[0].classList.remove("bigViewer");
        $("#viewer")[0].classList.add("smallViewer");

        $("#viewer")[0].classList.add("scroller");
        $("#viewer")[0].classList.add("scrollbar");

        $("#comments")[0].classList.remove("scroller");
        $("#comments")[0].classList.remove("scrollbar");
        $("#comments")[0].classList.remove("h100");

        $("#infoContainer")[0].classList.remove("scroller");
        $("#infoContainer")[0].classList.remove("scrollbar");
        $("#infoContainer")[0].classList.remove("h100");
    } else {
        $("#viewer")[0].classList.remove("smallViewer");
        $("#viewer")[0].classList.add("bigViewer");

        $("#viewer")[0].classList.remove("scroller");
        $("#viewer")[0].classList.remove("scrollbar");

        $("#comments")[0].classList.add("scroller");
        $("#comments")[0].classList.add("scrollbar");
        $("#comments")[0].classList.add("h100");

        $("#infoContainer")[0].classList.add("scroller");
        $("#infoContainer")[0].classList.add("scrollbar");
        $("#infoContainer")[0].classList.add("h100");
    }
};

$(window).resize(handleViewerResize);
$(document).ready(handleViewerResize);