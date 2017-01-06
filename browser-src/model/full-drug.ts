import { Drug, fillDrugFromJson } from "./drug";
import { fillIyakuhinMasterFromJson } from "./iyakuhin-master";

export class FullDrug extends Drug {
	name: string;
	yomi: string;
	unit: string;
	yakka: number;
	madoku: number;
	kouhatsu: boolean;
	zaikei: number;
	validFrom: string;
	validUpto: string;
}

export function jsonToFullDrug(src: any): FullDrug {
	let drug = new FullDrug();
	fillDrugFromJson(drug, src);
	fillIyakuhinMasterFromJson(drug, src);
	return drug;
}

/**
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
**/


