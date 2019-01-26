var videoData;

var realtimeVideos;

var updateVideos = function (z) {
    //        var docRef = db.collection("uploads").doc("uploads");

    //    docRef.get().then(function (doc) {
    //        if (doc.exists) {
    //            videoData = doc.data();
    //            var theVideoIds = videoData.ids;
    //            delete videoData.ids;
    //            $(document).ready(updateUlMain);
    //            if (z) {
    //                app.classList.remove("noOpacity");
    //            }
    //
    //        } else {
    //            // doc.data() will be undefined in this case
    //            console.log("No such document!");
    //        }
    //    }).catch(function (error) {
    //        console.log("Error getting document:", error);
    //    });


    realtimeVideos = db.collection("uploads").doc("uploads").onSnapshot(function (doc) {
        if (doc.exists) {
            videoData = doc.data();
            var theVideoIds = videoData.ids;
            delete videoData.ids;
            $(document).ready(updateUlMain);
            if (z) {
                app.classList.remove("noOpacity");
            }

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    });
};


var appendIt = function (x) {
    var node = document.createElement("LI");
    document.getElementById("historyList").appendChild(node);
    document.getElementById("historyList").lastChild.innerHTML = x
};


var objectToArray = function (object) {
    return (Object.values(object));
};

var updateUlMain = function () {

    document.getElementById("videoList").remove();

    var currentObj = sortArray(objectToArray(videoData));

    var fullDom = document.createElement("div");
    fullDom.classList.add("noOpacity");
    fullDom.id = "videoList";
    for (i = 0; i < Object.keys(videoData).length; i++) {
        var infos = currentObj[i];

        var node = document.createElement("div");
        node.id = infos.id;
        node.classList.add("card");
        node.classList.add("horizontal");

        var thumbnailSide = document.createElement("i")
        thumbnailSide.classList.add("material-icons");
        thumbnailSide.innerHTML = "priority_high";

        console.log(infos.id);
        if (infos.type == "video") {
            thumbnailSide.innerHTML = "movie"
        }

        if (infos.type == "image") {
            thumbnailSide = document.createElement("img");
            thumbnailSide.src = infos.path;
            thumbnailSide.classList.add("noOpacity");
            thumbnailSide.addEventListener("load", function () {
                this.classList.remove("noOpacity");

            });
        }

        if (infos.type == "audio") {
            thumbnailSide.innerHTML = "audiotrack"

        }


        var image = document.createElement("div");
        image.classList.add("card-image");
        image.appendChild(thumbnailSide);
        node.appendChild(image);

        var cardTitle = document.createElement("span");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = infos.title;
        node.appendChild(cardTitle);

        var addListener = function (x) {
            node.addEventListener("click", function () {
                enterVideo(x);
            });
        };

        addListener(String(infos.id));

        fullDom.appendChild(node);
    };


    document.getElementById("main").appendChild(fullDom);

    document.getElementById("videoList").classList.remove("noOpacity");



};
