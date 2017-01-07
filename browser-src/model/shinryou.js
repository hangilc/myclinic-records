"use strict";
class Shinryou {
}
exports.Shinryou = Shinryou;
function fillShinryouFromJson(shinryou, src) {
    shinryou.shinryouId = src.shinryou_id;
    shinryou.visitId = src.visit_id;
    shinryou.shinryoucode = src.shinryoucode;
}
exports.fillShinryouFromJson = fillShinryouFromJson;
function jsonToShinryou(src) {
    let shinryou = new Shinryou();
    fillShinryouFromJson(shinryou, src);
    return shinryou;
}
exports.jsonToShinryou = jsonToShinryou;
/**
export function validateShinryou(shinryou: Shinryou,
    checkShinryouId: boolean = true): string[] {
    let errs: string[] = [];
    if( checkShinryouId ){
        V.validate("shinryouId", shinryou.shinryouId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("visitId", shinryou.visitId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("診療コード", shinryou.shinryoucode, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    return errs;
}

export function fromJsonToShinryou(src: any): Shinryou | V.ValidationError {
    let shinryou = new Shinryou(src.shinryou_id, src.visit_id, src.shinryoucode);
    let errs = validateShinryou(shinryou, true);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return shinryou;
    }
}
**/ 
