var videoData;

var updateVideos = function () {
    var docRef = db.collection("uploads").doc("uploads");

    docRef.get().then(function (doc) {
        if (doc.exists) {
            videoData = doc.data();
            var theVideoIdeas = videoData.ids;
            delete videoData.ids;
            $(document).ready(updateUlMain);

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

updateVideos();

var objectToArray = function (object, pos) {
    return (object[Object.keys(object)[pos]]);
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

    for (i = 0; i < Object.keys(videoData).length; i++) {
        var currentObj = objectToArray(videoData, i);

        var h1 = "<span class='card-title'>" + currentObj.name + "</span>";

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

        appendIt(goods, currentObj.id);

    }

};
