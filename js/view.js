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
    if (mainVideoRef) {
        mainVideoRef.pause();
        mainVideoRef.src("");
    }
    document.getElementById("comments").innerHTML = "";
    $("#checkTime span")[0].innerHTML = "00:00";
    $("#timeCheck")[0].checked = true;
    $("#timeCheck")[0].disabled = "";

};


var openVideo = function (x, vOrA) {
    $("#fileDownload")[0].href = x.path;
    $("#fileDownload")[0].download = x.name;

    $("#bigDownloadBut")[0].href = x.path;

    if (vOrA) {
        mainVideoRef.src(x.path);

    }

    videoName.innerHTML = x.title;

    showViewer();
};


var enterVideo = function (x) {
    var i = videoData[x];
    var extension = i.name.split(".")[i.name.split(".").length - 1];
    var type = i.type;

    currentType = "";

    //hide all players
    $("#notSupported")[0].classList.add("hide");
    $("#imgViewer")[0].classList.add("hide");
    $("#videoContainer")[0].classList.add("hide");
    $("#audioContainer")[0].classList.add("hide");

    if (type == "image") {
        $("#imgViewer")[0].src = i.path;
        openVideo(i);
        $("#commentBox")[0].onclick = null;
        $("#imgViewer")[0].classList.remove("hide");
        $("#timeCheck")[0].checked = false;
        $("#timeCheck")[0].disabled = "disabled";

    }

    if (type == "video") {
        mainVideoRef = videojs("mainVideo");
        openVideo(i, true);
        $("#commentBox")[0].onclick = function () {
            if (mainVideoRef) {
                mainVideoRef.pause();
            }
        };

        mainVideoRef.play();
        setTimeout(function () {
            mainVideoRef.pause();
            mainVideoRef.currentTime(0);
        }, 40);

        $("#videoContainer")[0].classList.remove("hide");
        currentType = "video";
        resizeView();

    }

    if (type == "audio") {
        mainVideoRef = videojs("mainAudio");
        openVideo(i, true);
        $("#commentBox")[0].onclick = function () {
            if (mainVideoRef) {
                mainVideoRef.pause();
            }
        };
        mainVideoRef.play();
        setTimeout(function () {
            mainVideoRef.pause()
            mainVideoRef.currentTime(0);
        }, 40);

        $("#audioContainer")[0].classList.remove("hide");




    }

    if (type == "unknown") {
        mainVideoRef = null;
        $("#commentBox")[0].onclick = null;
        $("#notSupported")[0].classList.add("hide");
        openVideo(i);
        $("#notSupported")[0].classList.remove("hide");
        $("#timeCheck")[0].checked = false;
        $("#timeCheck")[0].disabled = "disabled";

    }

    currentVideoId = i.id;
    updateComments(String(currentVideoId));


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

var showHideCheckComShow = true;
var showHideCheckCom = function () {
    if (showHideCheckComShow) {
        showHideCheckComShow = false;
        $("#hideLabel")[0].innerHTML = "Show";
    } else {
        showHideCheckComShow = true;
        $("#hideLabel")[0].innerHTML = "Hide";
    }


};

$(document).ready(playerInit);
