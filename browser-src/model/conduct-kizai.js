"use strict";
const V = require("../validation");
class ConductKizai {
    constructor(conductKizaiId, conductId, kizaicode, amount) {
        this.conductKizaiId = conductKizaiId;
        this.conductId = conductId;
        this.kizaicode = kizaicode;
        this.amount = amount;
    }
}
exports.ConductKizai = ConductKizai;
function validateConductKizai(conductKizai, checkConductKizaiId = true) {
    let errs = [];
    if (checkConductKizaiId) {
        V.validate("conductKizaiId", conductKizai.conductKizaiId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("conductId", conductKizai.conductId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("器材コード", conductKizai.kizaicode, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("用量", conductKizai.amount, errs, [
        V.isDefined, V.isNumber, V.isZeroOrPositive
    ]);
    return errs;
}
exports.validateConductKizai = validateConductKizai;
function fromJsonToConductKizai(src) {
    let conductKizai = new ConductKizai(src.id, src.visit_conduct_id, src.kizaicode, src.amount);
    let errs = validateConductKizai(conductKizai, true);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [conductKizai, null];
    }
}
exports.fromJsonToConductKizai = fromJsonToConductKizai;
