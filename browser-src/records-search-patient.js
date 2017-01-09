"use strict";
const typed_dom_1 = require("./typed-dom");
const search_patient_1 = require("./search-patient");
class RecordsSearchPatient {
    constructor() {
        this.onGotoRecordsByDate = () => { };
        this.search = new search_patient_1.SearchPatient();
        this.dom = typed_dom_1.h.div({}, [
            this.topMenu(),
            typed_dom_1.h.h1({}, ["患者ごとの診療録リスト"]),
            this.search.dom
        ]);
    }
    setOnSelect(cb) {
        this.search.setOnSelect(cb);
    }
    setOnGotoRecordsByDate(cb) {
        this.onGotoRecordsByDate = cb;
    }
    topMenu() {
        let bindClick = (e) => {
            e.addEventListener("click", event => {
                this.onGotoRecordsByDate();
            });
        };
        return typed_dom_1.h.div({}, [
            typed_dom_1.f.a(bindClick, {}, ["診察日ごとの診療録へ"])
        ]);
    }
}
exports.RecordsSearchPatient = RecordsSearchPatient;
