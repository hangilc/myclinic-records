"use strict";
const V = require("../validation");
class IyakuhinMaster {
    constructor(iyakuhincode, name, yomi, unit, yakka, madoku, kouhatsu, zaikei, validFrom, validUpto) {
        this.iyakuhincode = iyakuhincode;
        this.name = name;
        this.yomi = yomi;
        this.unit = unit;
        this.yakka = yakka;
        this.madoku = madoku;
        this.kouhatsu = kouhatsu;
        this.zaikei = zaikei;
        this.validFrom = validFrom;
        this.validUpto = validUpto;
    }
}
exports.IyakuhinMaster = IyakuhinMaster;
function validateIyakuhinMaster(iyakuhinMaster) {
    let errs = [];
    V.validate("医薬品コード", iyakuhinMaster.iyakuhincode, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("名前", iyakuhinMaster.name, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("よみ", iyakuhinMaster.yomi, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("単位", iyakuhinMaster.unit, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("薬価", iyakuhinMaster.yakka, errs, [
        V.isDefined, V.isNumber, V.isZeroOrPositive
    ]);
    V.validate("麻毒", iyakuhinMaster.madoku, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    V.validate("後発", iyakuhinMaster.kouhatsu, errs, [
        V.isDefined, V.isBoolean
    ]);
    V.validate("剤型", iyakuhinMaster.zaikei, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    V.validate("有効期限（開始）", iyakuhinMaster.validFrom, errs, [
        V.isDefined, V.isSqlDate
    ]);
    V.validate("有効期限（終了）", iyakuhinMaster.validFrom, errs, [
        V.isDefined, V.isSqlDateOrZero
    ]);
    return errs;
}
exports.validateIyakuhinMaster = validateIyakuhinMaster;
function fromJsonToIyakuhinMaster(src) {
    let master = new IyakuhinMaster(src.iyakuhincode, src.name, src.yomi, src.unit, +src.yakka, +src.madoku, src.kouhatsu === 0 ? false : true, +src.zaikei, src.valid_from, src.valid_upto);
    let errs = validateIyakuhinMaster(master);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [master, null];
    }
}
exports.fromJsonToIyakuhinMaster = fromJsonToIyakuhinMaster;
