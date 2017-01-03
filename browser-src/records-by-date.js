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
const myclinic_util_1 = require("./myclinic-util");
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
    set(m) {
        this.dateInput.set(m);
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
        fullVisits.forEach(v => {
            this.renderVisit(v, wrapper);
        });
    }
    renderVisit(visit, wrapper) {
        return __awaiter(this, void 0, void 0, function* () {
            let patient = yield service_1.getPatient(visit.patientId);
            let rec = new RecordItem(visit, patient);
            wrapper.appendChild(rec.dom);
        });
    }
}
exports.RecordsByDate = RecordsByDate;
function createHeader(m) {
    return typed_dom_1.h.h2({}, [kanjidate.format(kanjidate.f1, m.format("YYYY-MM-DD"))]);
}
function formatVisitTime(at) {
    return kanjidate.format("{h:2}時{m:2}分", at);
}
class RecordItem {
    constructor(visit, patient) {
        let content = new RecordContent(visit);
        this.dom = typed_dom_1.h.div({}, [
            typed_dom_1.h.h3({}, [
                `${patient.lastName} ${patient.firstName}`,
                " ",
                `(患者番号 ${patient.patientId})`,
                "[",
                typed_dom_1.f.a(e => { }, {}, ["全診療記録"]),
                "]",
                " ",
                formatVisitTime(visit.visitedAt),
            ]),
            content.dom
        ]);
    }
}
class RecordContent {
    constructor(visit) {
        let left = {
            style: "background-color: rgb(255, 255, 153)",
            valign: "top",
            width: "260",
            class: "texts-list"
        };
        let right = {
            style: "background-color: rgb(255, 204, 255)",
            valign: "top",
            width: "260"
        };
        this.dom = typed_dom_1.h.table({ style: "margin-left:10px",
            border: "0", cellpadding: "0", cellspacing: "0" }, [
            typed_dom_1.h.tbody({}, [
                typed_dom_1.h.tr({}, [
                    typed_dom_1.h.td(left, [
                        new RecordTextList(visit.texts).dom
                    ]),
                    typed_dom_1.h.td(right, [
                        new RecordDrugList(visit.drugs).dom
                    ])
                ])
            ])
        ]);
    }
}
class RecordTextList {
    constructor(texts) {
        this.dom = typed_dom_1.h.div({}, texts.map(t => {
            let rt = new RecordText(t);
            return rt.dom;
        }));
    }
}
class RecordText {
    constructor(text) {
        let content = text.content;
        let lines = content.split(/\r\n|\r|\n/g);
        let attr = {
            style: "font-family:sans-serif; font-size:14px; margin:10px;"
        };
        this.dom = typed_dom_1.h.p(attr, []);
        lines.forEach(line => {
            let t = document.createTextNode(line);
            this.dom.appendChild(t);
            this.dom.appendChild(typed_dom_1.h.br({}, []));
        });
    }
}
class RecordDrugList {
    constructor(drugs) {
        let index = 1;
        this.dom = typed_dom_1.h.div({ class: "drugs-list" }, drugs.map(d => {
            let item = new RecordDrug(index++, d);
            return item.dom;
        }));
    }
}
class RecordDrug {
    constructor(index, drug) {
        this.dom = typed_dom_1.h.div({}, [
            index.toString(),
            ") ",
            myclinic_util_1.drugRep(drug)
        ]);
    }
}
