document.addEventListener('click', function(e) {
    // Allow users to open new tabs.
    if (e.metaKey || e.ctrlKey || e.which == 2) {
        return;
    }
    for (var i = 0; i < e.path.length; ++i) {
        var el = e.path[i];

        if (el.localName == 'a') {
            wasRelativeAnchorClick = !!el.hash;
            // console.log(el.getAttribute('href').match(/^(http?:|javascript:|\/\/)/))
            if ((!el.hasAttribute('data-external-link')) &&
            (location.origin == el.origin) &&
            !(el.hash && (el.pathname == location.pathname)) &&
            el.target == '') {
                // console.log(el.href)
                injectPage(el.pathname);
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }
    }
})


document.addEventListener('polymer-ready', function(e) {
    console.log("polymer-ready")
})
document.addEventListener('DOMContentLoaded', function(e) {
    console.log("DOMContentLoaded")

})
function injectPage(url, opt_addToHistory) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', "http://192.168.1.10:3000/api"+url,true);
    // xhr.responseType = 'document';
    // xhr.overrideMimeType("text/html; charset=utf-8");
    xhr.onloadend = function(e) {
        if (e.target.status != 200) {
            // TODO: use window.error and report this to server.
            console.error('Page fetch error', e.target.status, e.target.statusText);
            return;
        }

        var doc = e.target.response;
        console.log(doc)
        history.pushState({url: url}, "hola mundo", url);
    };

    xhr.send();
}
