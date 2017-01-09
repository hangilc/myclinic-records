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
const model_1 = require("./model");
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
            try {
                let visits = yield service_1.listVisitsByDate(at);
                this.renderDisp(m, visits);
            }
            catch (ex) {
                alert(ex);
                return;
            }
        });
    }
    renderDisp(m, visits) {
        return __awaiter(this, void 0, void 0, function* () {
            var wrapper = this.domDispWrapper;
            var nav = new RecordNav(visits);
            nav.setOnChange(() => {
                let curVisits = nav.getCurrentVisits();
                this.renderVisits(vWrapper, curVisits);
                nav.updateDoms();
            });
            wrapper.innerHTML = "";
            wrapper.appendChild(createHeader(m));
            wrapper.appendChild(nav.createDom());
            let vWrapper = typed_dom_1.h.div({}, []);
            wrapper.appendChild(vWrapper);
            this.renderVisits(vWrapper, nav.getCurrentVisits());
            wrapper.appendChild(nav.createDom());
        });
    }
    renderVisits(wrapper, visits) {
        return __awaiter(this, void 0, void 0, function* () {
            let tmpDom = typed_dom_1.h.div({}, []);
            wrapper.innerHTML = "";
            wrapper.appendChild(tmpDom);
            for (let i = 0; i < visits.length; i++) {
                let visit = visits[i];
                wrapper.appendChild(new RecordItem(visit).dom);
            }
        });
    }
}
exports.RecordsByDate = RecordsByDate;
function createHeader(m) {
    return typed_dom_1.h.h2({}, [kanjidate.format(kanjidate.f1, m.format("YYYY-MM-DD"))]);
}
class RecordNav {
    constructor(visits) {
        this.visits = visits;
        this.doms = [];
        this.visitsPerPage = 10;
        this.onChange = () => { };
        this.totalPages = this.calcTotalPages(visits.length);
        this.currentPage = 1;
    }
    createDom() {
        let dom = typed_dom_1.h.div({ style: "margin: 10px 0" }, [
            this.prevLink(),
            " ",
            ...this.pageLinks(),
            " ",
            this.nextLink()
        ]);
        this.doms.push(dom);
        return dom;
    }
    updateDoms() {
        this.doms.forEach(dom => {
            let newDom = this.createDom();
            let parent = dom.parentNode;
            if (parent !== null) {
                parent.replaceChild(newDom, dom);
            }
        });
    }
    setOnChange(cb) {
        this.onChange = cb;
    }
    getCurrentVisits() {
        let offset = (this.currentPage - 1) * this.visitsPerPage;
        return this.visits.slice(offset, offset + this.visitsPerPage);
    }
    calcTotalPages(n) {
        return Math.floor((n + this.visitsPerPage - 1) / this.visitsPerPage);
    }
    prevLink() {
        let a = typed_dom_1.h.a({}, ["<"]);
        a.addEventListener("click", () => {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
                this.onChange();
            }
        });
        return a;
    }
    nextLink() {
        let a = typed_dom_1.h.a({}, [">"]);
        a.addEventListener("click", () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage += 1;
                this.onChange();
            }
        });
        return a;
    }
    pageLinks() {
        let links = typed_dom_1.range(1, this.totalPages).map(i => {
            return this.createPageLink(i);
        });
        return typed_dom_1.interpose(" | ", links);
    }
    createPageLink(i) {
        let attr = { style: {} };
        if (i === this.currentPage) {
            attr.style.color = "red";
        }
        let a = typed_dom_1.h.a(attr, [i.toString()]);
        a.addEventListener("click", () => {
            this.currentPage = i;
            this.onChange();
        });
        return a;
    }
}
class RecordItem {
    constructor(visit) {
        this.dom = typed_dom_1.h.div({}, ["Loading..."]);
        Promise.all([service_1.getFullVisit(visit.visitId), service_1.getPatient(visit.patientId)])
            .then(values => {
            let [fullVisit, patient] = values;
            let newDom = typed_dom_1.h.div({}, [
                typed_dom_1.h.h3({}, [
                    `${patient.lastName} ${patient.firstName}`,
                    " ",
                    `(患者番号 ${patient.patientId})`,
                    "[",
                    typed_dom_1.f.a(e => { }, {}, ["全診療記録"]),
                    "]",
                    " ",
                    this.formatVisitTime(visit.visitedAt),
                ]),
                new RecordContent(fullVisit).dom
            ]);
            let parent = this.dom.parentNode;
            if (parent !== null) {
                parent.replaceChild(newDom, this.dom);
            }
        });
    }
    formatVisitTime(at) {
        return kanjidate.format("{h:2}時{m:2}分", at);
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
                        new RecordShinryouList(visit.shinryouList).dom,
                        new RecordDrugList(visit.drugs).dom,
                        new RecordConductList(visit.conducts).dom,
                    ])
                ]),
                typed_dom_1.h.tr({}, [
                    typed_dom_1.h.td({ colspan: 2, style: "font-family:sans-serif; font-size:14px; padding:10px; background-color:#eee" }, [
                        this.chargeAndHokenRep(visit)
                    ])
                ])
            ])
        ]);
    }
    chargeAndHokenRep(visit) {
        let charge = this.chargeRep(visit.charge);
        let hoken = model_1.hokenRep(visit);
        return charge + ` ${hoken}`;
    }
    chargeRep(charge) {
        if (charge === null) {
            return "未請求";
        }
        else {
            return `請求額： ${charge.charge.toLocaleString()}円`;
        }
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
class RecordShinryouList {
    constructor(shinryouList) {
        this.dom = typed_dom_1.h.div({ class: "shinryou-list" }, shinryouList.map(s => {
            return new RecordShinryou(s).dom;
        }));
    }
}
class RecordShinryou {
    constructor(shinryou) {
        this.dom = typed_dom_1.h.div({}, [
            shinryou.name,
            " ",
            `[${shinryou.tensuu}点]`
        ]);
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
            myclinic_util_1.drugRep(drug),
            ` [薬価 ${drug.yakka}円]`
        ]);
    }
}
class RecordConductList {
    constructor(conducts) {
        this.dom = typed_dom_1.h.div({ class: "conducts-list" }, conducts.map(c => {
            return new RecordConduct(c).dom;
        }));
    }
}
class RecordConduct {
    constructor(conduct) {
        let label = "";
        if (conduct.gazouLabel !== null) {
            label = conduct.gazouLabel;
        }
        this.dom = typed_dom_1.h.div({}, [
            typed_dom_1.h.div({}, [`[${myclinic_util_1.conductKindToKanji(conduct.kind)}]`]),
            ...(label === "" ? [] : [label]),
            ...conduct.shinryouList.map(s => this.renderShinryou(s)),
            ...conduct.drugs.map(d => this.renderDrug(d)),
            ...conduct.kizaiList.map(k => this.renderKizai(k))
        ]);
    }
    renderShinryou(shinryou) {
        return typed_dom_1.h.div({}, [shinryou.name]);
    }
    renderDrug(drug) {
        return typed_dom_1.h.div({}, [`${drug.name} ${drug.amount}${drug.unit}`]);
    }
    renderKizai(kizai) {
        return typed_dom_1.h.div({}, [`${kizai.name} ${kizai.amount}${kizai.unit}`]);
    }
}
