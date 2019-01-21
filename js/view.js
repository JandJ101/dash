var mainVideoRef, currentVideoId;
var currentType = "";
var imgTypes = ["jpg", "jpeg", "png", "gif", "svg", "bmp", "ico"];

var secondsToHM = function (duration) {
    duration *= 1000;

    var //milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        //hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
};

var setTime = function (a) {
    mainVideoRef.currentTime(a);
};

var updateTimeInBox = function () {

    var x = secondsToHM(mainVideoRef.currentTime());
    $("#checkTime span")[0].innerHTML = x

};

//reset counter and uncheck it


var openVideo = function (Path, Name, id, thumb) {
    mainVideoRef.src(Path);
    videoName.innerHTML = Name;

    showViewer();
};


var enterVideo = function (x) {
    var i = videoData[x];
    var extension = i.name.split(".")[1];
    var type = "video";
    for (a = 0; a < imgTypes.length; a++) {
        if (imgTypes[a] == extension) {
            type = "image";
        }

    }

    //hide all players
    $("#imgViewer")[0].classList.add("hide");
    $("#videoContainer")[0].classList.add("hide");

    if (type == "image") {
        $("#imgViewer")[0].src = i.path;
        openVideo(null, i.title);
        $("#imgViewer")[0].classList.remove("hide");

    }

    if (type == "video") {
        openVideo(i.path, i.title);
        $("#videoContainer")[0].classList.remove("hide");

    }

    if (i.name.split(".") == "jpg") {
        var type = "img";
    }

    currentVideoId = i.id;
    updateComments(String(currentVideoId));


};

var playerInit = function () {
    mainVideoRef = videojs("mainVideo");
    $(".vjs-remaining-time")[0].style = "visibility: collapse; width: 0px; padding: 0px;"
    $(".vjs-remaining-time-display").on("DOMSubtreeModified", updateTimeInBox);


};

var goToTime = function (x) {
    mainVideoRef.play();
    mainVideoRef.pause();
    mainVideoRef.currentTime(x);

};


$(document).ready(playerInit);
