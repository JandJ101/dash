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

};

var showViewer = function () {
    viewer.classList.remove("fadeOutDown");
    viewer.classList.remove("hide");
    viewer.classList.add("fadeInUp");

    $("#uploadBackButton")[0].classList.remove("noOpacity");
    $("#uploadButton")[0].classList.add("noOpacity");
    $("#videoName")[0].classList.remove("noOpacity");
};

var hideViewer = function () {
    viewer.classList.remove("fadeInUp");
    viewer.classList.add("fadeOutDown");
    $("#videoName")[0].classList.add("noOpacity");
    $("#uploadBackButton")[0].classList.add("noOpacity");
    $("#uploadButton")[0].classList.remove("noOpacity");

};


var initializeMenus = function () {
    //upload triggers
    $("#uploadButton")[0].addEventListener("click", showUploadWindow);
    $("#uploadBackButton")[0].addEventListener("click", hideUploadWindow);
    $("#uploadBackButton")[0].addEventListener("click", hideViewer);

};
$(document).ready(initializeMenus);
