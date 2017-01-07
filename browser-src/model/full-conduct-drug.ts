import { ConductDrug, fillConductDrugFromJson } from "./conduct-drug";
import { IyakuhinMaster, fillIyakuhinMasterFromJson } from "./iyakuhin-master";

export class FullConductDrug extends ConductDrug {
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

export function jsonToFullConductDrug(src: any): FullConductDrug {
	let drug = new FullConductDrug();
	fillConductDrugFromJson(drug, src);
	fillIyakuhinMasterFromJson(drug, src);
	return drug;
}

/*
export function validateFullConductDrug(drug: FullConductDrug): string[] {
	let errs: string[] = validateConductDrug(drug);
	if( errs.length > 0 ){
		return errs;
	}
	errs = errs.concat(validateIyakuhinMaster(drug));
	return errs;
}

export function fromJsonToFullConductDrug(src: any): FullConductDrug | V.ValidationError {
	let drug = new FullConductDrug(src.id, src.visit_conduct_id, 
		src.iyakuhincode, src.amount,
		src.name, src.yomi, src.unit,
		+src.yakka, +src.madoku, src.kouhatsu === 0 ? false : true,
		+src.zaikei, src.valid_from, src.valid_upto);
	let errs = validateFullConductDrug(drug);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return drug;
	}
}
*/


