"use strict";
const V = require("../validation");
const shinryou_1 = require("./shinryou");
const shinryou_master_1 = require("./shinryou-master");
class FullShinryou extends shinryou_1.Shinryou {
    constructor(shinryouId, visitId, shinryoucode, name, tensuu, tensuuShikibetsu, houketsuKensa, oushinKubun, kensaGroup, roujinTekiyou, codeShou, codeBu, codeAlpha, codeKubun, validFrom, validUpto) {
        super(shinryouId, visitId, shinryoucode);
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
exports.FullShinryou = FullShinryou;
function validateFullShinryou(shinryou) {
    let errs = shinryou_1.validateShinryou(shinryou);
    if (errs.length > 0) {
        return errs;
    }
    errs = errs.concat(shinryou_master_1.validateShinryouMaster(shinryou));
    return errs;
}
exports.validateFullShinryou = validateFullShinryou;
function fromJsonToFullShinryou(src) {
    let shinryou = new FullShinryou(src.shinryou_id, src.visit_id, src.shinryoucode, src.name, +src.tensuu, +src.tensuu_shikibetsu, src.houkatsukensa, +src.oushinkubun, src.kensagroup, +src.roujintekiyou, +src.code_shou, src.code_bu, src.code_alpha, src.code_kubun, src.valid_from, src.valid_upto);
    let errs = validateFullShinryou(shinryou);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [shinryou, null];
    }
}
exports.fromJsonToFullShinryou = fromJsonToFullShinryou;
