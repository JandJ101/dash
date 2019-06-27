var commentData;

var realtimeComment;

var updateComments = function (x, z) {
    var docRef = db.collection("comments").doc(x);

    realtimeComment = db.collection("comments").doc(x)
        .onSnapshot(function (doc) {


            if (doc.exists) {
                commentData = doc.data();
                delete commentData.ids;
                $(document).ready(listComments);
                if (z) {
                    app.classList.remove("noOpacity");
                }

            } else {
                // doc.data() will be undefined in this case
                commentData = "";
                $(document).ready(listComments);
                //console.log("No such document!");
            }
        });



};

var sortByOldest = function (a, b) {
    return a.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

};

var sortByCommenter = function (a) {
    return (a.sort(function (a, b) {
        var textA = currentUserInfo[a.user].name.toUpperCase();
        var textB = currentUserInfo[b.user].name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }));
};

var sortByTimecode = function (a) {
    return (a.sort(function (a, b) {
        var textA = String(a.time).toUpperCase();
        var textB = String(b.time).toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }));
};

var sort = function (prop, arr) {
    prop = prop.split('.');
    var len = prop.length;

    arr.sort(function (a, b) {
        var i = 0;
        while (i < len) {
            a = a[prop[i]];
            b = b[prop[i]];
            i++;
        }
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
};

var setComSortText = function (x) {
    $("#comSortText")[0].innerHTML = String(x);
}

var currentSort;

var listComments = function (pref) {
    var element = "comments";
    document.getElementById(element).innerHTML = "";

    var key = "comments";

    var currentObj;

    currentObj = sortArray(objectToArray(commentData));
    setComSortText("Newest");
    currentSort = "newest"
    
    if (pref.sort) {
        if (pref.sort == "oldest") {
            currentObj = sortByOldest(objectToArray(commentData));
            setComSortText("Oldest");
            currentSort = "oldest";
        } else if (pref.sort == "commenter") {
            sortByCommenter(objectToArray(commentData));
            setComSortText("Commenter");
            currentSort = "commenter";
        } else if (pref.sort == "timecode") {
            currentObj = sort("time", objectToArray(commentData));
            setComSortText("Timecode");
            currentSort = "timecode";
        } else if (pref.sort == "completed") {
            currentObj = sort("checked", objectToArray(commentData));
            setComSortText("Completed");
            currentSort = "checked";
        }
    }


    //no comments
    if (currentObj.length == 0) {
        var noCom = document.createElement("div");
        noCom.id = "noComments";
        var noComText = document.createElement("h6");
        noComText.classList.add("grey-text");
        noComText.innerHTML = "No comments yet";
        noCom.appendChild(noComText);
        document.getElementById(element).appendChild(noCom);

        return;
    }
    for (i = 0; i < currentObj.length; i++) {
        var infos = currentObj[i];


        var continuing = function () {
            var node = document.createElement("div");
            node.classList.add("card");
            node.id = i + key;

            //body container
            var content = document.createElement("div");
            content.classList.add("card-content");


            var headerOuter = document.createElement("div");
            //card user
            var user = document.createElement("span");
            var userName = document.createElement("span");
            var comDate = document.createElement("span");
            comDate.classList.add("comDate");
            userName.classList.add("userName");
            headerOuter.classList.add("card-title");
            headerOuter.appendChild(user);

            //picture
            var userPicture = document.createElement("img");
            userPicture.src = currentUserInfo[infos.user].pic;
            headerOuter.appendChild(userPicture);
            userName.innerHTML = currentUserInfo[infos.user].name;
            headerOuter.appendChild(userName);
            content.appendChild(headerOuter);

            //Date
            comDate.innerHTML = timeSince(infos.date);
            headerOuter.appendChild(comDate);
            content.appendChild(headerOuter);



            //checkbox
            var checkbox = document.createElement("div");
            checkbox.classList.add("round");
            var check = document.createElement("input");
            check.id = infos.date.replace(/\s/g, '');
            check.type = "checkbox";
            var commId = infos.id;
            var setCheckListen = function (x) {
                checkbox.addEventListener("click", function () {
                    var state = this.querySelector("input").checked;
                    checkComment(currentVideoId, x, state);

                });

            };
            if (infos.checked == false) {
                checkbox.classList.add("noOpacity");

            }

            //sets visibility of info base on mouse input
            node.onmouseover = function () {
                this.getElementsByClassName("round")[0].classList.remove("noOpacity");
                this.getElementsByClassName("card-action")[0].classList.remove("noOpacity");
            };

            node.onmouseout = function () {
                if (this.getElementsByClassName("round")[0].getElementsByTagName("input")[0].checked == false) {
                    this.getElementsByClassName("round")[0].classList.add("noOpacity");
                }
                this.getElementsByClassName("card-action")[0].classList.add("noOpacity");

            };

            //actions
            var commentAction = document.createElement("div");
            commentAction.classList.add("card-action");
            commentAction.classList.add("noOpacity");

            var deleteCom = document.createElement("i");
            deleteCom.innerHTML = "delete";
            deleteCom.classList.add("material-icons");
            commentAction.appendChild(deleteCom);
            var deleteComListen = function (x) {
                deleteCom.onmouseup = function () {
                    deleteComment(x.id, currentVideoId);

                };
            };
            deleteComListen(infos);


            setCheckListen(commId);
            if (infos.checked) {
                check.checked = true;
            } else {
                check.checked = false;
            }
            var checkLabel = document.createElement("label");
            checkLabel.setAttribute("for", infos.date.replace(/\s/g, ''));
            checkbox.appendChild(check);
            checkbox.appendChild(checkLabel);
            headerOuter.appendChild(checkbox);

            //text        
            var time = document.createElement("span");
            time.innerHTML = secondsToHM(infos.time);
            time.classList.add("commentTime");
            var text = document.createElement("p");
            text.innerHTML = infos.text;
            if (infos.time != null || infos.time != undefined) {
                content.appendChild(time);
            }

            content.appendChild(text);

            node.appendChild(content);
            node.appendChild(commentAction);

            var setListen = function (y) {
                node.addEventListener("click", function () {
                    goToTime(y);
                })
            };
            setListen(infos.time);
            document.getElementById(element).appendChild(node);


        };

        if (!showHideCheckComShow && infos.checked) {

        } else {
            continuing();
        }

    }
};
