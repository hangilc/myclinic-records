"use strict";
const shinryou_1 = require("./shinryou");
const shinryou_master_1 = require("./shinryou-master");
class FullShinryou extends shinryou_1.Shinryou {
}
exports.FullShinryou = FullShinryou;
function jsonToFullShinryou(src) {
    let shinryou = new FullShinryou();
    shinryou_1.fillShinryouFromJson(shinryou, src);
    shinryou_master_1.fillShinryouMasterFromJson(shinryou, src);
    return shinryou;
}
exports.jsonToFullShinryou = jsonToFullShinryou;
/**
export function validateFullShinryou(shinryou: FullShinryou): string[] {
    let errs: string[] = validateShinryou(shinryou);
    if( errs.length > 0 ){
        return errs;
    }
    errs = errs.concat(validateShinryouMaster(shinryou));
    return errs;
}

export function fromJsonToFullShinryou(src: any): FullShinryou | V.ValidationError {
    let shinryou = new FullShinryou(src.shinryou_id, src.visit_id, src.shinryoucode,
        src.name, +src.tensuu,
        +src.tensuu_shikibetsu, src.houkatsukensa, +src.oushinkubun,
        src.kensagroup, +src.roujintekiyou, +src.code_shou,
        src.code_bu, src.code_alpha, src.code_kubun, src.valid_from, src.valid_upto);
    let errs = validateFullShinryou(shinryou);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return shinryou;
    }
}

**/
