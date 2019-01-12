/*
var readDoc = function (colec, docu) {

    var docRef = db.collection(colec).doc(docu);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log(doc.data());
        } else {
            // doc.data() will be undefined in this case
            return ("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

};
*/


var readDoc = new Promise(function (resolve, reject) {
    var docRef = db.collection(colec).doc(docu);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            resolve(doc.data());
        } else {
            // doc.data() will be undefined in this case
            resolve("No such document!");
        }
    }).catch(function (error) {
        resolve("Error getting document:", error);
    });


});
