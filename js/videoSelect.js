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

    document.getElementById("main").classList.add("hide");


    var docRef = db.collection("users").doc("users");

    docRef.get().then(function (doc) {
        if (doc.exists) {
            currentUserInfo = doc.data();
            setUserMenu();
            applyPref();
            prefInit();
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

        if ($("#videoList")[0]) {
            document.getElementById("videoList").remove();
        }
        document.getElementById("main").classList.add("noOpacity");

        var currentObj = sortArray(objectToArray(videoData));

        var fullDom = document.createElement("div");
        fullDom.classList.add("hide");
        fullDom.id = "videoList";


        for (i = 0; i < Object.keys(videoData).length; i++) {
            //            if (infos == undefined) {
            //                var noUploadText = document.createElement("h4");
            //                noUploadText.style.textAlign = "center";
            //                noUploadText.innerHTML = "No uploads yet";
            //                fullDom.appendChild(noUploadText);
            //            }
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
            //sets visibility of info base on mouse input
            cardInfo.classList.add("noOpacity");
            node.onmouseover = function () {
                this.getElementsByClassName("card-action")[0].classList.remove("noOpacity");
                this.getElementsByClassName("menuDrop")[0].classList.remove("noOpacity");
            };

            node.onmouseout = function () {
                this.getElementsByClassName("card-action")[0].classList.add("noOpacity");
                this.getElementsByClassName("menuDrop")[0].classList.add("noOpacity");
            };

            //menu button
            var menuButton = document.createElement("i");
            menuButton.classList.add("material-icons");
            menuButton.classList.add("dropdown-trigger");
            menuButton.setAttribute("data-target", infos.id + "drop");
            menuButton.classList.add("menuDrop");
            menuButton.innerHTML = "more_vert";
            menuButton.classList.add("waves-effect");
            menuButton.classList.add("noOpacity");
            cardStack.appendChild(menuButton);

            //drop down
            var dropList = document.createElement("ul");
            dropList.classList.add("dropdown-content");
            dropList.id = infos.id + "drop";
            var dropDelete = document.createElement("li");
            var dropDeleteButton = document.createElement("a");

            var dropRename = document.createElement("li");
            var dropRenameButton = document.createElement("a");

            var deleteListen = function (x) {
                dropDeleteButton.onclick = function () {
                    $("#deleteTitle")[0].innerHTML = "Are you sure that you would like to delete <b>" + videoData[x].title + "</b>?"

                    $("#deleteButton")[0].onclick = function () {
                        deleteVideo(x);
                    }
                };
            };
            deleteListen(infos.id);
            dropDeleteButton.href = "#deleteModal";
            dropDeleteButton.classList.add("modal-trigger");
            dropDeleteButton.classList.add("grey-text");
            dropDeleteButton.classList.add("text-darken-2");
            dropDeleteButton.classList.add("waves-effect");
            dropDeleteButton.classList.add("waves-light");
            dropDelete.href = "#";
            dropDeleteButton.innerHTML = "Delete";
            dropDelete.appendChild(dropDeleteButton);
            dropList.appendChild(dropDelete);


            var renameListen = function (x) {
                dropRenameButton.onclick = function () {
                    $("#renameTitle")[0].innerHTML = "Rename " + "<b>" + videoData[x].title + "</b>";
                    $("#renameBox")[0].value = videoData[x].title;

                    $("#renameButton")[0].onclick = function () {
                        renameVideo(x);
                    }
                };
            };

            renameListen(infos.id);
            dropRenameButton.href = "#renameModal";
            dropRenameButton.classList.add("modal-trigger");
            dropRenameButton.classList.add("grey-text");
            dropRenameButton.classList.add("text-darken-2");
            dropRenameButton.classList.add("waves-effect");
            dropRenameButton.classList.add("waves-light");
            dropRename.href = "#";
            dropRenameButton.innerHTML = "Rename";
            dropRename.appendChild(dropRenameButton);
            dropList.appendChild(dropRename);


            node.appendChild(dropList);


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

            //comments
            var comInfo = document.createElement("span");
            var comText = infos.comments;
            var comTextContainer = document.createElement("div");
            comTextContainer.innerHTML = comText;
            var comSymbol = document.createElement("i");
            comSymbol.classList.add("material-icons");
            comSymbol.innerHTML = "comment";
            comInfo.appendChild(comSymbol);
            comInfo.appendChild(comTextContainer);

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
            cardInfo.appendChild(comInfo);


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
                node.addEventListener("click", event => {
                    if (event.target.classList.contains("menuDrop") == false && event.target.nodeName != "A") {
                        enterVideo(x);
                    }
                });
            };



            addListener(String(infos.id));

            fullDom.appendChild(node);
        };


        document.getElementById("main").appendChild(fullDom);

        $('.dropdown-trigger').dropdown();
        $(document).ready(function () {
            $('.modal').modal();
        });


        $("#waitLoader")[0].classList.add("hide");

        document.getElementById("videoList").classList.remove("hide");
        document.getElementById("main").classList.remove("hide")
        setTimeout(function () {
            document.getElementById("main").classList.remove("noOpacity");

        }, 400)

    };



};
