var cancelUploading = false;

var thangyy;

var findType = function (x) {
    var imgTypes = ["jpg", "jpeg", "png", "gif", "svg", "bmp", "ico"];
    var videoTypes = ["mp4", "webm", "ogg"];
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

        return (type);

    }
};

var addDataToBase = function (Path, Name, Id, User, Date, Type) {
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
        type: Type
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

var resetUploader = function () {
    hideUploadState();
    resetUploadState();

    $("#uploadButton")[0].classList.remove("blueGrad");

    fileButton.parentElement.classList.remove("flipOutY");
    cancelUpload.classList.add("flipOutY");
    cancelUpload.classList.remove("flipInY");

};



var upload = function (e) {

    var file = e.target.files[0];
    var folder = "uploads/";

    var storageRef = firebase.storage().ref(folder + file.name);

    var task = storageRef.put(file);

    uploadState.classList.remove("noOpacity");
    $("#uploadButton")[0].classList.add("blueGrad");

    fileButton.parentElement.classList.add("flipOutY");
    cancelUpload.classList.remove("flipOutY");
    cancelUpload.classList.add("flipInY");




    cancelUploading = false;
    task.on("state_changed",

        function progress(snapshot) {
            amountTotal.innerHTML = String(Math.round(snapshot.totalBytes / 10000) / 100) + "MB";
            amountComplete.innerHTML = String(Math.round(snapshot.bytesTransferred / 10000) / 100) + "MB";
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            //create info
            var Path = "";
            var Name = file.name;
            var Id = "";
            var User = auth.currentUser.uid;
            var Date = dateString();
            var Type = findType(file.name.split(".")[file.name.split(".").length - 1])

            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                Path = downloadURL;

                var docuuRef = db.collection("uploads").doc("uploads");

                docuuRef.get().then(function (doc) {
                    if (doc.exists) {
                        Id = idGen(doc.data().ids);

                        addDataToBase(Path, Name, Id, User, Date, Type);
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });


            });
            resetUploader();
        }
    );
};


var initilizeUploader = function () {
    var uploader = $("#uploader")[0];
    var fileButton = $("#fileButton")[0];

    var uploadState = $("#uploadState")[0];
    var amountTotal = $("#amountTotal")[0];
    var amountComplete = $("#amountComplete")[0];

    fileButton.addEventListener("change", function (e) {
        upload(e);
    });

    cancelUpload.addEventListener("click", function () {
        cancelUploading = true;
    });
};

var showUploadState = function () {
    uploadState.classList.remove("noOpacity");


};

var hideUploadState = function () {
    uploadState.classList.add("noOpacity");

}

var resetUploadState = function () {
    amountTotal.innerHTML = "∞MB";
    amountComplete.innerHTML = "0.00MB";

};

$(document).ready(initilizeUploader);
