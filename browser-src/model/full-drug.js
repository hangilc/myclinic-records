"use strict";
const drug_1 = require("./drug");
const iyakuhin_master_1 = require("./iyakuhin-master");
class FullDrug extends drug_1.Drug {
}
exports.FullDrug = FullDrug;
function jsonToFullDrug(src) {
    let drug = new FullDrug();
    drug_1.fillDrugFromJson(drug, src);
    iyakuhin_master_1.fillIyakuhinMasterFromJson(drug, src);
    return drug;
}
exports.jsonToFullDrug = jsonToFullDrug;
/**
export function validateFullDrug(drug: FullDrug): string[] {
    let errs: string[] = validateDrug(drug);
    if( errs.length > 0 ){
        return errs;
    }
    errs = errs.concat(validateIyakuhinMaster(drug));
    return errs;
}

export function fromJsonToFullDrug(src: any): FullDrug | V.ValidationError {
    let drug = new FullDrug(src.drug_id, src.visit_id, src.d_iyakuhincode,
        src.d_amount, src.d_usage, src.d_days, src.d_category,
        src.d_prescribed === 0 ? false : true,
        src.name, src.yomi, src.unit,
        +src.yakka, +src.madoku, src.kouhatsu === 0 ? false : true,
        +src.zaikei, src.valid_from, src.valid_upto);
    let errs = validateFullDrug(drug);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return drug;
    }
}
**/
