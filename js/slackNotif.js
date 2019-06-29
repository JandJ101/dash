var postSlack = function (x) {

    var message = String(x);


    $.ajax({
        url: "https://hooks.slack.com/services/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",
        data: '{"text": "' + message + '"}',
        type: "POST"
    });

};
