var readInfo;
var realtimeRead;

var updateRead = function (x) {
    var docRef = db.collection("comments").doc(x);

    realtimeRead = db.collection("read").doc(x)
        .onSnapshot(function (doc) {


            if (doc.exists) {
                readInfo = doc.data();
                listReads(readInfo);

            } else {
                // doc.data() will be undefined in this case
                //console.log("No such document!");
            }
        });



};


var userRead = function (x, id) {

    if (realtimeRead) {
        realtimeRead();
    }

    var readref = db.collection("read").doc(id);
    var currentUser = auth.currentUser.uid;

    var newData = {};

    newData[currentUser] = x

    var setWithMerge = readref.set(newData, {
        merge: true
    }).then(function () {
        updateRead(String(currentVideoId));


    });



};



var listReads = function (x) {
    $("#read")[0].innerHTML = "";

    var obj = x;
    console.log(obj);
    var result = Object.keys(obj).map(function (key) {
        return [key, obj[key]];
    });;

    console.log(result);

    var fullContainer = document.createElement("div");

    for (i = 0; i < result.length; i++) {
        var users = result[i];
        var userInfo = currentUserInfo[users[0]];

        var picImgContainer = document.createElement("div");
        //        picImgContainer.title = userInfo.name + " has seen this.";
        picImgContainer.title = userInfo.name + " has seen this.";
        var picImg = document.createElement("img");
        var tag = document.createElement("div");
        tag.classList.add("tag");
        picImg.src = userInfo.pic;

        picImgContainer.appendChild(picImg);
        if (users[1]) {
            picImgContainer.appendChild(tag);
        }

        fullContainer.appendChild(picImgContainer);
    }

    $("#read")[0].innerHTML = fullContainer.innerHTML;
};
