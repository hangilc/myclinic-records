"use strict";
const V = require("../validation");
class Charge {
    constructor(visitId, charge) {
        this.visitId = visitId;
        this.charge = charge;
    }
}
exports.Charge = Charge;
function validateCharge(charge) {
    let errs = [];
    V.validate("visitId", charge.visitId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("金額", charge.charge, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    return errs;
}
exports.validateCharge = validateCharge;
function fromJsonToCharge(src) {
    let charge = new Charge(src.visit_id, src.charge);
    let errs = validateCharge(charge);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [charge, null];
    }
}
exports.fromJsonToCharge = fromJsonToCharge;
