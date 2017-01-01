"use strict";
const V = require("../validation");
const conduct_1 = require("./conduct");
const full_conduct_shinryou_1 = require("./full-conduct-shinryou");
const full_conduct_drug_1 = require("./full-conduct-drug");
const full_conduct_kizai_1 = require("./full-conduct-kizai");
class FullConduct extends conduct_1.Conduct {
    constructor(conductId, visitId, kind, gazouLabel, drugs, shinryouList, kizaiList) {
        super(conductId, visitId, kind);
        this.gazouLabel = gazouLabel;
        this.drugs = drugs;
        this.shinryouList = shinryouList;
        this.kizaiList = kizaiList;
    }
}
exports.FullConduct = FullConduct;
function validateFullConduct(conduct) {
    let errs = conduct_1.validateConduct(conduct);
    V.validate("画像ラベル", conduct.gazouLabel, errs, [
        V.isDefined, V.isOptionalString
    ]);
    conduct.drugs.forEach(s => {
        errs = errs.concat(full_conduct_drug_1.validateFullConductDrug(s));
    });
    conduct.shinryouList.forEach(s => {
        errs = errs.concat(full_conduct_shinryou_1.validateFullConductShinryou(s));
    });
    conduct.kizaiList.forEach(s => {
        errs = errs.concat(full_conduct_kizai_1.validateFullConductKizai(s));
    });
    return errs;
}
exports.validateFullConduct = validateFullConduct;
function fromJsonToFullConduct(src) {
    let drugs = src.drugs.map(s => {
        let [result, err] = full_conduct_drug_1.fromJsonToFullConductDrug(s);
        if (err) {
            return [undefined, err];
        }
        return result;
    });
    let shinryouList = src.shinryou_list.map(s => {
        let [result, err] = full_conduct_shinryou_1.fromJsonToFullConductShinryou(s);
        if (err) {
            return [undefined, err];
        }
        return result;
    });
    let kizaiList = src.kizai_list.map(s => {
        let [result, err] = full_conduct_kizai_1.fromJsonToFullConductKizai(s);
        if (err) {
            return [undefined, err];
        }
        return result;
    });
    let conduct = new FullConduct(src.id, src.visit_id, src.kind, src.gazou_label, drugs, shinryouList, kizaiList);
    let errs = validateFullConduct(conduct);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [conduct, null];
    }
}
exports.fromJsonToFullConduct = fromJsonToFullConduct;
