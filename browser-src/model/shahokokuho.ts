import * as V from "../validation";

export class Shahokokuho {
	constructor(
		readonly shahokokuhoId: number,
		readonly patientId: number,
		readonly hokenshaBangou: number,
		readonly hihokenshaKigou: string,
		readonly hihokenshaBangou: string,
		readonly honnin: boolean,
		readonly validFrom: string,
		readonly validUpto: string,
		readonly kourei: number
	){}
}

export function validateShahokokuho(shahokokuho: Shahokokuho,
	checkShahokokuhoId: boolean = true): string[] {
	let errs: string[] = [];
	if( checkShahokokuhoId ){
		V.validate("shahokokuhoId", shahokokuho.shahokokuhoId, errs, [
			V.isDefined, V.isInteger, V.isPositive
		]);
	}
	V.validate("患者番号", shahokokuho.patientId, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("保険者番号", shahokokuho.hokenshaBangou, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("被保険者記号", shahokokuho.hihokenshaKigou, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("被保険者番号", shahokokuho.hihokenshaBangou, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("本人", shahokokuho.honnin, errs, [
		V.isDefined, V.isBoolean
	]);
	V.validate("有効期限（開始）", shahokokuho.validFrom, errs, [
		V.isDefined, V.isSqlDate
	]);
	V.validate("有効期限（終了）", shahokokuho.validFrom, errs, [
		V.isDefined, V.isSqlDateOrZero
	]);
	V.validate("高齢", shahokokuho.kourei, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	return errs;
}

export function fromJsonToShahokokuho(src: any): [Shahokokuho, V.ValidationError] {
	let shahokokuho = new Shahokokuho(src.shahokokuho_id, src.patient_id, 
		src.hokensha_bangou, src.hihokensha_kigou, src.hihokensha_bangou, 
		src.honnin === 0 ? false : true, src.valid_from, 
		src.valid_upto, src.kourei);
	let errs = validateShahokokuho(shahokokuho, true);
	if( errs.length > 0 ){
		return [undefined, new V.ValidationError(errs)];
	} else {
		return [shahokokuho, null];
	}
}
