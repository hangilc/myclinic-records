"use strict";
const typed_dom_1 = require("./typed-dom");
const date_input_1 = require("./records-by-date-lib/date-input");
class RecordsByDate {
    createDom() {
        this.dateInput = new date_input_1.DateInput();
        this.dom = typed_dom_1.h.div({}, [
            typed_dom_1.h.h1({}, ["診察日ごとの診療録リスト"]),
            this.dateInput.createDom()
        ]);
        return this.dom;
    }
    setToday() {
        let d = this.dateInput;
        if (d) {
            d.setToday();
        }
    }
}
exports.RecordsByDate = RecordsByDate;
