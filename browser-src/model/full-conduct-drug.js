"use strict";
const V = require("../validation");
const conduct_drug_1 = require("./conduct-drug");
const iyakuhin_master_1 = require("./iyakuhin-master");
class FullConductDrug extends conduct_drug_1.ConductDrug {
    constructor(conductDrugId, conductId, iyakuhincode, amount, name, yomi, unit, yakka, madoku, kouhatsu, zaikei, validFrom, validUpto) {
        super(conductDrugId, conductId, iyakuhincode, amount);
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
exports.FullConductDrug = FullConductDrug;
function validateFullConductDrug(drug) {
    let errs = conduct_drug_1.validateConductDrug(drug);
    if (errs.length > 0) {
        return errs;
    }
    errs = errs.concat(iyakuhin_master_1.validateIyakuhinMaster(drug));
    return errs;
}
exports.validateFullConductDrug = validateFullConductDrug;
function fromJsonToFullConductDrug(src) {
    let drug = new FullConductDrug(src.id, src.visit_conduct_id, src.iyakuhincode, src.amount, src.name, src.yomi, src.unit, +src.yakka, +src.madoku, src.kouhatsu === 0 ? false : true, +src.zaikei, src.valid_from, src.valid_upto);
    let errs = validateFullConductDrug(drug);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [drug, null];
    }
}
exports.fromJsonToFullConductDrug = fromJsonToFullConductDrug;
