"use strict";
const conduct_kizai_1 = require("./conduct-kizai");
const kizai_master_1 = require("./kizai-master");
class FullConductKizai extends conduct_kizai_1.ConductKizai {
}
exports.FullConductKizai = FullConductKizai;
function jsonToFullConductKizai(src) {
    let kizai = new FullConductKizai();
    conduct_kizai_1.fillConductKizaiFromJson(kizai, src);
    kizai_master_1.fillKizaiMasterFromJson(kizai, src);
    return kizai;
}
exports.jsonToFullConductKizai = jsonToFullConductKizai;
/*
export function validateFullConductKizai(kizai: FullConductKizai): string[] {
    let errs: string[] = validateConductKizai(kizai);
    if( errs.length > 0 ){
        return errs;
    }
    errs = errs.concat(validateKizaiMaster(kizai));
    return errs;
}

export function fromJsonToFullConductKizai(src: any): FullConductKizai | V.ValidationError {
    let kizai = new FullConductKizai(src.id, src.visit_conduct_id,
            src.kizaicode, src.amount,src.name, src.yomi, src.unit,
        +src.kingaku, src.valid_from, src.valid_upto);
    let errs = validateFullConductKizai(kizai);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return kizai;
    }
}
*/
