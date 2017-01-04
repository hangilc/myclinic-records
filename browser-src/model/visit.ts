import { Validator, ValidationError } from "../validator";

export class Visit {
	constructor(
		readonly visitId: number,
		readonly patientId: number,
		readonly visitedAt: string,
		readonly shahokokuhoId: number,
		readonly koukikoureiId: number,
		readonly roujinId: number,
		readonly kouhi1Id: number,
		readonly kouhi2Id: number,
		readonly kouhi3Id: number
	){}
}

function convertToVisit(src: any): 
	Visit | ValidationError {
	let visitId: number;
	let patientId: number;
	let visitedAt: string;
	let shahokokuhoId: number;
	let koukikoureiId: number;
	let roujinId: number;
	let kouhi1Id: number;
	let kouhi2Id: number;
	let kouhi3Id: number;
	let err = {};
	{
		let cvt = new Validator(src.visit_id)
			.isDefined()
			.ensureNumber()
			.isInteger()
			.isPositive()
		if( cvt.hasError ){
			err["visitId"] = cvt.getError();
			visitId = 0;
		} else {
			visitId = cvt.getValue();
		}
	}
	{
		let cvt = new Validator(src.patient_id)
			.isDefined()
			.ensureNumber()
			.isInteger()
			.isPositive()
		if( cvt.hasError ){
			err["患者番号"] = cvt.getError();
			patientId = 0;
		} else {
			patientId = cvt.getValue();
		}
	}
	{
		let cvt = new Validator(src.v_datetime)
			.ensureString()
			.isSqlDateTime()
			.isValidDate()
		if( cvt.hasError ){
			err["診察時刻"]　= cvt.getError();
			visitedAt = "";
		} else {
			visitedAt = cvt.getValue();
		}
	}
	{
		let cvt = new Validator(src.shahokokuho_id)
			.ensureNumber()
			.isInteger()
			.isZeroPositive()
		if( cvt.hasError ){
			err["社保・国保番号"] = cvt.getError();
			shahokokuhoId = 0;
		} else {
			shahokokuhoId = cvt.getValue();
		}
	}
	if( Object.keys(err).length > 0 ){
		return new ValidationError(err);
	}
	return new Visit(visitId, patientId, visitedAt, shahokokuhoId,
		koukikoureiId, roujinId, kouhi1Id, kouhi2Id, kouhi3Id);
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

