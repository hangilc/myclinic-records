"use strict";
const V = require("../validation");
class Shinryou {
    constructor(shinryouId, visitId, shinryoucode) {
        this.shinryouId = shinryouId;
        this.visitId = visitId;
        this.shinryoucode = shinryoucode;
    }
}
exports.Shinryou = Shinryou;
function validateShinryou(shinryou, checkShinryouId = true) {
    let errs = [];
    if (checkShinryouId) {
        V.validate("shinryouId", shinryou.shinryouId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("visitId", shinryou.visitId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("診療コード", shinryou.shinryoucode, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    return errs;
}
exports.validateShinryou = validateShinryou;
function fromJsonToShinryou(src) {
    let shinryou = new Shinryou(src.shinryou_id, src.visit_id, src.shinryoucode);
    let errs = validateShinryou(shinryou, true);
    if (errs.length > 0) {
        return new V.ValidationError(errs);
    }
    else {
        return shinryou;
    }
}
exports.fromJsonToShinryou = fromJsonToShinryou;
