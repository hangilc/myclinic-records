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
    let gazouLabel;
    {
        let val = src.gazou_label;
        if (typeof val === "string") {
            gazouLabel = val;
        }
        else if (val === undefined || val === null) {
            gazouLabel = null;
        }
        else {
            return new V.ValidationError(["invalid gazou_label"]);
        }
    }
    let drugs;
    {
        let result = V.mapConvert(src.drugs, full_conduct_drug_1.fromJsonToFullConductDrug);
        if (result instanceof V.ValidationError) {
            return result;
        }
        else {
            drugs = result;
        }
    }
    let shinryouList;
    {
        let result = V.mapConvert(src.shinryou_list, full_conduct_shinryou_1.fromJsonToFullConductShinryou);
        if (result instanceof V.ValidationError) {
            return result;
        }
        else {
            shinryouList = result;
        }
    }
    let kizaiList;
    {
        let result = V.mapConvert(src.kizai_list, full_conduct_kizai_1.fromJsonToFullConductKizai);
        if (result instanceof V.ValidationError) {
            return result;
        }
        else {
            kizaiList = result;
        }
    }
    let conduct = new FullConduct(src.id, src.visit_id, src.kind, gazouLabel, drugs, shinryouList, kizaiList);
    let errs = validateFullConduct(conduct);
    if (errs.length > 0) {
        return new V.ValidationError(errs);
    }
    else {
        return conduct;
    }
}
exports.fromJsonToFullConduct = fromJsonToFullConduct;
