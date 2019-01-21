/*var createVidViewer = function () {
    var doc = $("#playerRef")[0];
    doc = doc.childNodes[1];
    doc.id = "player";
    return (doc);

};*/

var createImgViewer = function (path) {
    var imageViewer = document.createElement("img");
    imageViewer.src = path;
    imageViewer.id = "imgViewer";
    imageViewer.classList.add("hide");
    return (imageViewer);

};
