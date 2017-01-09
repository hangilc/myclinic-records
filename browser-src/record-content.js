"use strict";
const model_1 = require("./model");
const typed_dom_1 = require("./typed-dom");
const myclinic_util_1 = require("./myclinic-util");
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
exports.RecordContent = RecordContent;
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
