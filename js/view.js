var mainVideoRef;

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

var openVideo = function (Path, Name, id, thumb) {
    mainVideoRef.src(Path);
    videoName.innerHTML = Name;

    showViewer();
};


var enterVideo = function (x) {
    var i = videoData[x];
    openVideo(i.path, i.name);

};


var playerInit = function () {
    mainVideoRef = videojs("mainVideo");
    $(".vjs-remaining-time")[0].style = "visibility: collapse; width: 0px; padding: 0px;"
    $(".vjs-remaining-time-display").on("DOMSubtreeModified", updateTimeInBox);

};


$(document).ready(playerInit);
