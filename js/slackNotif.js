var slackHook;
var postSlack = function () {
    console.log("No Slack webhook found");
    return ("No Slack webhook found");
};


var initSlackNotif = function () {


    var docRef = db.collection("slack").doc("slack");

    docRef.get().then(function (doc) {
        if (doc.exists) {
            var x = doc.data();

            slackHook = x.hook

        } else {
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });


    postSlack = function (x) {

        var message = String(x);


        $.ajax({
            url: slackHook,
            data: '{"text": "' + message + '"}',
            type: "POST"
        });

    };
};
