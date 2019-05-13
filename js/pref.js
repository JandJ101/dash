var prefTabsInstance;
var prefInit = function () {
    var user = currentUserInfo[auth.currentUser.uid];
    console.log(user);

    prefTabsInstance = M.Tabs.init($("#prefTabs"));
    prefTabsInstance[0].select("ProfileSet");
    prefTabsInstance[0].updateTabIndicator();
    prefTabsInstance[0].updateTabIndicator();

    $("#username")[0].value = user.name;
    M.updateTextFields();

};
