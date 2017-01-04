"use strict";
const validator_1 = require("../validator");
class Visit {
    constructor(visitId, patientId, visitedAt, shahokokuhoId, koukikoureiId, roujinId, kouhi1Id, kouhi2Id, kouhi3Id) {
        this.visitId = visitId;
        this.patientId = patientId;
        this.visitedAt = visitedAt;
        this.shahokokuhoId = shahokokuhoId;
        this.koukikoureiId = koukikoureiId;
        this.roujinId = roujinId;
        this.kouhi1Id = kouhi1Id;
        this.kouhi2Id = kouhi2Id;
        this.kouhi3Id = kouhi3Id;
    }
}
exports.Visit = Visit;
function convertToVisit(src) {
    let visitId;
    let patientId;
    let visitedAt;
    let shahokokuhoId;
    let koukikoureiId;
    let roujinId;
    let kouhi1Id;
    let kouhi2Id;
    let kouhi3Id;
    let err = {};
    {
        let cvt = new validator_1.Validator(src.visit_id)
            .isDefined()
            .ensureNumber()
            .isInteger()
            .isPositive();
        if (cvt.hasError) {
            err["visitId"] = cvt.getError();
            visitId = 0;
        }
        else {
            visitId = cvt.getValue();
        }
    }
    {
        let cvt = new validator_1.Validator(src.patient_id)
            .isDefined()
            .ensureNumber()
            .isInteger()
            .isPositive();
        if (cvt.hasError) {
            err["患者番号"] = cvt.getError();
            patientId = 0;
        }
        else {
            patientId = cvt.getValue();
        }
    }
    {
        let cvt = new validator_1.Validator(src.v_datetime)
            .ensureString()
            .isSqlDateTime()
            .isValidDate();
        if (cvt.hasError) {
            err["診察時刻"] = cvt.getError();
            visitedAt = "";
        }
        else {
            visitedAt = cvt.getValue();
        }
    }
    {
        let cvt = new validator_1.Validator(src.shahokokuho_id)
            .ensureNumber()
            .isInteger()
            .isZeroPositive();
        if (cvt.hasError) {
            err["社保・国保番号"] = cvt.getError();
            shahokokuhoId = 0;
        }
        else {
            shahokokuhoId = cvt.getValue();
        }
    }
    if (Object.keys(err).length > 0) {
        return new validator_1.ValidationError(err);
    }
    return new Visit(visitId, patientId, visitedAt, shahokokuhoId, koukikoureiId, roujinId, kouhi1Id, kouhi2Id, kouhi3Id);
}
/*
export function validateVisit(visit: Visit,
    checkVisitId: boolean = true): string[] {
    let errs: string[] = [];
    if( checkVisitId ){
        V.validate("visitId", visit.visitId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("患者番号", visit.patientId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("診察時刻", visit.visitedAt, errs, [V.isSqlDateTime]);
    V.validate("shahokokuhoId", visit.shahokokuhoId, errs,
        [V.isInteger, V.isZeroOrPositive]);
    V.validate("koukikoureiId", visit.koukikoureiId, errs,
        [V.isInteger, V.isZeroOrPositive]);
    V.validate("roujinId", visit.roujinId, errs,
        [V.isInteger, V.isZeroOrPositive]);
    V.validate("kouhi1Id", visit.kouhi1Id, errs,
        [V.isInteger, V.isZeroOrPositive]);
    V.validate("kouhi2Id", visit.kouhi2Id, errs,
        [V.isInteger, V.isZeroOrPositive]);
    V.validate("kouhi3Id", visit.kouhi3Id, errs,
        [V.isInteger, V.isZeroOrPositive]);
    return errs;
}

export function fromJsonToVisit(src: any): Visit | V.ValidationError {
    let visit = new Visit(src.visit_id, src.patient_id, src.v_datetime,
        src.shahokokuho_id, src.koukikourei_id, src.roujin_id,
        src.kouhi_1_id, src.kouhi_2_id, src.kouhi_3_id);
    let errs = validateVisit(visit, true);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return visit;
    }
}
*/
