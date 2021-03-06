"use strict";
const value_1 = require("../value");
class Visit {
}
exports.Visit = Visit;
class VisitValues {
}
exports.VisitValues = VisitValues;
function hasError(values) {
    return values.visitId.isError || values.patientId.isError ||
        values.visitedAt.isError || values.shahokokuhoId.isError ||
        values.koukikoureiId.isError || values.roujinId.isError ||
        values.kouhi1Id.isError || values.kouhi2Id.isError ||
        values.kouhi3Id.isError;
}
function validateVisit(visit) {
    let v = new VisitValues();
    v.visitId = value_1.ensurePositiveInteger(visit.visitId);
    v.patientId = value_1.ensurePositiveInteger(visit.patientId);
    v.visitedAt = value_1.ensureString(visit.visitedAt)
        .isSqlDateTime().isValidDateTime();
    v.shahokokuhoId = value_1.ensureNumber(visit.shahokokuhoId)
        .isInteger().isZeroOrPositive();
    v.koukikoureiId = value_1.ensureNumber(visit.koukikoureiId)
        .isInteger().isZeroOrPositive();
    v.roujinId = value_1.ensureNumber(visit.roujinId)
        .isInteger().isZeroOrPositive();
    v.kouhi1Id = value_1.ensureNumber(visit.kouhi1Id)
        .isInteger().isZeroOrPositive();
    v.kouhi2Id = value_1.ensureNumber(visit.kouhi2Id)
        .isInteger().isZeroOrPositive();
    v.kouhi3Id = value_1.ensureNumber(visit.kouhi3Id)
        .isInteger().isZeroOrPositive();
    return hasError(v) ? v : null;
}
exports.validateVisit = validateVisit;
function fillVisitFromJson(visit, src) {
    visit.visitId = src.visit_id;
    visit.patientId = src.patient_id;
    visit.visitedAt = src.v_datetime;
    visit.shahokokuhoId = src.shahokokuho_id;
    visit.koukikoureiId = src.koukikourei_id;
    visit.roujinId = src.roujin_id;
    visit.kouhi1Id = src.kouhi_1_id;
    visit.kouhi2Id = src.kouhi_2_id;
    visit.kouhi3Id = src.kouhi_3_id;
}
exports.fillVisitFromJson = fillVisitFromJson;
function jsonToVisit(src) {
    let visit = new Visit();
    fillVisitFromJson(visit, src);
    return visit;
}
exports.jsonToVisit = jsonToVisit;
// function convertToVisit(src: any): 
// 	Visit | ValidationError {
// 	let visitId: number;
// 	let patientId: number;
// 	let visitedAt: string;
// 	let shahokokuhoId: number;
// 	let koukikoureiId: number;
// 	let roujinId: number;
// 	let kouhi1Id: number;
// 	let kouhi2Id: number;
// 	let kouhi3Id: number;
// 	let err = {};
// 	{
// 		let cvt = new Validator(src.visit_id)
// 			.isDefined()
// 			.ensureNumber()
// 			.isInteger()
// 			.isPositive()
// 		if( cvt.hasError ){
// 			err["visitId"] = cvt.getError();
// 			visitId = 0;
// 		} else {
// 			visitId = cvt.getValue();
// 		}
// 	}
// 	{
// 		let cvt = new Validator(src.patient_id)
// 			.isDefined()
// 			.ensureNumber()
// 			.isInteger()
// 			.isPositive()
// 		if( cvt.hasError ){
// 			err["患者番号"] = cvt.getError();
// 			patientId = 0;
// 		} else {
// 			patientId = cvt.getValue();
// 		}
// 	}
// 	{
// 		let cvt = new Validator(src.v_datetime)
// 			.ensureString()
// 			.isSqlDateTime()
// 			.isValidDate()
// 		if( cvt.hasError ){
// 			err["診察時刻"]　= cvt.getError();
// 			visitedAt = "";
// 		} else {
// 			visitedAt = cvt.getValue();
// 		}
// 	}
// 	{
// 		let cvt = new Validator(src.shahokokuho_id)
// 			.ensureNumber()
// 			.isInteger()
// 			.isZeroPositive()
// 		if( cvt.hasError ){
// 			err["社保・国保番号"] = cvt.getError();
// 			shahokokuhoId = 0;
// 		} else {
// 			shahokokuhoId = cvt.getValue();
// 		}
// 	}
// 	if( Object.keys(err).length > 0 ){
// 		return new ValidationError(err);
// 	}
// 	return new Visit(visitId, patientId, visitedAt, shahokokuhoId,
// 		koukikoureiId, roujinId, kouhi1Id, kouhi2Id, kouhi3Id);
// }
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
