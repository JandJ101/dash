var prefTabsInstance;
var prefInit = function() {
    var user = currentUserInfo[auth.currentUser.uid];

    prefTabsInstance = Materialize.Tabs.init($("#prefTabs"));
    prefTabsInstance[0].select("ProfileSet");
    prefTabsInstance[0].updateTabIndicator();

    $("#username")[0].value = user.name;
    Materialize.updateTextFields();

    $("#themeToggle")[0].checked = user.pref.theme;


    $("#prefSave").on("click", updatePref);



    applyPref();
};

var applyPref = function() {
    setUserMenu();

    var userId = auth.currentUser.uid;
    var user = currentUserInfo[userId];

    if (user.pref.theme) {
        $("body")[0].classList.remove("lighten");
        $("body")[0].classList.add("dark");
    } else {
        $("body")[0].classList.remove("dark");
        $("body")[0].classList.add("lighten");
    }

};

var updatePref = function() {
    var userId = auth.currentUser.uid;
    var user = currentUserInfo[userId];

    //get info
    var newName = $("#username")[0].value;
    var newTheme = $("#themeToggle")[0].checked;

    user.name = newName;
    user.pref.theme = newTheme;

    db.collection("users").doc("users").update({
            [userId]: user
        })
        .then(function() {
            console.log("Document successfully updated!");
            applyPref();
        });

};