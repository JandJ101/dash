var mainVideoRef, currentVideoId;
var currentType = "";


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
var resetViewer = function () {
    mainVideoRef.pause();
    mainVideoRef.src("");
    $("#checkTime span")[0].innerHTML = "00:00";

    $("#timeCheck")[0].checked = true;
    $("#timeCheck")[0].disabled = "";

};


var openVideo = function (Path, Name, id, thumb) {
    mainVideoRef.src(Path);
    videoName.innerHTML = Name;

    showViewer();
};


var enterVideo = function (x) {
    var i = videoData[x];
    var extension = i.name.split(".")[i.name.split(".").length - 1];
    var type = i.type;

    console.log(i);

    //hide all players
    $("#imgViewer")[0].classList.add("hide");
    $("#videoContainer")[0].classList.add("hide");
    $("#audioContainer")[0].classList.add("hide");

    if (type == "image") {
        $("#imgViewer")[0].src = i.path;
        openVideo(null, i.title);
        $("#imgViewer")[0].classList.remove("hide");
        $("#timeCheck")[0].checked = false;
        $("#timeCheck")[0].disabled = "disabled";

    }

    if (type == "video") {
        mainVideoRef = videojs("mainVideo");
        openVideo(i.path, i.title);
        $("#videoContainer")[0].classList.remove("hide");


    }

    if (type == "audio") {
        mainVideoRef = videojs("mainAudio");
        openVideo(i.path, i.title);
        $("#audioContainer")[0].classList.remove("hide");

        console.log(i.path);


    }

    if (i.name.split(".") == "jpg") {
        var type = "img";
    }

    currentVideoId = i.id;
    updateComments(String(currentVideoId));
    console.log(type);


};

var playerInit = function () {
    mainVideoRef = videojs("mainVideo");
    //mainAudioRef = videojs("audioContainer");
    $(".vjs-remaining-time")[0].style = "visibility: collapse; width: 0px; padding: 0px;"
    $(".vjs-remaining-time-display").on("DOMSubtreeModified", updateTimeInBox);
    $(".vjs-remaining-time")[1].style = "visibility: collapse; width: 0px; padding: 0px;"
    $(".vjs-remaining-time-display")[1].addEventListener("DOMSubtreeModified", updateTimeInBox);


};

var goToTime = function (x) {
    if (x != null) {
        mainVideoRef.play();
        mainVideoRef.pause();
        mainVideoRef.currentTime(x);
    }
};


$(document).ready(playerInit);
