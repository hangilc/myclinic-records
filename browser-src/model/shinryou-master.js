"use strict";
const V = require("../validation");
class ShinryouMaster {
    constructor(shinryoucode, name, tensuu, tensuuShikibetsu, houketsuKensa, oushinKubun, kensaGroup, roujinTekiyou, codeShou, codeBu, codeAlpha, codeKubun, validFrom, validUpto) {
        this.shinryoucode = shinryoucode;
        this.name = name;
        this.tensuu = tensuu;
        this.tensuuShikibetsu = tensuuShikibetsu;
        this.houketsuKensa = houketsuKensa;
        this.oushinKubun = oushinKubun;
        this.kensaGroup = kensaGroup;
        this.roujinTekiyou = roujinTekiyou;
        this.codeShou = codeShou;
        this.codeBu = codeBu;
        this.codeAlpha = codeAlpha;
        this.codeKubun = codeKubun;
        this.validFrom = validFrom;
        this.validUpto = validUpto;
    }
}
exports.ShinryouMaster = ShinryouMaster;
function validateShinryouMaster(shinryouMaster) {
    let errs = [];
    V.validate("診療コード", shinryouMaster.shinryoucode, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("名前", shinryouMaster.name, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("点数", shinryouMaster.tensuu, errs, [
        V.isDefined, V.isNumber, V.isZeroOrPositive
    ]);
    V.validate("点数識別", shinryouMaster.tensuuShikibetsu, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    V.validate("包括検査", shinryouMaster.houketsuKensa, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("往診区分", shinryouMaster.oushinKubun, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    V.validate("検査グループ", shinryouMaster.kensaGroup, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("老人適用", shinryouMaster.roujinTekiyou, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    V.validate("コード章", shinryouMaster.codeShou, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    V.validate("コード部", shinryouMaster.codeBu, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("コードアルファ", shinryouMaster.codeAlpha, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("コード区分", shinryouMaster.codeKubun, errs, [
        V.isDefined, V.isString, V.isNotEmpty
    ]);
    V.validate("有効期限（開始）", shinryouMaster.validFrom, errs, [
        V.isDefined, V.isSqlDate
    ]);
    V.validate("有効期限（終了）", shinryouMaster.validFrom, errs, [
        V.isDefined, V.isSqlDateOrZero
    ]);
    return errs;
}
exports.validateShinryouMaster = validateShinryouMaster;
function fromJsonToShinryouMaster(src) {
    let master = new ShinryouMaster(src.shinryoucode, src.name, +src.tensuu, +src.tensuu_shikibetsu, src.houkatsukensa, +src.oushinkubun, src.kensagroup, +src.roujintekiyou, +src.code_shou, src.code_bu, src.code_alpha, src.code_kubun, src.valid_from, src.valid_upto);
    let errs = validateShinryouMaster(master);
    if (errs.length > 0) {
        return new V.ValidationError(errs);
    }
    else {
        return master;
    }
}
exports.fromJsonToShinryouMaster = fromJsonToShinryouMaster;
