"use strict";
class Conduct {
}
exports.Conduct = Conduct;
function jsonToConduct(src) {
    let conduct = new Conduct();
    conduct.conductId = src.id;
    conduct.visitId = src.visit_id;
    conduct.kind = src.kind;
    return conduct;
}
exports.jsonToConduct = jsonToConduct;
/**
export function validateConduct(conduct: Conduct,
    checkConductId: boolean = true): string[] {
    let errs: string[] = [];
    if( checkConductId ){
        V.validate("conductId", conduct.conductId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("visitId", conduct.visitId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("種類", conduct.kind, errs, [
        V.isDefined, V.isInteger, V.isZeroOrPositive
    ]);
    return errs;
}

export function fromJsonToConduct(src: any): Conduct | V.ValidationError {
    let conduct = new Conduct(src.id, src.visit_id, src.kind);
    let errs = validateConduct(conduct, true);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return conduct;
    }
}
**/ 
