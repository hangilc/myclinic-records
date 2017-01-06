import { Value, NumberValue, StringValue, BooleanValue, ensureString,
	ensureNumber, ensurePositiveInteger } from "../value";

export class ConductShinryou {
	conductShinryouId: number;
	conductId: number;
	shinryoucode: number;
}

export function jsonToConductShinryou(src: any): ConductShinryou {
	let shinryou = new ConductShinryou();
	shinryou.conductShinryouId = src.id;
	shinryou.conductId = src.visit_conduct_id;
	shinryou.shinryoucode = src.shinryoucode;
	return shinryou;
}

/*
export function validateConductShinryou(conductShinryou: ConductShinryou,
		checkConductShinryouId: boolean = true): string[] {
	let errs: string[] = [];
	if( checkConductShinryouId ){
		V.validate("conductShinryouId", conductShinryou.conductShinryouId, errs, [
			V.isDefined, V.isInteger, V.isPositive
		]);
	}
	V.validate("conductId", conductShinryou.conductId, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("診療コード", conductShinryou.shinryoucode, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	return errs;
}

export function fromJsonToConductShinryou(src: any): ConductShinryou | V.ValidationError {
	let conductShinryou = new ConductShinryou(src.id, src.visit_conduct_id, 
			src.shinryoucode);
	let errs = validateConductShinryou(conductShinryou, true);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return conductShinryou;
	}
}
*/
