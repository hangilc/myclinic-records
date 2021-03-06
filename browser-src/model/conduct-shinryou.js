"use strict";
class ConductShinryou {
}
exports.ConductShinryou = ConductShinryou;
function fillConductShinryouFromJson(shinryou, src) {
    shinryou.conductShinryouId = src.id;
    shinryou.conductId = src.visit_conduct_id;
    shinryou.shinryoucode = src.shinryoucode;
}
exports.fillConductShinryouFromJson = fillConductShinryouFromJson;
function jsonToConductShinryou(src) {
    let shinryou = new ConductShinryou();
    fillConductShinryouFromJson(shinryou, src);
    return shinryou;
}
exports.jsonToConductShinryou = jsonToConductShinryou;
/*
export function validateConductShinryou(conductShinryou: ConductShinryou,
        checkConductShinryouId: boolean = true): string[] {
    let errs: string[] = [];
    if( checkConductShinryouId ){
        V.validate("conductShinryouId", conductShinryou.conductShinryouId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("conductId", conductShinryou.conductId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("診療コード", conductShinryou.shinryoucode, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    return errs;
}

export function fromJsonToConductShinryou(src: any): ConductShinryou | V.ValidationError {
    let conductShinryou = new ConductShinryou(src.id, src.visit_conduct_id,
            src.shinryoucode);
    let errs = validateConductShinryou(conductShinryou, true);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return conductShinryou;
    }
}
*/
