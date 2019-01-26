function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
        type: mimeString
    });
}

//var makeThumbanil = function (file) {
//
//    var _CANVAS = document.querySelector("#video-canvas"),
//        _CTX = _CANVAS.getContext("2d"),
//        _VIDEO = document.querySelector("#main-video");
//
//
//    // Object Url as the video source
//    document.querySelector("#main-video source").setAttribute('src', URL.createObjectURL(file));
//
//    // Load the video and show it
//    _VIDEO.load();
//    _VIDEO.style.display = 'inline';
//
//    // Load metadata of the video to get video duration and dimensions
//    _VIDEO.addEventListener('loadedmetadata', function () {
//        console.log(_VIDEO.duration);
//        var video_duration = _VIDEO.duration,
//            duration_options_html = '';
//
//        _VIDEO.currentTime = Math.floor(Math.floor(_VIDEO.duration) / 2);
//        _CANVAS.width = _VIDEO.videoWidth;
//        _CANVAS.height = _VIDEO.videoHeight;
//
//        _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
//
//    });
//
//    setTimeout(function () {
//        _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
//        console.log(_CANVAS.toDataURL());
//
//
//    }, 500);
//
//};

var theFile;

var video, canvas, img;

var makeThumb = function (vid) {



    $("#videoId")[0].addEventListener('loadedmetadata', function () {

        var video = document.getElementById('videoId');
        var canvas = document.getElementById('canvasId');
        var img = document.getElementById('imgId');
        draw(video, canvas, img);

        video.pause();




        function draw(video, canvas, img) {
            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);


            setTimeout(function () {
                var dataURL = canvas.toDataURL("image/jpg");
                img.setAttribute('src', dataURL);
                return (dataURL);
            }, 500);

        };
    });



    $("#videoId source")[0].src = URL.createObjectURL(vid);
    $("#videoId")[0].load();
};

$(document).ready(function () {

    $("#file-input")[0].addEventListener("change", function () {
        var theFile = $("#file-input")[0].files[0];
        console.log(makeThumb(theFile));
    });

});


//ready(makeThumb);
