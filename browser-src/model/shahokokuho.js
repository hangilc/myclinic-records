"use strict";
const V = require("../validation");
class Shahokokuho {
    constructor(shahokokuhoId, patientId, hokenshaBangou, hihokenshaKigou, hihokenshaBangou, honnin, validFrom, validUpto, kourei) {
        this.shahokokuhoId = shahokokuhoId;
        this.patientId = patientId;
        this.hokenshaBangou = hokenshaBangou;
        this.hihokenshaKigou = hihokenshaKigou;
        this.hihokenshaBangou = hihokenshaBangou;
        this.honnin = honnin;
        this.validFrom = validFrom;
        this.validUpto = validUpto;
        this.kourei = kourei;
    }
}
exports.Shahokokuho = Shahokokuho;
function validateShahokokuho(shahokokuho, checkShahokokuhoId = true) {
    let errs = [];
    if (checkShahokokuhoId) {
        V.validate("shahokokuhoId", shahokokuho.shahokokuhoId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("患者番号", shahokokuho.patientId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("保険者番号", shahokokuho.hokenshaBangou, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("被保険者記号", shahokokuho.hihokenshaKigou, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("被保険者番号", shahokokuho.hihokenshaBangou, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("本人", shahokokuho.honnin, errs, [
        V.isDefined, V.isBoolean
    ]);
    V.validate("有効期限（開始）", shahokokuho.validFrom, errs, [
        V.isDefined, V.isSqlDate
    ]);
    V.validate("有効期限（終了）", shahokokuho.validFrom, errs, [
        V.isDefined, V.isSqlDateOrZero
    ]);
    V.validate("高齢", shahokokuho.kourei, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    return errs;
}
exports.validateShahokokuho = validateShahokokuho;
function fromJsonToShahokokuho(src) {
    let shahokokuho = new Shahokokuho(src.shahokokuho_id, src.patient_id, src.hokensha_bangou, src.hihokensha_kigou, src.hihokensha_bangou, src.honnin === 0 ? false : true, src.valid_from, src.valid_upto, src.kourei);
    let errs = validateShahokokuho(shahokokuho, true);
    if (errs.length > 0) {
        return new V.ValidationError(errs);
    }
    else {
        return shahokokuho;
    }
}
exports.fromJsonToShahokokuho = fromJsonToShahokokuho;
