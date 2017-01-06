import { Value, NumberValue, StringValue, BooleanValue, ensureString,
	ensureNumber, ensurePositiveInteger } from "../value";

export class Shahokokuho {
	public shahokokuhoId: number;
	public patientId: number;
	public hokenshaBangou: number;
	public hihokenshaKigou: string;
	public hihokenshaBangou: string;
	public honnin: boolean;
	public validFrom: string;
	public validUpto: string;
	public kourei: number;
}

export class ShahokokuhoValues {
	public shahokokuhoId: NumberValue;
	public patientId: NumberValue;
	public hokenshaBangou: NumberValue;
	public hihokenshaKigou: StringValue;
	public hihokenshaBangou: StringValue;
	public honnin: BooleanValue;
	public validFrom: StringValue;
	public validUpto: StringValue;
	public kourei: NumberValue;
}

export function jsonToShahokokuho(src: any): Shahokokuho {
	let shaho = new Shahokokuho();
	shaho.shahokokuhoId = src.shahokokuho_id;
	shaho.patientId = src.patient_id;
	shaho.hokenshaBangou = src.hokensha_bangou;
	shaho.hihokenshaKigou = src.hihokensha_kigou;
	shaho.hihokenshaBangou = src.hihokensha_bangou;
	shaho.honnin = src.honnin === 0 ? false: true;
	shaho.validFrom = src.valid_from;
	shaho.validUpto = src.valid_upto;
	shaho.kourei = src.kourei;
	return shaho;
}

// export function validateShahokokuho(shahokokuho: Shahokokuho,
// 	checkShahokokuhoId: boolean = true): string[] {
// 	let errs: string[] = [];
// 	if( checkShahokokuhoId ){
// 		V.validate("shahokokuhoId", shahokokuho.shahokokuhoId, errs, [
// 			V.isDefined, V.isInteger, V.isPositive
// 		]);
// 	}
// 	V.validate("患者番号", shahokokuho.patientId, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("保険者番号", shahokokuho.hokenshaBangou, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("被保険者記号", shahokokuho.hihokenshaKigou, errs, [
// 		V.isDefined, V.isString, V.isNotEmpty
// 	]);
// 	V.validate("被保険者番号", shahokokuho.hihokenshaBangou, errs, [
// 		V.isDefined, V.isString, V.isNotEmpty
// 	]);
// 	V.validate("本人", shahokokuho.honnin, errs, [
// 		V.isDefined, V.isBoolean
// 	]);
// 	V.validate("有効期限（開始）", shahokokuho.validFrom, errs, [
// 		V.isDefined, V.isSqlDate
// 	]);
// 	V.validate("有効期限（終了）", shahokokuho.validFrom, errs, [
// 		V.isDefined, V.isSqlDateOrZero
// 	]);
// 	V.validate("高齢", shahokokuho.kourei, errs, [
// 		V.isDefined, V.isInteger, V.isZeroOrPositive
// 	]);
// 	return errs;
// }

// export function fromJsonToShahokokuho(src: any): Shahokokuho | V.ValidationError {
// 	let shahokokuho = new Shahokokuho(src.shahokokuho_id, src.patient_id, 
// 		src.hokensha_bangou, src.hihokensha_kigou, src.hihokensha_bangou, 
// 		src.honnin === 0 ? false : true, src.valid_from, 
// 		src.valid_upto, src.kourei);
// 	let errs = validateShahokokuho(shahokokuho, true);
// 	if( errs.length > 0 ){
// 		return new V.ValidationError(errs);
// 	} else {
// 		return shahokokuho;
// 	}
// }
