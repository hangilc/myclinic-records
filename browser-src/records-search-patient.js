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
        this.dom = typed_dom_1.h.div({}, [
            typed_dom_1.h.h1({}, ["患者ごとの診療録リスト"]),
            new SearchPatient().dom
        ]);
    }
}
exports.RecordsSearchPatient = RecordsSearchPatient;
class SearchPatient {
    constructor() {
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
    }
    doSearch(text) {
        return __awaiter(this, void 0, void 0, function* () {
            let patients = yield service_1.searchPatient(text);
            console.log(patients);
        });
    }
}
