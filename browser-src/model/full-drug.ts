import * as V from "../validation";
import { Drug, validateDrug } from "./drug";
import { validateIyakuhinMaster } from "./iyakuhin-master";

export class FullDrug extends Drug {
	constructor(
		drugId: number,
		visitId: number,
		iyakuhincode: number,
		amount: string,
		usage: string,
		days: number,
		category: number,
		prescribed: boolean,
		readonly name: string,
		readonly yomi: string,
		readonly unit: string,
		readonly yakka: number,
		readonly madoku: number,
		readonly kouhatsu: boolean,
		readonly zaikei: number,
		readonly validFrom: string,
		readonly validUpto: string
	){
		super(drugId, visitId, iyakuhincode, amount, usage, days, 
			category, prescribed)
	}
}

export function validateFullDrug(drug: FullDrug): string[] {
	let errs: string[] = validateDrug(drug);
	if( errs.length > 0 ){
		return errs;
	}
	errs = errs.concat(validateIyakuhinMaster(drug));
	return errs;
}

export function fromJsonToFullDrug(src: any): FullDrug | V.ValidationError {
	let drug = new FullDrug(src.drug_id, src.visit_id, src.d_iyakuhincode,
		src.d_amount, src.d_usage, src.d_days, src.d_category, 
		src.d_prescribed === 0 ? false : true,
		src.name, src.yomi, src.unit,
		+src.yakka, +src.madoku, src.kouhatsu === 0 ? false : true,
		+src.zaikei, src.valid_from, src.valid_upto);
	let errs = validateFullDrug(drug);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return drug;
	}
}


