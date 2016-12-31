"use strict";
const V = require("../validation");
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
function validateVisit(visit, checkVisitId = true) {
    let errs = [];
    if (checkVisitId) {
        V.validate("visitId", visit.visitId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("患者番号", visit.patientId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("診察時刻", visit.visitedAt, errs, [V.isSqlDateTime]);
    V.validate("shahokokuhoId", visit.shahokokuhoId, errs, [V.isInteger, V.isZeroOrPositive]);
    V.validate("koukikoureiId", visit.koukikoureiId, errs, [V.isInteger, V.isZeroOrPositive]);
    V.validate("roujinId", visit.roujinId, errs, [V.isInteger, V.isZeroOrPositive]);
    V.validate("kouhi1Id", visit.kouhi1Id, errs, [V.isInteger, V.isZeroOrPositive]);
    V.validate("kouhi2Id", visit.kouhi2Id, errs, [V.isInteger, V.isZeroOrPositive]);
    V.validate("kouhi3Id", visit.kouhi3Id, errs, [V.isInteger, V.isZeroOrPositive]);
    return errs;
}
exports.validateVisit = validateVisit;
function fromJsonToVisit(src) {
    let visit = new Visit(src.visit_id, src.patient_id, src.v_datetime, src.shahokokuho_id, src.koukikourei_id, src.roujin_id, src.kouhi_1_id, src.kouhi_2_id, src.kouhi_3_id);
    let errs = validateVisit(visit, true);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [visit, null];
    }
}
exports.fromJsonToVisit = fromJsonToVisit;
