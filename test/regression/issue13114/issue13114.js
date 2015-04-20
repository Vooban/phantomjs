var system = require("system");
var webpage = require("webpage");

var myurl = 'http://localhost:8000/';

var renderPage = function (url) {
    page = webpage.create();

    page.onNavigationRequested = function (url, type, willNavigate, main) {
        if (main && url != myurl) {
            myurl = url;
            console.log("redirect caught")
            page.close()
            renderPage(url);
        }
    };

    page.onResourceError = function (resourceError) {
        page.reason = resourceError.errorString;
        page.reason_url = resourceError.url;
        console.log(page.reason);
        console.log(page.reason_url);
    };

    page.open(url, function (status) {
        if (status === "success") {
            var port = url.substring(17, 21);
            console.log("success", port)
            page.render('yourscreenshot' + port + '.png');
            if (port === 8001) {
                phantom.exit(0);
            }
        } else {
            console.log("failed", url)
            phantom.exit(1);
        }
    });
}

renderPage(myurl);