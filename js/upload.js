var cancelUploading = false;

var findType = function(x) {
    var imgTypes = ["jpg", "jpeg", "png", "gif", "svg", "bmp", "ico"];
    var videoTypes = ["mp4", "webm", "ogg", "mov"];
    var audioTypes = ["mp3", "aiff", "wav"];

    var type = "unknown";

    for (a = 0; a < imgTypes.length; a++) {
        if (imgTypes[a] == x.toLocaleLowerCase()) {
            type = "image";
        }
    }
    for (a = 0; a < audioTypes.length; a++) {
        if (audioTypes[a] == x.toLocaleLowerCase()) {
            type = "audio";
        }
    }
    for (a = 0; a < videoTypes.length; a++) {
        if (videoTypes[a] == x.toLocaleLowerCase()) {
            type = "video";
        }
    }
    return (type);
};

var addDataToBase = function(Path, Name, Id, User, Date, Type, Size, Length, Thumb) {
    var ref = db.collection('uploads').doc('uploads');


    var passData = {};
    var theId = String(Id);
    passData[theId] = {
        name: Name,
        title: Name.split(".")[0],
        path: Path,
        id: Id,
        user: User,
        date: Date,
        type: Type,
        size: Size,
        length: Length,
        comments: 0,
        thumb: Thumb
    };



    ref.update({
        ids: firebase.firestore.FieldValue.arrayUnion(Id)
    });

    var setWithMerge = ref.set(passData, {
        merge: true
    });

    //updateVideos();

    hideUploadWindow();

};

var resetUploader = function() {
    hideUploadState();
    resetUploadState();

    $("#uploadButton")[0].classList.remove("blueGrad");
    uploadName.innerHTML = "";

    fileButton.parentElement.classList.remove("flipOutY");
    cancelUpload.classList.add("flipOutY");
    cancelUpload.classList.remove("flipInY");

};

var thangy;

var upload = function(e) {

    var file = e.target.files[0];
    var folder = "uploads/";


    var storageRef = firebase.storage().ref(folder + file.name);

    var task = storageRef.put(file);

    uploadName.innerHTML = file.name;

    showUploadState();
    $("#uploadButton")[0].classList.add("blueGrad");

    fileButton.parentElement.classList.add("flipOutY");
    cancelUpload.classList.remove("flipOutY");
    cancelUpload.classList.add("flipInY");


    var Type1 = findType(file.name.split(".")[file.name.split(".").length - 1]);
    if (Type1 == "video") {
        //thumbnail
        function setVideoInHTML(vid) {
            $("#videoId source")[0].src = URL.createObjectURL(vid);
            var videoHTML = $("#videoId")[0]
            $("#videoId")[0].load();
            videoHTML.addEventListener('loadeddata', function() {
                console.log("ready vid");
                videoHTML.pause();
                videoHTML.currentTime = videoHTML.duration / 20;
                captureAndPut()
            }, false);
        }
        setVideoInHTML(file);



        var thumbnailURL;

        function captureAndPut() {
            var canvas1 = document.getElementById('canvasId');
            var video1 = document.getElementById('videoId');
            canvas1.getContext('2d').drawImage(video1, 0, 0, canvas1.width, canvas1.height);
            dataThing = canvas1.toDataURL("image/jpg");
            // return (canvas1.toDataURL("image/jpg"));


            var thumbRef = firebase.storage().ref();
            var theDate = new Date;
            var thumbImageRef = thumbRef.child("thumb/" + file.name + "_thumb" + theDate.getTime());
            thumbImageRef.put(dataURItoBlob(canvas1.toDataURL("image/jpg"))).then(function(snapshot) {
                console.log('Uploaded a blob or file!', snapshot);
                snapshot.ref.getDownloadURL().then(
                    function(downloadURL) {
                        console.log(downloadURL);
                        thumbnailURL = downloadURL;
                    }
                )


            });


        }
    } else {
        var thumbnailURL = undefined;
    }

    cancelUploading = false;
    task.on("state_changed",

        function progress(snapshot) {

            var percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            amountTotal.innerHTML = String(percentage) + "%";
            amountComplete.innerHTML = formatBytes(snapshot.bytesTransferred) + "/" + formatBytes(snapshot.totalBytes);

            uploader.style.width = String(percentage) + "%";

            if (cancelUploading) {
                task.cancel();
                resetUploader();
            }

        },

        function error(err) {
            console.log(err);

        },

        function complete() {

            var Type = findType(file.name.split(".")[file.name.split(".").length - 1]);
            var Length = null;




            var continueInfo = function() {

                //create info
                var Path = "";
                var Name = file.name;
                var Id = "";
                var User = auth.currentUser.uid;
                var Date = dateString();
                Type;
                var Size = file.size;
                var Thumb = thumbnailURL;

                task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    Path = downloadURL;

                    var docuuRef = db.collection("uploads").doc("uploads");

                    docuuRef.get().then(function(doc) {
                        if (doc.exists) {
                            Id = idGen(doc.data().ids);

                            addDataToBase(Path, Name, Id, User, Date, Type, Size, Length, Thumb);

                            // Slack message
                            postSlack(String(currentUserInfo[auth.currentUser.uid].name) + " uploaded " + Name);
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });


                });
                resetUploader();
            };

            // get length of video

            if (Type == "video" || Type == "audio") {
                var videoTest = document.createElement("video");
                var videoTestSrc = document.createElement("source");
                videoTest.appendChild(videoTestSrc);

                thangy = videoTest;
                console.log(videoTest);

                obUrl = URL.createObjectURL(file);
                videoTest.src = obUrl;
                videoTest.addEventListener('canplaythrough', function(e) {
                    //add duration in the input field #f_du
                    var f_duration = e.currentTarget.duration;
                    console.log(f_duration);
                    Length = f_duration;
                    URL.revokeObjectURL(obUrl);
                    continueInfo();
                });

            } else {
                continueInfo();
            }

        }
    );
};


var initilizeUploader = function() {
    var uploader = $("#uploader")[0];
    var fileButton = $("#fileButton")[0];

    var uploadState = $("#uploadState")[0];
    var amountTotal = $("#amountTotal")[0];
    var amountComplete = $("#amountComplete")[0];
    var uploadName = $("#uploadName")[0];

    fileButton.addEventListener("change", function(e) {
        upload(e);
    });

    cancelUpload.addEventListener("click", function() {
        cancelUploading = true;
    });
};

var showUploadState = function() {
    uploadState.classList.remove("hide");



};

var hideUploadState = function() {
    uploadState.classList.add("hide");

}

var resetUploadState = function() {
    amountTotal.innerHTML = "∞MB";
    amountComplete.innerHTML = "0.00MB";

};

$(document).ready(initilizeUploader);