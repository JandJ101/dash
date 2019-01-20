var commentData;

var updateComments = function (x, z) {
    var docRef = db.collection("comments").doc(x);

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
    });
};

var listComments = function () {
    var element = "comments";
    document.getElementById(element).innerHTML = "";

    var key = "noDuplicateComments";

    var currentObj = sortArray(objectToArray(commentData));
    console.log(currentObj);

    for (i = 0; i < Object.keys(videoData).length; i++) {
        var h1 = "<span class='card-title'>" + currentObj[i].text + "</span>";

        var p = "<p class='theP'>" + "</p>";

        //var deleteButton = "<i onclick='deleteList(this);' class='material-icons'>delete</i>";

        //var editButton = "<i onclick='editList(this);' class='material-icons'>edit</i>"

        var goods = h1;

        var appendIt = function (x, y) {
            var node = document.createElement("div");
            node.id = i + key;
            node.classList.add("card");
            node.addEventListener("click", function () {
                goToTime(y);
            })
            document.getElementById(element).appendChild(node);
            document.getElementById(element).lastChild.innerHTML = x
        };

        appendIt(goods, currentObj[i].time);

    }

};
