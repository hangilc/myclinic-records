import * as V from "../validation";

export class ConductKizai {
	constructor(
		readonly conductKizaiId: number,
		readonly conductId: number,
		readonly kizaicode: number,
		readonly amount: number
	){}
}

export function validateConductKizai(conductKizai: ConductKizai,
		checkConductKizaiId: boolean = true): string[] {
	let errs: string[] = [];
	if( checkConductKizaiId ){
		V.validate("conductKizaiId", conductKizai.conductKizaiId, errs, [
			V.isDefined, V.isInteger, V.isPositive
		]);
	}
	V.validate("conductId", conductKizai.conductId, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("器材コード", conductKizai.kizaicode, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("用量", conductKizai.amount, errs, [
		V.isDefined, V.isNumber, V.isZeroOrPositive
	]);
	return errs;
}

export function fromJsonToConductKizai(src: any): ConductKizai | V.ValidationError {
	let conductKizai = new ConductKizai(src.id, src.visit_conduct_id, 
			src.kizaicode, src.amount);
	let errs = validateConductKizai(conductKizai, true);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return conductKizai;
	}
}
