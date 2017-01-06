import { Value, NumberValue, StringValue, BooleanValue, ensureString,
	ensureNumber, ensurePositiveInteger } from "../value";

export class Shinryou {
	shinryouId: number;
	visitId: number;
	shinryoucode: number;
}

export function jsonToShinryou(src: any): Shinryou {
	let shinryou = new Shinryou();
	shinryou.shinryouId = src.shinryou_id;
	shinryou.visitId = src.visit_id;
	shinryou.shinryoucode = src.shinryoucode;
	return shinryou;
}

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