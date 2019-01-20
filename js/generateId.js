var idGen = function (already) {
    var rand = String(Math.floor(Math.random() * 900000000) + 100000000);

    var checkIt = function () {
        for (i = 0; i < already.length; i++) {
            if (String(rand) == already[i]) {
                rand = String(Math.floor(Math.random() * 900000000) + 100000000);
                checkIt();
            }
        }
    };

    checkIt();

    return (rand);

};

var idGenComm = function (already) {
    var rand = String(Math.floor(Math.random() * 9000000000) + 1000000000);

    var checkIt = function () {
        for (i = 0; i < already.length; i++) {
            if (String(rand) == already[i]) {
                rand = String(Math.floor(Math.random() * 9000000000) + 1000000000);
                checkIt();
            }
        }
    };

    checkIt();

    return (rand);

};
