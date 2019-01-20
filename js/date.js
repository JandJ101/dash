var dateString = function () {
    return (new Date().toString());

};

var sortArray = function (a, b) {
    return a.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });

}
