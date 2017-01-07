"use strict";
const conduct_shinryou_1 = require("./conduct-shinryou");
const shinryou_master_1 = require("./shinryou-master");
class FullConductShinryou extends conduct_shinryou_1.ConductShinryou {
}
exports.FullConductShinryou = FullConductShinryou;
function jsonToFullConductShinryou(src) {
    let shinryou = new FullConductShinryou();
    conduct_shinryou_1.fillConductShinryouFromJson(shinryou, src);
    shinryou_master_1.fillShinryouMasterFromJson(shinryou, src);
    return shinryou;
}
exports.jsonToFullConductShinryou = jsonToFullConductShinryou;
/*
export function validateFullConductShinryou(shinryou: FullConductShinryou): string[] {
    let errs: string[] = validateConductShinryou(shinryou);
    if( errs.length > 0 ){
        return errs;
    }
    errs = errs.concat(validateShinryouMaster(shinryou));
    return errs;
}

export function fromJsonToFullConductShinryou(src: any): FullConductShinryou | V.ValidationError {
    let shinryou = new FullConductShinryou(src.id, src.visit_conduct_id, src.shinryoucode,
        src.name, +src.tensuu,
        +src.tensuu_shikibetsu, src.houkatsukensa, +src.oushinkubun,
        src.kensagroup, +src.roujintekiyou, +src.code_shou,
        src.code_bu, src.code_alpha, src.code_kubun, src.valid_from, src.valid_upto);
    let errs = validateFullConductShinryou(shinryou);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return shinryou;
    }
}
*/
