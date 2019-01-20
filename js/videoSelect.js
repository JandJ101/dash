var videoData;

var updateVideos = function (z) {
    var docRef = db.collection("uploads").doc("uploads");

    docRef.get().then(function (doc) {
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
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
};

var appendIt = function (x) {
    var node = document.createElement("LI");
    document.getElementById("historyList").appendChild(node);
    document.getElementById("historyList").lastChild.innerHTML = x
};

//updateVideos();

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

    var key = "noDuplicates";

    var currentObj = sortArray(objectToArray(videoData));

    for (i = 0; i < Object.keys(videoData).length; i++) {
        var h1 = "<span class='card-title'>" + currentObj[i].name + "</span>";

        var p = "<p class='theP'>" + "</p>";

        //var deleteButton = "<i onclick='deleteList(this);' class='material-icons'>delete</i>";

        //var editButton = "<i onclick='editList(this);' class='material-icons'>edit</i>"

        var goods = h1;

        var appendIt = function (x, y) {
            var node = document.createElement("div");
            node.id = i + key;
            node.classList.add("card");
            node.addEventListener("click", function () {
                enterVideo(y);
            })
            document.getElementById("videoList").appendChild(node);
            document.getElementById("videoList").lastChild.innerHTML = x
        };

        appendIt(goods, currentObj[i].id);

    }

};
