var signInValEmail, signInValPass;

var currentUserInfo = {};

var signIn = function (x, y) {
    firebase.auth().signInWithEmailAndPassword(x, y).catch(function (error) {
        // Handle Errors here.
        shakeAuth();
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });

};

var signInButton = function () {
    signInValEmail = $("#inptEmail")[0].value;
    signInValPass = $("#inptPassword")[0].value;
    signIn(signInValEmail, signInValPass);

};

var setUserMenu = function () {
    $("#menuUser")[0].innerHTML = currentUserInfo[auth.currentUser.uid].name;

}

var initializeAuthentication = function () {
    auth.onAuthStateChanged(firebaseUser => {

        if (firebaseUser) {
            //logged in
            //console.log(firebaseUser);
            hideAuth();
            $("#waitLoader")[0].classList.remove("hide")
            updateVideos(true);
        } else {
            //console.log("notLoged in.");
            showAuth();
            $("#main")[0].classList.add("noOpacity");

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
