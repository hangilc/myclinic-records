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
const record_content_1 = require("./record-content");
class RecordsByDate {
    constructor() {
        this.onGotoPatientRecords = _ => { };
        this.onGotoSearchRecords = () => { };
        this.dateInput = new date_input_1.DateInput();
        this.dom = typed_dom_1.h.div({}, [
            this.topMenu(),
            typed_dom_1.h.h1({}, ["診察日ごとの診療録リスト"]),
            this.dateInput.dom,
            typed_dom_1.f.div(e => this.domDispWrapper = e, {}, [])
        ]);
        this.dateInput.setOnSubmit((m) => {
            this.onDateInputSubmit(m);
        });
    }
    setOnGotoPatientRecords(cb) {
        this.onGotoPatientRecords = cb;
    }
    setOnSearchRecords(cb) {
        this.onGotoSearchRecords = cb;
    }
    setToday() {
        this.dateInput.setToday();
    }
    set(m) {
        this.dateInput.set(m);
    }
    topMenu() {
        let bind = (a) => {
            a.addEventListener("click", () => {
                this.onGotoSearchRecords();
            });
        };
        return typed_dom_1.h.div({}, [
            typed_dom_1.f.a(bind, {}, ["患者ごとの診療記録へ"])
        ]);
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
            }
        });
    }
    renderDisp(m, visits) {
        var wrapper = this.domDispWrapper;
        var nav = new RecordNav(visits);
        nav.setOnChange(() => {
            let curVisits = nav.getCurrentVisits();
            this.renderVisits(vWrapper, curVisits);
            nav.updateDoms();
        });
        wrapper.innerHTML = "";
        wrapper.appendChild(this.createHeader(m));
        wrapper.appendChild(nav.createDom());
        let vWrapper = typed_dom_1.h.div({}, []);
        wrapper.appendChild(vWrapper);
        this.renderVisits(vWrapper, nav.getCurrentVisits());
        wrapper.appendChild(nav.createDom());
    }
    renderVisits(wrapper, visits) {
        let tmpDom = typed_dom_1.h.div({}, []);
        let cb = (patientId) => this.onGotoPatientRecords(patientId);
        wrapper.innerHTML = "";
        wrapper.appendChild(tmpDom);
        for (let i = 0; i < visits.length; i++) {
            let visit = visits[i];
            wrapper.appendChild(new RecordItem(visit, cb).dom);
        }
    }
    createHeader(m) {
        return typed_dom_1.h.h2({}, [kanjidate.format(kanjidate.f1, m.format("YYYY-MM-DD"))]);
    }
}
exports.RecordsByDate = RecordsByDate;
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
        let dom = typed_dom_1.h.div({}, [this.createContentDom()]);
        this.doms.push(dom);
        return dom;
    }
    createContentDom() {
        return typed_dom_1.h.div({ style: "margin: 10px 0" }, [
            this.prevLink(),
            " ",
            ...this.pageLinks(),
            " ",
            this.nextLink()
        ]);
    }
    updateDoms() {
        this.doms.forEach(dom => {
            dom.innerHTML = "";
            dom.appendChild(this.createContentDom());
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
    constructor(visit, cb) {
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
                    typed_dom_1.f.a(e => bindGotoPatientRecords(e), {}, ["全診療記録"]),
                    "]",
                    " ",
                    this.formatVisitTime(visit.visitedAt),
                ]),
                new record_content_1.RecordContent(fullVisit).dom
            ]);
            let parent = this.dom.parentNode;
            if (parent !== null) {
                parent.replaceChild(newDom, this.dom);
            }
        });
        function bindGotoPatientRecords(a) {
            a.addEventListener("click", () => {
                cb(visit.patientId);
            });
        }
    }
    formatVisitTime(at) {
        return kanjidate.format("{h:2}時{m:2}分", at);
    }
}
