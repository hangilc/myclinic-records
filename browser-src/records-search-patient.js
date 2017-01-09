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
class RecordsSearchPatient {
    constructor() {
        this.search = new SearchPatient();
        this.dom = typed_dom_1.h.div({}, [
            typed_dom_1.h.h1({}, ["患者ごとの診療録リスト"]),
            this.search.dom
        ]);
    }
    setOnSelect(cb) {
        this.search.setOnSelect(cb);
    }
}
exports.RecordsSearchPatient = RecordsSearchPatient;
class SearchPatient {
    constructor() {
        this.onSelect = _ => { };
        let textInput;
        let bindSubmit = (e) => {
            e.addEventListener("submit", event => {
                let text = textInput.value;
                this.doSearch(text);
            });
        };
        this.dom = typed_dom_1.h.div({}, [
            typed_dom_1.f.form(bindSubmit, {}, [
                typed_dom_1.f.input(e => textInput = e, {}, []), " ",
                typed_dom_1.h.input({ type: "submit", value: "検索" }, []),
                typed_dom_1.h.div({}, [
                    typed_dom_1.f.select(e => this.select = e, { size: "12", style: "width:360px; display:none" }, [])
                ])
            ])
        ]);
        this.select.addEventListener("dblclick", event => {
            let target = event.target;
            if (target instanceof HTMLOptionElement) {
                let value = +target.value;
                if (value > 0) {
                    this.onSelect(value);
                }
            }
        });
    }
    setOnSelect(cb) {
        this.onSelect = cb;
    }
    doSearch(text) {
        return __awaiter(this, void 0, void 0, function* () {
            let patients = yield service_1.searchPatient(text);
            let select = this.select;
            select.innerHTML = "";
            patients.forEach(patient => {
                let label = `${patient.lastName} ${patient.firstName}`;
                let opt = typed_dom_1.h.option({ value: patient.patientId }, [label]);
                select.appendChild(opt);
            });
            select.style.display = "";
        });
    }
}
