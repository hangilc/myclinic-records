"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const typed_dom_1 = require("./typed-dom");
const date_input_1 = require("./date-input");
const service_1 = require("./service");
const kanjidate = require("kanjidate");
class RecordsByDate {
    constructor() {
        this.dateInput = new date_input_1.DateInput();
        this.dom = typed_dom_1.h.div({}, [
            typed_dom_1.h.h1({}, ["診察日ごとの診療録リスト"]),
            this.dateInput.dom,
            typed_dom_1.f.div(e => this.domDispWrapper = e, {}, [])
        ]);
        this.dateInput.setOnSubmit((m) => {
            this.onDateInputSubmit(m);
        });
    }
    setToday() {
        this.dateInput.setToday();
    }
    onDateInputSubmit(m) {
        return __awaiter(this, void 0, void 0, function* () {
            let at = m.format("YYYY-MM-DD");
            let visits = yield service_1.listVisitsByDate(at);
            let fullVisits = yield Promise.all(visits.map(v => {
                return service_1.getFullVisit(v.visitId);
            }));
            this.renderDisp(m, fullVisits);
        });
    }
    renderDisp(m, fullVisits) {
        var wrapper = this.domDispWrapper;
        wrapper.innerHTML = "";
        wrapper.appendChild(createHeader(m));
    }
}
exports.RecordsByDate = RecordsByDate;
function createHeader(m) {
    return typed_dom_1.h.h2({}, [kanjidate.format(kanjidate.f1, m.format("YYYY-MM-DD"))]);
}
