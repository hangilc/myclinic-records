"use strict";
function createElement(tag, attrs, children) {
    let e = document.createElement(tag);
    for (let key in attrs) {
        let val = attrs[key];
        if (key === "style") {
            if (typeof val === "string") {
                e.style.cssText = val;
            }
            else {
                for (let cssKey in val) {
                    e.style[cssKey] = val[cssKey];
                }
            }
        }
        else {
            e.setAttribute(key, val);
        }
    }
    if (children) {
        children.forEach(function (n) {
            if (typeof n === "string") {
                e.appendChild(document.createTextNode(n));
            }
            else {
                e.appendChild(n);
            }
        });
    }
    return e;
}
exports.createElement = createElement;
function createElementFn(fn, tag, attrs, children) {
    let e = createElement(tag, attrs, children);
    fn(e);
    return e;
}
exports.createElementFn = createElementFn;
var h;
(function (h) {
    function makeCreator(tag) {
        return function (attrs, children) {
            return createElement(tag, attrs, children);
        };
    }
    h.div = makeCreator("div");
    h.h1 = makeCreator("h1");
    h.h2 = makeCreator("h2");
    h.h3 = makeCreator("h3");
    h.input = makeCreator("input");
    h.button = makeCreator("button");
    h.table = makeCreator("table");
    h.tbody = makeCreator("tbody");
    h.tr = makeCreator("tr");
    h.td = makeCreator("td");
    h.br = makeCreator("br");
    h.p = makeCreator("p");
    function form(attrs, children) {
        if (!("onSubmit" in attrs)) {
            attrs.onSubmit = "return false";
        }
        return createElement("form", attrs, children);
    }
    h.form = form;
    function a(attrs, children) {
        if (!("href" in attrs)) {
            attrs.href = "javascript:void(0)";
        }
        return createElement("a", attrs, children);
    }
    h.a = a;
})(h = exports.h || (exports.h = {}));
var f;
(function (f) {
    function makeCreator(tag) {
        return function (fn, attrs, children) {
            return createElementFn(fn, tag, attrs, children);
        };
    }
    f.div = makeCreator("div");
    f.h1 = makeCreator("h1");
    f.h2 = makeCreator("h2");
    f.h3 = makeCreator("h3");
    f.input = makeCreator("input");
    f.button = makeCreator("button");
    f.table = makeCreator("table");
    f.tbody = makeCreator("tbody");
    f.tr = makeCreator("tr");
    f.td = makeCreator("td");
    f.br = makeCreator("br");
    f.p = makeCreator("p");
    function form(fn, attrs, children) {
        if (!("onSubmit" in attrs)) {
            attrs.onSubmit = "return false";
        }
        return createElementFn(fn, "form", attrs, children);
    }
    f.form = form;
    function a(fn, attrs, children) {
        if (!("href" in attrs)) {
            attrs.href = "javascript:void(0)";
        }
        return createElementFn(fn, "a", attrs, children);
    }
    f.a = a;
})(f = exports.f || (exports.f = {}));
function range(from, to) {
    let r = [];
    for (let i = from; i <= to; i++) {
        r.push(i);
    }
    return r;
}
exports.range = range;
function interpose(sep, arr) {
    let r = [];
    for (let i = 0; i < arr.length; i++) {
        r.push(arr[i]);
        if (i !== (arr.length - 1)) {
            r.push(sep);
        }
    }
    return r;
}
exports.interpose = interpose;
