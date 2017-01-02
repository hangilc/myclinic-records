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
const date_input_1 = require("./records-by-date-lib/date-input");
const service_1 = require("./service");
class RecordsByDate {
    constructor() {
        this.dateInput = new date_input_1.DateInput();
        this.dom = typed_dom_1.h.div({}, [
            typed_dom_1.h.h1({}, ["診察日ごとの診療録リスト"]),
            this.dateInput.dom
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
            console.log(visits);
        });
    }
}
exports.RecordsByDate = RecordsByDate;
