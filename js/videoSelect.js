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




    var docRef = db.collection("users").doc("users");

    docRef.get().then(function (doc) {
        if (doc.exists) {
            currentUserInfo = doc.data();
            continuing();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            continuing();
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
        continuing();
    });

    var continuing = function () {


        document.getElementById("videoList").remove();
        document.getElementById("main").classList.add("noOpacity");

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

            var image = document.createElement("div");
            image.classList.add("card-image");


            var cardStack = document.createElement("div");
            cardStack.classList.add("card-stack");
            var cardInfo = document.createElement("div");
            cardInfo.classList.add("card-action");


            //place all the info
            //user
            var userInfo = document.createElement("span");
            var userText = currentUserInfo[infos.user].name;
            var userTextContainer = document.createElement("div");
            userTextContainer.innerHTML = userText;
            var userSymbol = document.createElement("i");
            userSymbol.classList.add("material-icons");
            userSymbol.innerHTML = "person";
            userInfo.appendChild(userSymbol);
            userInfo.appendChild(userTextContainer);

            //put in info container
            cardInfo.appendChild(userInfo);


            if (infos.type == "video") {
                thumbnailSide.innerHTML = "movie"
            }

            if (infos.type == "image") {
                thumbnailSide = document.createElement("img");
                thumbnailSide.src = infos.path;

                image.classList.add("noOpacity");
                thumbnailSide.addEventListener("load", function () {
                    this.parentElement.classList.remove("noOpacity");

                });
            }

            if (infos.type == "audio") {
                thumbnailSide.innerHTML = "audiotrack"

            }


            var cardTitle = document.createElement("div");
            cardTitle.classList.add("card-title");
            cardTitle.innerHTML = infos.title;


            image.appendChild(thumbnailSide);
            node.appendChild(image);


            cardStack.appendChild(cardTitle);
            cardStack.appendChild(cardInfo);
            node.appendChild(cardStack);

            var addListener = function (x) {
                node.addEventListener("click", function () {
                    enterVideo(x);
                });
            };

            addListener(String(infos.id));

            fullDom.appendChild(node);
        };


        document.getElementById("main").appendChild(fullDom);

        setTimeout(function () {
            document.getElementById("main").classList.remove("noOpacity");

        }, 500)

        document.getElementById("videoList").classList.remove("noOpacity");
    };



};
