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

    page.onConsoleMessage = function(msg, lineNum, sourceId) {
        console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
    };

    page.onError = function(msg, trace) {

      var msgStack = ['ERROR: ' + msg];

      if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
          msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
        });
      }

      console.error(msgStack.join('\n'));

    };

    page.open(url, function (status) {
        if (status === "success") {
            var port = url.substring(17, 21);
            console.log("success", port)
            page.render('yourscreenshot' + port + '.png');
            console.log(page.url, document.title);
            phantom.exit(0);
        } else {
            console.log("failed", url)
            phantom.exit(1);
        }
    });
}

renderPage(myurl);