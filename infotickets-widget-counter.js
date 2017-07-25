//docReady
!function (a, b) {
    "use strict";
    function g() {
        if (!d) {
            d = !0;
            for (var a = 0; a < c.length; a++)c[a].fn.call(window, c[a].ctx);
            c = []
        }
    }

    function h() {
        "complete" === document.readyState && g()
    }

    a = a || "docReady", b = b || window;
    var c = [], d = !1, e = !1;
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    b[a] = function (a, b) {
        return d ? void setTimeout(function () {
            a(b)
        }, 1) : (c.push({
            fn: a,
            ctx: b
        }), void("complete" === document.readyState || !document.attachEvent && "interactive" === document.readyState ? setTimeout(g, 1) : e || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", g, !1), window.addEventListener("load", g, !1)) : (document.attachEvent("onreadystatechange", h), window.attachEvent("onload", g)), e = !0)))
    }
}("docReady", window);

var ismobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

docReady(function () {


    var div = document.createElement("div");
    div.setAttribute("id", "widgetInfoTicketsNew");
    div.setAttribute("style", "overflow: hidden;position: fixed; z-index: 16000003; border: medium none;color: #fff; width: auto; height: auto; bottom: -1000px;");

    document.body.appendChild(div);




    var script = document.getElementById("script-info");
    var config =  script.getAttribute("data-config");

    console.log("CONFIG", config);

    setTimeout(function () {

        var frame = document.createElement("iframe");
        frame.setAttribute("scrolling", "no");
        frame.setAttribute("width", "100%");
        frame.setAttribute("height", "100%");
        frame.setAttribute("style", "border:none;");
        frame.setAttribute("src", "//admin.info-tickets.com/assets/novowidget/#!/widget?config="+config+"&pathname="+window.location.pathname);
        document.getElementById("widgetInfoTicketsNew").appendChild(frame);

    }, 1000);


    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    function setWidth(value) {
        document.getElementById("widgetInfoTicketsNew").style.width = value;
    }

    function setHeight(value) {
        document.getElementById("widgetInfoTicketsNew").style.height = value;
    }

    function setSize(width, height) {
        setWidth(width + "px");
        setHeight(height + "px");
    }

    var isFirst = true;
    var open = true;

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    eventer(messageEvent, function (e) {

        var key = e.message ? "message" : "data";


        if (isJson(e[key])) {


            var data = JSON.parse(e[key]);

            console.log(data);

            if (data.event == 'resize') {

                if (data.openWidget){
                    setSize(data.width, data.height);

                    if (data.position == 'right') {
                        document.getElementById("widgetInfoTicketsNew").style.right = "15px";
                    } else {
                        document.getElementById("widgetInfoTicketsNew").style.left = "-15px";
                    }

                    console.log("OPEN", open);

                    if (isFirst && open) {
                        document.getElementById("widgetInfoTicketsNew").style.bottom = "-2px";
                        isFirst = false;
                    }
                }


            } else if (data == 'ready') {

                if (typeof customField !== 'undefined') {
                    window.parent.postMessage({customField: customField}, '*')
                }

            } else if (data.event == 'mobile') {

                if (data.isMobile && !data.openInMobile) {
                    open = false;
                }
            } else if (data.event == 'open-concierge') {

                var types = {
                    'get': function (prop) {
                        return Object.prototype.toString.call(prop);
                    },
                    'object': '[object Object]',
                    'array': '[object Array]',
                    'string': '[object String]',
                    'boolean': '[object Boolean]',
                    'number': '[object Number]'
                }

                var scriptAttributes = document.createElement("script");

                var scriptData = "";
                if (data.data) {

                    var obj = data.data;
                    for (var prop in obj) {

                        var value = obj[prop];
                        if (types.get(value) == types.number || types.get(value) == types.boolean) {
                            scriptData += "var " + prop + " = " + value + ";\n";
                        } else if (types.get(value) == types.string) {
                            scriptData += "var " + prop + " = '" + value + "';\n";
                        }
                    }

                }

                scriptAttributes.innerHTML = scriptData;
                document.getElementsByTagName("head")[0].appendChild(scriptAttributes);

                var script = document.createElement("script");
                script.setAttribute("src", "//admin.info-tickets.com/assets/lounge3/assets/js/info-tickets-widget.js");
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }

    }, false);

});
