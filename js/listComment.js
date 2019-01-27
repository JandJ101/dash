var commentData;

var realtimeComment;

var updateComments = function (x, z) {
    var docRef = db.collection("comments").doc(x);
    /*
        docRef.get().then(function (doc) {
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
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });*/

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
                console.log("No such document!");
            }
        });



};

var listComments = function () {
    var element = "comments";
    document.getElementById(element).innerHTML = "";

    var key = "comments";

    var currentObj = sortArray(objectToArray(commentData));

    for (i = 0; i < currentObj.length; i++) {
        var infos = currentObj[i];



        var h1 = "<span class='card-title'>" + currentObj[i].text + "</span>";



        var node = document.createElement("div");
        node.classList.add("card");
        node.id = i + key;

        //body container
        var content = document.createElement("div");
        content.classList.add("card-content");


        //card user
        var user = document.createElement("span");
        var userName = document.createElement("span");
        user.classList.add("card-title");

        //picture
        var userPicture = document.createElement("img");
        userPicture.src = currentUserInfo[infos.user].pic;
        user.appendChild(userPicture);
        userName.innerHTML = currentUserInfo[infos.user].name;
        user.appendChild(userName);
        content.appendChild(user);

        //text
        var text = document.createElement("p");
        text.innerHTML = infos.text;
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
