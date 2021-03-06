"use strict";
const conduct_drug_1 = require("./conduct-drug");
const iyakuhin_master_1 = require("./iyakuhin-master");
class FullConductDrug extends conduct_drug_1.ConductDrug {
}
exports.FullConductDrug = FullConductDrug;
function jsonToFullConductDrug(src) {
    let drug = new FullConductDrug();
    conduct_drug_1.fillConductDrugFromJson(drug, src);
    iyakuhin_master_1.fillIyakuhinMasterFromJson(drug, src);
    return drug;
}
exports.jsonToFullConductDrug = jsonToFullConductDrug;
/*
export function validateFullConductDrug(drug: FullConductDrug): string[] {
    let errs: string[] = validateConductDrug(drug);
    if( errs.length > 0 ){
        return errs;
    }
    errs = errs.concat(validateIyakuhinMaster(drug));
    return errs;
}

export function fromJsonToFullConductDrug(src: any): FullConductDrug | V.ValidationError {
    let drug = new FullConductDrug(src.id, src.visit_conduct_id,
        src.iyakuhincode, src.amount,
        src.name, src.yomi, src.unit,
        +src.yakka, +src.madoku, src.kouhatsu === 0 ? false : true,
        +src.zaikei, src.valid_from, src.valid_upto);
    let errs = validateFullConductDrug(drug);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return drug;
    }
}
*/
