"use strict";
const V = require("../validation");
class ConductDrug {
    constructor(conductDrugId, conductId, iyakuhincode, amount) {
        this.conductDrugId = conductDrugId;
        this.conductId = conductId;
        this.iyakuhincode = iyakuhincode;
        this.amount = amount;
    }
}
exports.ConductDrug = ConductDrug;
function validateConductDrug(conductDrug, checkConductDrugId = true) {
    let errs = [];
    if (checkConductDrugId) {
        V.validate("conductDrugId", conductDrug.conductDrugId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("conductId", conductDrug.conductId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("医薬品コード", conductDrug.iyakuhincode, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("用量", conductDrug.amount, errs, [
        V.isDefined, V.isNumber, V.isZeroOrPositive
    ]);
    return errs;
}
exports.validateConductDrug = validateConductDrug;
function fromJsonToConductDrug(src) {
    let conductDrug = new ConductDrug(src.id, src.visit_conduct_id, src.iyakuhincode, src.amount);
    let errs = validateConductDrug(conductDrug, true);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [conductDrug, null];
    }
}
exports.fromJsonToConductDrug = fromJsonToConductDrug;
