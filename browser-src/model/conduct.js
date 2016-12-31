"use strict";
const V = require("../validation");
class Conduct {
    constructor(conductId, visitId, kind) {
        this.conductId = conductId;
        this.visitId = visitId;
        this.kind = kind;
    }
}
exports.Conduct = Conduct;
function validateConduct(conduct, checkConductId = true) {
    let errs = [];
    if (checkConductId) {
        V.validate("conductId", conduct.conductId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("visitId", conduct.visitId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("種類", conduct.kind, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    return errs;
}
exports.validateConduct = validateConduct;
function fromJsonToConduct(src) {
    let conduct = new Conduct(src.id, src.visit_id, src.kind);
    let errs = validateConduct(conduct, true);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [conduct, null];
    }
}
exports.fromJsonToConduct = fromJsonToConduct;
