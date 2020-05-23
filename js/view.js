var mainVideoRef, currentVideoId;
var currentType = "";


var secondsToHM = function(duration) {
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

var setTime = function(a) {
    mainVideoRef.currentTime(a);
};

var updateTimeInBox = function() {

    var x = secondsToHM(mainVideoRef.currentTime());
    $("#checkTime span")[0].innerHTML = x

};

//reset counter and uncheck it
var resetViewer = function() {
    document.title = "Dash";
    userRead(false, currentVideoId);
    if (mainVideoRef) {
        mainVideoRef.pause();
        mainVideoRef.src("");
        mainVideoRef.poster("")
    }
    document.getElementById("comments").innerHTML = "";
    $("#checkTime span")[0].innerHTML = "00:00";
    $("#timeCheck")[0].checked = true;
    $("#timeCheck")[0].disabled = "";

};


var openVideo = function(x, vOrA) {
    $("#fileDownload")[0].href = x.path;
    $("#fileDownload")[0].download = x.name;

    $("#bigDownloadBut")[0].href = x.path;

    if (vOrA) {
        mainVideoRef.src(x.path);

    }

    videoName.innerHTML = x.title;
    document.title = x.title + " | Dash"


    $("#infoContainer")[0].innerHTML = "";
    $("#infoContainer")[0].appendChild(infoSort(x));

    $('#comInfoTab').tabs('select_tab', 'comContainer');
    setTimeout(function() {
        window.dispatchEvent(new Event('resize'));
    }, 600);

    userRead(true, x.id);

    showViewer();
};

var infoSort = function(x) {
    var userI = document.createElement("li");
    var nameI = document.createElement("li");
    var titleI = document.createElement("li");
    var dateI = document.createElement("li");
    var timeSinceI = document.createElement("li");
    var commentsI = document.createElement("li");
    var lengthI = document.createElement("li");
    var sizeI = document.createElement("li");
    var typeI = document.createElement("li");
    var pathI = document.createElement("li");



    userI.innerHTML = "Uploaded by " + currentUserInfo[x.user].name;
    nameI.innerHTML = "Name: " + x.name;
    titleI.innerHTML = "Title: " + x.title;
    dateI.innerHTML = "Date: " + x.date;
    timeSinceI.innerHTML = "Uploaded " + timeSince(x.date) + " ago";
    commentsI.innerHTML = "Comments: " + x.comments;
    lengthI.innerHTML = "Length: " + secondsToHM(x.length);
    sizeI.innerHTML = "Size: " + formatBytes(x.size);
    typeI.innerHTML = "Type: " + x.type;
    pathI.innerHTML = "Path: <a href=" + x.path + ">" + x.path + "</a>";

    var listContainer = document.createElement("ul");
    listContainer.classList.add("collection");

    listContainer.appendChild(userI);
    listContainer.appendChild(timeSinceI);
    listContainer.appendChild(nameI);
    listContainer.appendChild(titleI);
    listContainer.appendChild(dateI);
    listContainer.appendChild(commentsI);
    listContainer.appendChild(lengthI);
    listContainer.appendChild(sizeI);
    listContainer.appendChild(typeI);
    listContainer.appendChild(pathI);

    for (i = 0; i < listContainer.children.length; i++) {
        listContainer.children[i].classList.add("collection-item")

    }

    return (listContainer);

};

var enterVideo = function(x) {
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
        $("#commentBox")[0].onclick = function() {
            if (mainVideoRef) {
                mainVideoRef.pause();
            }
        };

        mainVideoRef.poster(i.thumb);

        $("#videoContainer")[0].classList.remove("hide");
        currentType = "video";
        resizeView();

    }

    if (type == "audio") {
        mainVideoRef = videojs("mainAudio");
        openVideo(i, true);
        $("#commentBox")[0].onclick = function() {
            if (mainVideoRef) {
                mainVideoRef.pause();
            }
        };
        // mainVideoRef.play();
        // setTimeout(function() {
        //     mainVideoRef.pause()
        //     mainVideoRef.currentTime(0);
        // }, 40);

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

var playerInit = function() {
    mainVideoRef = videojs("mainVideo");
    //mainAudioRef = videojs("audioContainer");
    $(".vjs-remaining-time")[0].style = "visibility: collapse; width: 0px; padding: 0px;"
    $(".vjs-remaining-time-display").on("DOMSubtreeModified", updateTimeInBox);
    $(".vjs-remaining-time")[1].style = "visibility: collapse; width: 0px; padding: 0px;"
    $(".vjs-remaining-time-display")[1].addEventListener("DOMSubtreeModified", updateTimeInBox);


};

var goToTime = function(x) {
    if (x != null) {
        // mainVideoRef.play();
        // mainVideoRef.pause();
        mainVideoRef.currentTime(x);
    }
};

var showHideCheckComShow = true;
var showHideCheckCom = function() {
    if (showHideCheckComShow) {
        showHideCheckComShow = false;
        $("#hideLabel")[0].innerHTML = "Show";
    } else {
        showHideCheckComShow = true;
        $("#hideLabel")[0].innerHTML = "Hide";
    }


};

$(document).ready(playerInit);