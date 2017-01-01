"use strict";
const moment = require("moment");
const kanjidate = require("kanjidate");
const typed_dom_1 = require("./typed-dom");
const service_1 = require("./service");
class DateInput {
    create() {
        return typed_dom_1.h.div({}, [
            typed_dom_1.f.form(e => this.bindSubmit(e), {}, [
                "平成",
                typed_dom_1.f.input(e => this.nenInput = e, { size: "4", class: "num-input" }),
                "年 ",
                typed_dom_1.f.input(e => this.monthInput = e, { size: "4", class: "num-input" }),
                "月 ",
                typed_dom_1.f.input(e => this.dayInput = e, { size: "4", class: "num-input" }),
                "日 ",
                typed_dom_1.h.input({ type: "submit", value: "選択" }),
                " ",
                typed_dom_1.f.a(e => typed_dom_1.click(e, _ => this.setToday()), {}, ["[本日]"])
            ])
        ]);
    }
    bindSubmit(form) {
        form.addEventListener("submit", (event) => {
            let m = this.get();
            if (!m) {
                alert("日付の入力が不適切です。");
                return;
            }
            let sqlDate = m.format("YYYY-MM-DD");
            service_1.listVisitsByDate(sqlDate)
                .then(function (result) {
                console.log(result);
            })
                .catch(function (ex) {
                alert(ex);
                return;
            });
        });
    }
    set(m) {
        let month = m.month() + 1;
        let day = m.date();
        let g = kanjidate.toGengou(m.year(), month, day);
        this.nenInput.value = g.nen.toString();
        this.monthInput.value = month.toString();
        this.dayInput.value = day.toString();
    }
    setToday() {
        this.set(moment());
    }
    get() {
        let gengou = "平成";
        let nen = +this.nenInput.value;
        let month = +this.monthInput.value;
        let day = +this.dayInput.value;
        let year = kanjidate.fromGengou(gengou, nen);
        let m = moment({ year: year, month: month - 1, date: day });
        if (m.isValid()) {
            return m;
        }
        else {
            return undefined;
        }
    }
}
let body = document.body;
let dateInput = new DateInput();
body.appendChild(typed_dom_1.h.h1({}, ["診察日ごとの診療録リスト"]));
body.appendChild(dateInput.create());
dateInput.setToday();
const service = require("./service");
service.getShinryouMaster(160208510, "2016-12-30")
    .then(function (result) {
    console.log(result);
})
    .catch(function (ex) {
    console.log("ERROR", ex);
});
