var videoData;

var updateVideos = function () {
    var docRef = db.collection("uploads").doc("uploads");

    docRef.get().then(function (doc) {
        if (doc.exists) {
            videoData = doc.data();
            delete videoData.ids;
            $(document).ready(update);

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



var update = function () {

    document.getElementById("videoList").innerHTML = "";

    var key = "noDuplicates";

    for (i = 0; i < Object.keys(videoData).length; i++) {
        var currentObj = objectToArray(videoData, i);

        var h1 = "<h1 class='theH1'>" + currentObj.name + "</h1>";

        var p = "<p class='theP'>" + currentObj.path + "</p>";

        var deleteButton = "<i onclick='deleteList(this);' class='material-icons'>delete</i>";

        var editButton = "<i onclick='editList(this);' class='material-icons'>edit</i>"

        var goods = "<div onclick='enterVerse(this);' class='spanText'>" + h1 + p + "</div>" + deleteButton + editButton;

        var appendIt = function (x) {
            var node = document.createElement("LI");
            node.id = i + key;
            document.getElementById("videoList").appendChild(node);
            document.getElementById("videoList").lastChild.innerHTML = x
        };

        appendIt(goods);

    }

};



var enterVerse = function (x) {
    var theId = x.parentElement.id;

    var theP = $("#" + theId + " .theP")[0].innerHTML;
    var theH1 = $("#" + theId + " .theH1")[0].innerHTML;

    document.getElementById("addRef").value = theH1;
    document.getElementById("addVerse").value = theP;

    changeVerse();

};
