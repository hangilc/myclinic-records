"use strict";
const V = require("../validation");
class Koukikourei {
    constructor(koukikoureiId, patientId, hokenshaBangou, hihokenshaBangou, futanWari, validFrom, validUpto) {
        this.koukikoureiId = koukikoureiId;
        this.patientId = patientId;
        this.hokenshaBangou = hokenshaBangou;
        this.hihokenshaBangou = hihokenshaBangou;
        this.futanWari = futanWari;
        this.validFrom = validFrom;
        this.validUpto = validUpto;
    }
}
exports.Koukikourei = Koukikourei;
function validateKoukikourei(koukikourei, checkKoukikoureiId = true) {
    let errs = [];
    if (checkKoukikoureiId) {
        V.validate("koukikoureiId", koukikourei.koukikoureiId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("患者番号", koukikourei.patientId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("保険者番号", koukikourei.hokenshaBangou, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("被保険者番号", koukikourei.hihokenshaBangou, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("負担割", koukikourei.futanWari, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    V.validate("有効期限（開始）", koukikourei.validFrom, errs, [
        V.isDefined, V.isSqlDate
    ]);
    V.validate("有効期限（終了）", koukikourei.validFrom, errs, [
        V.isDefined, V.isSqlDateOrZero
    ]);
    return errs;
}
exports.validateKoukikourei = validateKoukikourei;
function fromJsonToKoukikourei(src) {
    let koukikourei = new Koukikourei(src.koukikourei_id, src.patient_id, src.hokensha_bangou, src.hihokensha_bangou, src.futan_wari, src.valid_from, src.valid_upto);
    let errs = validateKoukikourei(koukikourei, true);
    if (errs.length > 0) {
        return new V.ValidationError(errs);
    }
    else {
        return koukikourei;
    }
}
exports.fromJsonToKoukikourei = fromJsonToKoukikourei;
