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
const service_1 = require("./service");
const model_1 = require("./model");
const kanjidate = require("kanjidate");
const record_content_1 = require("./record-content");
class RecordsByPatient {
    constructor(patientId) {
        this.patientId = patientId;
        this.onGotoRecordsByDate = () => { };
        this.onGotoSearchPatient = () => { };
        this.dom = typed_dom_1.h.div({}, ["Loading..."]);
        this.setup(patientId);
    }
    setOnGotoRecordsByDate(cb) {
        this.onGotoRecordsByDate = cb;
    }
    setOnGotoSearchPatient(cb) {
        this.onGotoSearchPatient = cb;
    }
    setup(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            let patient = yield service_1.getPatient(patientId);
            let totalVisits = yield service_1.calcVisits(patientId);
            let nav = new RecordNav(patientId, totalVisits);
            nav.setOnChange(visits => {
                this.renderVisits(visitsWrapper, visits);
                nav.updateDoms();
            });
            let dom = this.dom;
            dom.innerHTML = "";
            dom.appendChild(this.topMenu());
            dom.appendChild(typed_dom_1.h.h2({}, [this.titleLabel(patient)]));
            dom.appendChild(this.patientInfo(patient));
            dom.appendChild(nav.createDom());
            let visitsWrapper = typed_dom_1.h.div({}, []);
            dom.appendChild(visitsWrapper);
            dom.appendChild(nav.createDom());
            nav.invokeOnChange();
        });
    }
    topMenu() {
        let bindGotoByDates = (e) => {
            e.addEventListener("click", event => {
                this.onGotoRecordsByDate();
            });
        };
        let bindGotoSearch = (e) => {
            e.addEventListener("click", event => {
                this.onGotoSearchPatient();
            });
        };
        return typed_dom_1.h.div({}, [
            typed_dom_1.f.a(bindGotoByDates, {}, ["診察日ごとの診療録へ"]),
            " | ",
            typed_dom_1.f.a(bindGotoSearch, {}, ["患者検索へ"]),
        ]);
    }
    renderVisits(wrapper, visits) {
        let tmpDom = typed_dom_1.h.div({}, []);
        wrapper.innerHTML = "";
        wrapper.appendChild(tmpDom);
        for (let i = 0; i < visits.length; i++) {
            let visit = visits[i];
            wrapper.appendChild(new RecordItem(visit).dom);
        }
    }
    titleLabel(patient) {
        return `${patient.lastName} ${patient.firstName}（患者番号 ${patient.patientId}）様の診療記録`;
    }
    patientInfo(patient) {
        let birthdayPart = model_1.patientBirthdayRep(patient);
        if (birthdayPart !== "") {
            birthdayPart += `(${model_1.patientAge(patient)}才)`;
        }
        return typed_dom_1.h.p({}, [
            `(${patient.lastNameYomi} ${patient.firstNameYomi})`,
            " ",
            birthdayPart,
            " ",
            `${model_1.patientSexRep(patient)}性`
        ]);
    }
}
exports.RecordsByPatient = RecordsByPatient;
class RecordNav {
    constructor(patientId, totalVisits) {
        this.patientId = patientId;
        this.doms = [];
        this.currentPage = 1;
        this.visitsPerPage = 10;
        this.onChange = _ => { };
        this.totalPages = this.calcTotalPages(totalVisits);
    }
    createDom() {
        let contentDom = this.createConentDom();
        let dom = typed_dom_1.h.div({}, [this.createConentDom()]);
        this.doms.push(dom);
        return dom;
    }
    createConentDom() {
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
            dom.appendChild(this.createConentDom());
        });
    }
    setOnChange(cb) {
        this.onChange = cb;
    }
    invokeOnChange() {
        return __awaiter(this, void 0, void 0, function* () {
            let currentVisits = yield this.getCurrentVisits();
            this.onChange(currentVisits);
        });
    }
    getCurrentVisits() {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = (this.currentPage - 1) * this.visitsPerPage;
            return yield service_1.listVisits(this.patientId, offset, this.visitsPerPage);
        });
    }
    calcTotalPages(n) {
        return Math.floor((n + this.visitsPerPage - 1) / this.visitsPerPage);
    }
    prevLink() {
        let a = typed_dom_1.h.a({}, ["<"]);
        a.addEventListener("click", () => {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
                this.invokeOnChange();
            }
        });
        return a;
    }
    nextLink() {
        let a = typed_dom_1.h.a({}, [">"]);
        a.addEventListener("click", () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage += 1;
                this.invokeOnChange();
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
            this.invokeOnChange();
        });
        return a;
    }
}
class RecordItem {
    constructor(visit) {
        this.dom = typed_dom_1.h.div({}, ["Loading..."]);
        service_1.getFullVisit(visit.visitId)
            .then(fullVisit => {
            let newDom = typed_dom_1.h.div({}, [
                typed_dom_1.h.h3({}, [
                    this.formatVisitTime(visit.visitedAt),
                ]),
                new record_content_1.RecordContent(fullVisit).dom
            ]);
            let parent = this.dom.parentNode;
            if (parent !== null) {
                parent.replaceChild(newDom, this.dom);
            }
        });
    }
    formatVisitTime(at) {
        return kanjidate.format("{G}{N:2}年{M:2}月{D:2}日（{W}）{h:2}時{m:2}分", at);
    }
}
