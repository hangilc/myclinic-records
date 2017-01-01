"use strict";
const V = require("../validation");
class ConductShinryou {
    constructor(conductShinryouId, conductId, shinryoucode) {
        this.conductShinryouId = conductShinryouId;
        this.conductId = conductId;
        this.shinryoucode = shinryoucode;
    }
}
exports.ConductShinryou = ConductShinryou;
function validateConductShinryou(conductShinryou, checkConductShinryouId = true) {
    let errs = [];
    if (checkConductShinryouId) {
        V.validate("conductShinryouId", conductShinryou.conductShinryouId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("conductId", conductShinryou.conductId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("診療コード", conductShinryou.shinryoucode, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    return errs;
}
exports.validateConductShinryou = validateConductShinryou;
function fromJsonToConductShinryou(src) {
    let conductShinryou = new ConductShinryou(src.id, src.visit_conduct_id, src.shinryoucode);
    let errs = validateConductShinryou(conductShinryou, true);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [conductShinryou, null];
    }
}
exports.fromJsonToConductShinryou = fromJsonToConductShinryou;
