"use strict";
const V = require("../validation");
class Drug {
    constructor(drugId, visitId, iyakuhincode, amount, usage, days, category, prescribed) {
        this.drugId = drugId;
        this.visitId = visitId;
        this.iyakuhincode = iyakuhincode;
        this.amount = amount;
        this.usage = usage;
        this.days = days;
        this.category = category;
        this.prescribed = prescribed;
    }
}
exports.Drug = Drug;
function validateDrug(drug, checkDrugId = true) {
    let errs = [];
    if (checkDrugId) {
        V.validate("drugId", drug.drugId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("visitId", drug.visitId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("医薬品コード", drug.iyakuhincode, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("用量", drug.amount, errs, [
        V.isDefined, V.isString, V.isFloatCompatibleString
    ]);
    V.validate("用法", drug.usage, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("日数", drug.days, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    V.validate("種類", drug.category, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    V.validate("処方済", drug.prescribed, errs, [
        V.isDefined, V.isBoolean
    ]);
    return errs;
}
exports.validateDrug = validateDrug;
function fromJsonToDrug(src) {
    let drug = new Drug(src.drug_id, src.visit_id, src.d_iyakuhincode, src.d_amount, src.d_usage, src.d_days, src.d_category, src.d_prescribed === 0 ? false : true);
    let errs = validateDrug(drug, true);
    if (errs.length > 0) {
        return new V.ValidationError(errs);
    }
    else {
        return drug;
    }
}
exports.fromJsonToDrug = fromJsonToDrug;
