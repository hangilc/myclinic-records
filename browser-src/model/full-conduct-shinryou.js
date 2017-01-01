"use strict";
const V = require("../validation");
const conduct_shinryou_1 = require("./conduct-shinryou");
const shinryou_master_1 = require("./shinryou-master");
class FullConductShinryou extends conduct_shinryou_1.ConductShinryou {
    constructor(conductShinryouId, conductId, shinryoucode, name, tensuu, tensuuShikibetsu, houketsuKensa, oushinKubun, kensaGroup, roujinTekiyou, codeShou, codeBu, codeAlpha, codeKubun, validFrom, validUpto) {
        super(conductShinryouId, conductId, shinryoucode);
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
exports.FullConductShinryou = FullConductShinryou;
function validateFullConductShinryou(shinryou) {
    let errs = conduct_shinryou_1.validateConductShinryou(shinryou);
    if (errs.length > 0) {
        return errs;
    }
    errs = errs.concat(shinryou_master_1.validateShinryouMaster(shinryou));
    return errs;
}
exports.validateFullConductShinryou = validateFullConductShinryou;
function fromJsonToFullConductShinryou(src) {
    let shinryou = new FullConductShinryou(src.id, src.visit_conduct_id, src.shinryoucode, src.name, +src.tensuu, +src.tensuu_shikibetsu, src.houkatsukensa, +src.oushinkubun, src.kensagroup, +src.roujintekiyou, +src.code_shou, src.code_bu, src.code_alpha, src.code_kubun, src.valid_from, src.valid_upto);
    let errs = validateFullConductShinryou(shinryou);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [shinryou, null];
    }
}
exports.fromJsonToFullConductShinryou = fromJsonToFullConductShinryou;
