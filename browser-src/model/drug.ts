import { Value, NumberValue, StringValue, BooleanValue, ensureString,
	ensureNumber, ensurePositiveInteger } from "../value";

export class Drug {
	drugId: number;
	visitId: number;
	iyakuhincode: number;
	amount: string;
	usage: string;
	days: number;
	category: number;
	prescribed: boolean;
}

export function fillDrugFromJson(drug: Drug, src: any): void {
	drug.drugId = src.drug_id;
	drug.visitId = src.visit_id;
	drug.iyakuhincode = src.d_iyakuhincode;
	drug.amount = src.d_amount;
	drug.usage = src.d_usage;
	drug.days = src.d_days;
	drug.category = src.d_category;
	drug.prescribed = src.d_prescribed === 0 ? false : true;
}

export function jsonToDrug(src: any): Drug {
	let drug = new Drug();
	fillDrugFromJson(drug, src);
	return drug;
}

/**
export function validateDrug(drug: Drug,
	checkDrugId: boolean = true): string[] {
	let errs: string[] = [];
	if( checkDrugId ){
		V.validate("drugId", drug.drugId, errs, [
			V.isDefined, V.isInteger, V.isPositive
		]);
	}
	V.validate("visitId", drug.visitId, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("医薬品コード", drug.iyakuhincode, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("用量", drug.amount, errs, [
		V.isDefined, V.isString, V.isFloatCompatibleString
	]);
	V.validate("用法", drug.usage, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("日数", drug.days, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	V.validate("種類", drug.category, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	V.validate("処方済", drug.prescribed, errs, [
		V.isDefined, V.isBoolean
	]);
	return errs;
}

export function fromJsonToDrug(src: any): Drug | V.ValidationError {
	let drug = new Drug(src.drug_id, src.visit_id, src.d_iyakuhincode,
		src.d_amount, src.d_usage, src.d_days, src.d_category, 
		src.d_prescribed === 0 ? false : true);
	let errs = validateDrug(drug, true);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return drug;
	}
}
**/