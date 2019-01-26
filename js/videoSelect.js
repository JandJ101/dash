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


//edits stored verses
var editList = function (x) {


    var theId = x.parentElement.id;

    h1Text = $("#" + theId + " .theH1")[0].innerHTML;

    pText = $("#" + theId + " .theP")[0].innerHTML;

    //disbles enter verse
    $("#" + theId + " .spanText")[0].onclick = null;

    x.innerHTML = "check";

    x.onclick = function () {
        applyEdits(this);
    };

    $("#" + theId + " .theH1").replaceWith("<input type='text' class='newH1Text' value='" + h1Text + "'>");

    $("#" + theId + " .theP").replaceWith("<textarea class='newPText materialize-textarea'>" + pText + "</textarea>");


};

var updateUlMain = function () {

    document.getElementById("videoList").innerHTML = "";

    var currentObj = sortArray(objectToArray(videoData));

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

        document.getElementById("videoList").appendChild(node);
    };



};
