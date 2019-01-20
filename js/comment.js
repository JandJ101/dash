var clearCommentBox = function () {
    $("#inptComment")[0].value = "";

};

var submitComment = function () {
    var info = {};

    var commText = $("#inptComment")[0].value;

    currTime = mainVideoRef.currentTime();

    var uuid = auth.currentUser.uid;

    if ($("#timeCheck")[0].checked) {
        info.time = currTime;
    } else {
        info.time = 0;
    }

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

                db.collection("comments").doc(currentVideoId).set({
                        ids: newCommId,
                        [newCommId]: x
                    })
                    .then(function () {
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            } else {
                //doc exits so get ids genreate new one write data
                currentIds = doc.data().ids;

                var newCommId = idGenComm(currentIds);
                currentIds.push(newCommId);
                console.log(currentIds);

                var commentRef = db.collection("comments").doc(theCurrentVideoId);
                return commentRef.update({
                        ids: currentIds,
                        [newCommId]: x
                    })
                    .then(function () {
                        console.log("Document successfully updated!");
                    })
                    .catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);

                        db.collection("comments").doc(theCurrentVideoId).set({
                    [newCommId]: true
                            })
                            .then(function () {
                                console.log("Document successfully written!");
                            })
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

var initComments = function () {
    $("#sendComment")[0].addEventListener("click", submitComment);
    $("#inptComment")[0].addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            $("#sendComment")[0].click();
        }
    });

};

$(document).ready(initComments);
