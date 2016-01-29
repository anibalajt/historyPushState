document.addEventListener('click', function(e) {
    currentPage(e)
})
function currentPage(e){
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
                injectPage(el.pathname);
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }
    }
}
function injectPage(p, opt_addToHistory) {

    var xhr = new XMLHttpRequest();

    var url = "http://localhost:3000/api"+p;

    xhr.open('GET', url, true);
    // xhr.responseType = 'document';
    // xhr.overrideMimeType("text/html; charset=utf-8");
    xhr.onloadend = function(e) {
        if (e.target.status != 200) {
            // TODO: use window.error and report this to server.
            console.error('Page fetch error', e.target.status, e.target.statusText);
            return;
        }
        if(p !=="/"){
            var data = JSON.parse(e.target.response);
            if(typeof data === "object"){
                $("#content").html(data.data)
                history.pushState({url: p}, "hola mundo", p);
            }
        }else{
            $("#content").html("inicio")
            history.pushState({url: "/"}, "hola mundo", "/");
        }

    };

    xhr.send();
}
