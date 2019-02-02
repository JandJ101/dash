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

var listComments = function () {
    var element = "comments";
    document.getElementById(element).innerHTML = "";

    var key = "comments";

    var currentObj = sortArray(objectToArray(commentData));

    console.log(currentObj);

    for (i = 0; i < currentObj.length; i++) {
        var infos = currentObj[i];

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
        headerOuter.classList.add("card-title");
        headerOuter.appendChild(user);

        //picture
        var userPicture = document.createElement("img");
        userPicture.src = currentUserInfo[infos.user].pic;
        console.log(currentUserInfo[infos.user].pic);
        headerOuter.appendChild(userPicture);
        userName.innerHTML = currentUserInfo[infos.user].name;
        headerOuter.appendChild(userName);
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
                console.log(state);
                checkComment(currentVideoId, x, state);

            });

        };

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


        var setListen = function (y) {
            node.addEventListener("click", function () {
                goToTime(y);
            })
        };
        setListen(infos.time);
        document.getElementById(element).appendChild(node);


    }

};
