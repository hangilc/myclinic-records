"use strict";
const V = require("../validation");
class Roujin {
    constructor(roujinId, patientId, shichouson, jukyuusha, futanWari, validFrom, validUpto) {
        this.roujinId = roujinId;
        this.patientId = patientId;
        this.shichouson = shichouson;
        this.jukyuusha = jukyuusha;
        this.futanWari = futanWari;
        this.validFrom = validFrom;
        this.validUpto = validUpto;
    }
}
exports.Roujin = Roujin;
function validateRoujin(roujin, checkRoujinId = true) {
    let errs = [];
    if (checkRoujinId) {
        V.validate("roujinId", roujin.roujinId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("患者番号", roujin.patientId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("市町村番号", roujin.shichouson, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("受給者番号", roujin.jukyuusha, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("負担割", roujin.futanWari, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    V.validate("有効期限（開始）", roujin.validFrom, errs, [
        V.isDefined, V.isSqlDate
    ]);
    V.validate("有効期限（終了）", roujin.validFrom, errs, [
        V.isDefined, V.isSqlDateOrZero
    ]);
    return errs;
}
exports.validateRoujin = validateRoujin;
function fromJsonToRoujin(src) {
    let roujin = new Roujin(src.roujin_id, src.patient_id, src.shichouson, src.jukyuusha, src.futan_wari, src.valid_from, src.valid_upto);
    let errs = validateRoujin(roujin, true);
    if (errs.length > 0) {
        return new V.ValidationError(errs);
    }
    else {
        return roujin;
    }
}
exports.fromJsonToRoujin = fromJsonToRoujin;
