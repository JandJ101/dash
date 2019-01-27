var showAuth = function () {
    app.classList.add("noOpacity");
    $("#authContainer")[0].classList.remove("bounceOutUp");
    $("#authContainer")[0].classList.remove("hide");
    $("#authContainer")[0].classList.add("fadeInDown");

};

var hideAuth = function () {
    $("#authContainer")[0].classList.remove("fadeInDown");
    $("#authContainer")[0].classList.add("bounceOutUp");


};

var shakeAuth = function () {
    $("#authBox")[0].classList.remove("shake");
    setTimeout(function () {
        $("#authBox")[0].classList.add("shake");
    }, 50);


}

var showUploadWindow = function () {
    $("#uploadWindow")[0].classList.remove("hide");
    $("#uploadWindow")[0].classList.remove("slideOutRight");
    $("#uploadWindow")[0].classList.add("slideInRight");
    $("#uploadBackButton")[0].classList.remove("noOpacity");


};

var hideUploadWindow = function () {
    $("#uploadWindow")[0].classList.remove("slideInRight");
    $("#uploadWindow")[0].classList.add("slideOutRight");
    $("#uploadBackButton")[0].classList.add("noOpacity");

    mainVideoRef.pause();
};

var showViewer = function () {
    viewer.classList.remove("fadeOutDown");
    viewer.classList.remove("hide");
    viewer.classList.add("fadeInUp");

    $("#videoName")[0].classList.remove("hide");
    $("#uploadBackButton")[0].classList.remove("hide");
    $("#uploadBackButton")[0].classList.remove("noOpacity");
    $("#uploadButton")[0].classList.add("noOpacity");
    $("#videoName")[0].classList.remove("noOpacity");
    $("#smallLogo")[0].classList.add("noOpacity");

};

var hideViewer = function () {
    $("#viewer")[0].classList.remove("fadeInUp");
    $("#viewer")[0].classList.add("fadeOutDown");
    $("#videoName")[0].classList.add("noOpacity");
    $("#uploadBackButton")[0].classList.add("noOpacity");
    $("#uploadButton")[0].classList.remove("noOpacity");
    $("#smallLogo")[0].classList.remove("noOpacity");
    resetViewer();
    setTimeout(function () {
        $("#uploadBackButton")[0].classList.add("hide");
        $("#videoName")[0].classList.add("hide");
    }, 300);

};

var initializeMenus = function () {
    //upload triggers
    $("#uploadButton")[0].addEventListener("click", showUploadWindow);
    $("#uploadBackButton")[0].addEventListener("click", hideUploadWindow);
    $("#uploadBackButton")[0].addEventListener("click", hideViewer);

};
$(document).ready(initializeMenus);
