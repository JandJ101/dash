var signInValEmail, signInValPass;

var signIn = function (x, y) {
    firebase.auth().signInWithEmailAndPassword(x, y).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });

};

var signInButton = function () {
    signInValEmail = inptEmail.value;
    signInValPass = inptPassword.value;
    signIn(signInValEmail, signInValPass);

};

var currentUserName = function () {
    var uuid = auth.currentUser.uid

    var docRef = db.collection("users").doc(uuid);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

var initializeAuthentication = function () {
    auth.onAuthStateChanged(firebaseUser => {

        if (firebaseUser) {
            //logged in
            console.log(firebaseUser);
            hideAuth();
            updateVideos(true);
        } else {
            console.log("notLoged in.");
            showAuth();

        }
    })

    $("#inptPassword")[0].addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            $("#btnLogin")[0].click();
        }
    });


    btnLogin.addEventListener("click", signInButton);
};

$(document).ready(initializeAuthentication);
