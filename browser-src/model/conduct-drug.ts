import * as V from "../validation";

export class ConductDrug {
	constructor(
		readonly conductDrugId: number,
		readonly conductId: number,
		readonly iyakuhincode: number,
		readonly amount: number
	){}
}

export function validateConductDrug(conductDrug: ConductDrug,
		checkConductDrugId: boolean = true): string[] {
	let errs: string[] = [];
	if( checkConductDrugId ){
		V.validate("conductDrugId", conductDrug.conductDrugId, errs, [
			V.isDefined, V.isInteger, V.isPositive
		]);
	}
	V.validate("conductId", conductDrug.conductId, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("医薬品コード", conductDrug.iyakuhincode, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("用量", conductDrug.amount, errs, [
		V.isDefined, V.isNumber, V.isZeroOrPositive
	]);
	return errs;
}

export function fromJsonToConductDrug(src: any): ConductDrug | V.ValidationError {
	let conductDrug = new ConductDrug(src.id, src.visit_conduct_id, 
			src.iyakuhincode, src.amount);
	let errs = validateConductDrug(conductDrug, true);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return conductDrug;
	}
}
