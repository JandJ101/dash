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
};

// var theFile;

// var video, canvas, img;


// var dataThing;

// function capture() {
//     var canvas1 = document.getElementById('canvasId');
//     var video1 = document.getElementById('videoId');
//     canvas1.getContext('2d').drawImage(video1, 0, 0, canvas1.width, canvas1.height);
//     dataThing = canvas1.toDataURL("image/jpg");
//     return (canvas1.toDataURL("image/jpg"));
// }


// var makeThumb = function(vid) {



//     $("#videoId")[0].addEventListener('loadedmetadata', function() {

//         console.log("load");

//         var video = document.getElementById('videoId');
//         var canvas = document.getElementById('canvasId');
//         var img = document.getElementById('imgId');
//         draw(video, canvas, img);

//         video.pause();




//         function draw(video, canvas, img) {
//             var context = canvas.getContext('2d');
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);


//             setTimeout(function() {
//                 var dataURL = canvas.toDataURL("image/jpg");
//                 img.setAttribute('src', dataURL);
//                 return (dataURL);
//             }, 500);

//         };
//     });



//     $("#videoId source")[0].src = URL.createObjectURL(vid);
//     $("#videoId")[0].load();
// };

// $(document).ready(function() {

//     $("#file-input")[0].addEventListener("change", function() {
//         var theFile = $("#file-input")[0].files[0];
//         console.log(makeThumb(theFile));
//     });

// });


// //ready(makeThumb);