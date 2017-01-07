"use strict";
class KizaiMaster {
}
exports.KizaiMaster = KizaiMaster;
function fillKizaiMasterFromJson(m, src) {
    m.kizaicode = src.kizaicode;
    m.name = src.name;
    m.yomi = src.yomi;
    m.unit = src.unit;
    m.kingaku = +src.kingaku;
    m.validFrom = src.valid_from;
    m.validUpto = src.valid_upto;
}
exports.fillKizaiMasterFromJson = fillKizaiMasterFromJson;
function jsonToKizaiMaster(src) {
    let m = new KizaiMaster();
    fillKizaiMasterFromJson(m, src);
    return m;
}
exports.jsonToKizaiMaster = jsonToKizaiMaster;
/*
export function fromJsonToKizaiMaster(src: any): KizaiMaster | V.ValidationError {
    let master = new KizaiMaster(
        src.kizaicode,
        src.name,
        src.yomi,
        src.unit,
        +src.kingaku,
        src.valid_from,
        src.valid_upto
    );
    let errs = validateKizaiMaster(master);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return master;
    }
}

export function validateKizaiMaster(kizaiMaster: KizaiMaster): string[] {
    let errs: string[] = [];
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
*/
