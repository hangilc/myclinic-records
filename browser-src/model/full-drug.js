"use strict";
const V = require("../validation");
const drug_1 = require("./drug");
const iyakuhin_master_1 = require("./iyakuhin-master");
class FullDrug extends drug_1.Drug {
    constructor(drugId, visitId, iyakuhincode, amount, usage, days, category, prescribed, name, yomi, unit, yakka, madoku, kouhatsu, zaikei, validFrom, validUpto) {
        super(drugId, visitId, iyakuhincode, amount, usage, days, category, prescribed);
        this.name = name;
        this.yomi = yomi;
        this.unit = unit;
        this.yakka = yakka;
        this.madoku = madoku;
        this.kouhatsu = kouhatsu;
        this.zaikei = zaikei;
        this.validFrom = validFrom;
        this.validUpto = validUpto;
    }
}
exports.FullDrug = FullDrug;
function validateFullDrug(drug) {
    let errs = drug_1.validateDrug(drug);
    if (errs.length > 0) {
        return errs;
    }
    errs = errs.concat(iyakuhin_master_1.validateIyakuhinMaster(drug));
    return errs;
}
exports.validateFullDrug = validateFullDrug;
function fromJsonToFullDrug(src) {
    let drug = new FullDrug(src.drug_id, src.visit_id, src.d_iyakuhincode, src.d_amount, src.d_usage, src.d_days, src.d_category, src.d_prescribed === 0 ? false : true, src.name, src.yomi, src.unit, +src.yakka, +src.madoku, src.kouhatsu === 0 ? false : true, +src.zaikei, src.valid_from, src.valid_upto);
    let errs = validateFullDrug(drug);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [drug, null];
    }
}
exports.fromJsonToFullDrug = fromJsonToFullDrug;
