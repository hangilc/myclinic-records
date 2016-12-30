define(["require", "exports", "text!template.html"], function (require, exports, tmpl) {
    "use strict";
    function run() {
        var d = document.createElement("div");
        var t = document.createTextNode(tmpl + "!");
        d.appendChild(t);
        document.getElementById("main").appendChild(d);
    }
    exports.run = run;
});
