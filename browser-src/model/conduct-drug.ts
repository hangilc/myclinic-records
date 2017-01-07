import { Value, NumberValue, StringValue, BooleanValue, ensureString,
	ensureNumber, ensurePositiveInteger } from "../value";

export class ConductDrug {
	conductDrugId: number;
	conductId: number;
	iyakuhincode: number;
	amount: number;
}

export function fillConductDrugFromJson(drug: ConductDrug, src: any): void {
	drug.conductDrugId = src.id;
	drug.conductId = src.visit_conduct_id;
	drug.iyakuhincode = src.iyakuhincode;
	drug.amount = src.amount;
}

export function jsonToConductDrug(src: any): ConductDrug {
	let drug = new ConductDrug();
	fillConductDrugFromJson(drug, src);
	return drug;
}

/**
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
**/
