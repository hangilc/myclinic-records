"use strict";
const V = require("../validation");
class KizaiMaster {
    constructor(kizaicode, name, yomi, unit, kingaku, validFrom, validUpto) {
        this.kizaicode = kizaicode;
        this.name = name;
        this.yomi = yomi;
        this.unit = unit;
        this.kingaku = kingaku;
        this.validFrom = validFrom;
        this.validUpto = validUpto;
    }
}
exports.KizaiMaster = KizaiMaster;
function validateKizaiMaster(kizaiMaster) {
    let errs = [];
    V.validate("器材コード", kizaiMaster.kizaicode, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("名前", kizaiMaster.name, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("よみ", kizaiMaster.yomi, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("単位", kizaiMaster.unit, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("金額", kizaiMaster.kingaku, errs, [
        V.isDefined, V.isNumber, V.isZeroOrPositive
    ]);
    V.validate("有効期限（開始）", kizaiMaster.validFrom, errs, [
        V.isDefined, V.isSqlDate
    ]);
    V.validate("有効期限（終了）", kizaiMaster.validFrom, errs, [
        V.isDefined, V.isSqlDateOrZero
    ]);
    return errs;
}
exports.validateKizaiMaster = validateKizaiMaster;
function fromJsonToKizaiMaster(src) {
    let master = new KizaiMaster(src.kizaicode, src.name, src.yomi, src.unit, +src.kingaku, src.valid_from, src.valid_upto);
    let errs = validateKizaiMaster(master);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [master, null];
    }
}
exports.fromJsonToKizaiMaster = fromJsonToKizaiMaster;
