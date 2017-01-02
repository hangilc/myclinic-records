"use strict";
const V = require("../validation");
class Kouhi {
    constructor(kouhiId, patientId, futansha, jukyuusha, validFrom, validUpto) {
        this.kouhiId = kouhiId;
        this.patientId = patientId;
        this.futansha = futansha;
        this.jukyuusha = jukyuusha;
        this.validFrom = validFrom;
        this.validUpto = validUpto;
    }
}
exports.Kouhi = Kouhi;
function validateKouhi(kouhi, checkKouhiId = true) {
    let errs = [];
    if (checkKouhiId) {
        V.validate("kouhiId", kouhi.kouhiId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("患者番号", kouhi.patientId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("負担者番号", kouhi.futansha, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("受給者番号", kouhi.jukyuusha, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("有効期限（開始）", kouhi.validFrom, errs, [
        V.isDefined, V.isSqlDate
    ]);
    V.validate("有効期限（終了）", kouhi.validFrom, errs, [
        V.isDefined, V.isSqlDateOrZero
    ]);
    return errs;
}
exports.validateKouhi = validateKouhi;
function fromJsonToKouhi(src) {
    let kouhi = new Kouhi(src.kouhi_id, src.patient_id, src.futansha, src.jukyuusha, src.valid_from, src.valid_upto);
    let errs = validateKouhi(kouhi, true);
    if (errs.length > 0) {
        return new V.ValidationError(errs);
    }
    else {
        return kouhi;
    }
}
exports.fromJsonToKouhi = fromJsonToKouhi;
