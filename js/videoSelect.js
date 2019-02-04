var videoData;

var realtimeVideos;

var updateVideos = function (z) {
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


var timeSince = function (date) {

    var set = new Date(date)

    var seconds = Math.floor((new Date() - set) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return ("Just now");
}


function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}


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
            setUserMenu();
            continuing();
        } else {
            // doc.data() will be undefined in this case
            //console.log("No such document!");
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
            thumbnailSide.innerHTML = "insert_drive_file";

            var image = document.createElement("div");
            image.classList.add("card-image");


            var cardStack = document.createElement("div");
            cardStack.classList.add("card-stack");

            var cardInfo = document.createElement("div");
            cardInfo.classList.add("card-action");
            cardInfo.classList.add("noOpacity");
            node.onmouseover = function () {
                this.getElementsByClassName("card-action")[0].classList.remove("noOpacity");
            };

            node.onmouseout = function () {
                this.getElementsByClassName("card-action")[0].classList.add("noOpacity");
            };


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

            //time
            var timeInfo = document.createElement("span");
            var timeText = timeSince(infos.date);
            var timeTextContainer = document.createElement("div");
            timeTextContainer.innerHTML = timeText;
            var timeSymbol = document.createElement("i");
            timeSymbol.classList.add("material-icons");
            timeSymbol.innerHTML = "access_time";
            timeInfo.appendChild(timeSymbol);
            timeInfo.appendChild(timeTextContainer);

            //size
            var size = document.createElement("span");
            var sizeText = formatBytes(infos.size);
            var sizeTextContainer = document.createElement("div");
            sizeTextContainer.innerHTML = sizeText;
            size.appendChild(sizeTextContainer);

            //size
            var lengthInfo = document.createElement("span");
            var lengthText = secondsToHM(infos.length);
            var lengthTextContainer = document.createElement("div");
            lengthTextContainer.innerHTML = lengthText;
            lengthInfo.appendChild(lengthTextContainer);

            //put in info container
            if (infos.size != undefined) {
                cardInfo.appendChild(size);
            }
            if (infos.length != null || infos.length != undefined) {
                cardInfo.appendChild(lengthInfo);
            }
            cardInfo.appendChild(userInfo);
            cardInfo.appendChild(timeInfo);


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
