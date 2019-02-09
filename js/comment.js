var clearCommentBox = function () {
    $("#inptComment")[0].value = "";

};

var submitComment = function () {
    var info = {};

    var commText = $("#inptComment")[0].value;

    if (mainVideoRef) {
        currTime = mainVideoRef.currentTime();
    }

    var uuid = auth.currentUser.uid;

    if ($("#timeCheck")[0].checked) {
        info.time = currTime;
    } else {
        info.time = null;
    }

    info.checked = false;
    info.date = dateString();
    info.text = commText;
    info.user = auth.currentUser.uid;
    clearCommentBox();
    writeCommentToBase(info);

};

var writeCommentToBase = function (x) {
    theCurrentVideoId = String(currentVideoId);

    var currentIds = [];
    var readRef = db.collection('comments').doc(theCurrentVideoId);

    var getDoc = readRef.get()
        .then(doc => {
            if (!doc.exists) {
                //doc doesnt exits so generate id right data
                var newCommId = [];
                newCommId[0] = idGenComm([]);
                x.id = newCommId[0];

                db.collection("comments").doc(currentVideoId).set({
                        ids: newCommId,
                        [newCommId]: x
                    })
                    .then(function () {
                        commentCounter(currentVideoId, 1);

                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            } else {
                //doc exits so get ids genreate new one write data
                currentIds = doc.data().ids;

                var newCommId = idGenComm(currentIds);
                x.id = newCommId;
                currentIds.push(newCommId);
                var commentRef = db.collection("comments").doc(theCurrentVideoId);
                return commentRef.update({
                        ids: currentIds,
                        [newCommId]: x
                    })
                    .then(function () {
                        commentCounter(currentVideoId, 1);
                    })
                    .catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);

                        db.collection("comments").doc(theCurrentVideoId).set({
                    [newCommId]: true
                            })
                            .then(function () {})
                            .catch(function (error) {
                                console.error("Error writing document: ", error);
                            });
                    });


            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
};

var checkComment = function (vidId, comId, val) {

    var comref = db.collection("comments").doc(vidId);

    var setWithMerge = comref.set({
        [comId]: {
            checked: val
        }
    }, {
        merge: true
    });


};

var deleteComment = function (comId, id) {

    var comref = db.collection("comments").doc(id);

    var setWithMerge = comref.update({
        [comId]: firebase.firestore.FieldValue.delete()
    }).then(function () {
        commentCounter(currentVideoId, -1);
    });


};

var data;

var commentCounter = function (x, inc) {
    var docRef = db.collection("uploads").doc("uploads");

    docRef.get().then(function (doc) {
        if (doc.exists) {
            data = doc.data();
            vid = data[x];

            var newVal;
            if (vid.comments) {
                newVal = vid.comments + inc;
            } else {
                newVal = inc
            }

            if (newVal < 0) {
                newVal = 0;

            }

            var upRef = db.collection("uploads").doc("uploads");

            return upRef.set({
                    [x]: {
                        comments: newVal
                    }
                }, {
                    merge: true
                })
                .then(function () {
                    //console.log("Document successfully updated!");
                })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });

            console.log(data[x]);
        } else {
            // doc.data() will be undefined in this case

            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

};

var initComments = function () {
    $("#sendComment")[0].addEventListener("click", submitComment);
    $("#inptComment")[0].addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            $("#sendComment")[0].click();
        }
    });

};

$(document).ready(initComments);
