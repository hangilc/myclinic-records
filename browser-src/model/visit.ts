import { Value, NumberValue, StringValue, ensureString,
	ensureNumber, ensurePositiveInteger } from "../value";

export class Visit {
	public visitId: number;
	public patientId: number;
	public visitedAt: string;
	public shahokokuhoId: number;
	public koukikoureiId: number;
	public roujinId: number;
	public kouhi1Id: number;
	public kouhi2Id: number;
	public kouhi3Id: number;
}

export class VisitValues {
	public visitId: NumberValue;
	public patientId: NumberValue;
	public visitedAt: StringValue;
	public shahokokuhoId: NumberValue;
	public koukikoureiId: NumberValue;
	public roujinId: NumberValue;
	public kouhi1Id: NumberValue;
	public kouhi2Id: NumberValue;
	public kouhi3Id: NumberValue;
}

function hasError(values: VisitValues): boolean {
	return values.visitId.isError || values.patientId.isError ||
		values.visitedAt.isError || values.shahokokuhoId.isError ||
		values.koukikoureiId.isError || values.roujinId.isError ||
		values.kouhi1Id.isError || values.kouhi2Id.isError ||
		values.kouhi3Id.isError;
}

export function validateVisit(visit: Visit): null | VisitValues {
	let v = new VisitValues();
	v.visitId = ensurePositiveInteger(visit.visitId);
	v.patientId = ensurePositiveInteger(visit.patientId);
	v.visitedAt = ensureString(visit.visitedAt)
		.isSqlDateTime().isValidDateTime();
	v.shahokokuhoId = ensureNumber(visit.shahokokuhoId)
		.isInteger().isZeroOrPositive();
	v.koukikoureiId = ensureNumber(visit.koukikoureiId)
		.isInteger().isZeroOrPositive();
	v.roujinId = ensureNumber(visit.roujinId)
		.isInteger().isZeroOrPositive();
	v.kouhi1Id = ensureNumber(visit.kouhi1Id)
		.isInteger().isZeroOrPositive();
	v.kouhi2Id = ensureNumber(visit.kouhi2Id)
		.isInteger().isZeroOrPositive();
	v.kouhi3Id = ensureNumber(visit.kouhi3Id)
		.isInteger().isZeroOrPositive();
	return hasError(v) ? v : null;
}

export function jsonToVisit(src: any): Visit {
	let visit = new Visit();
	visit.visitId = src.visit_id;
	visit.patientId = src.patient_id;
	visit.visitedAt = src.v_datetime;
	visit.shahokokuhoId = src.shahokokuho_id;
	visit.koukikoureiId = src.koukikourei_id;
	visit.roujinId = src.roujin_id;
	visit.kouhi1Id = src.kouhi_1_id;
	visit.kouhi2Id = src.kouhi_2_id;
	visit.kouhi3Id = src.kouhi_3_id;
	return visit;
}

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

