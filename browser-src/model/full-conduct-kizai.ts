import { ConductKizai, fillConductKizaiFromJson } from "./conduct-kizai";
import { fillKizaiMasterFromJson } from "./kizai-master";

export class FullConductKizai extends ConductKizai {
	name: string;
	yomi: string;
	unit: string;
	kingaku: number;
	validFrom: string;
	validUpto: string;
}

export function jsonToFullConductKizai(src: any): FullConductKizai {
	let kizai = new FullConductKizai();
	fillConductKizaiFromJson(kizai, src);
	fillKizaiMasterFromJson(kizai, src);
	return kizai;
}

/*
export function validateFullConductKizai(kizai: FullConductKizai): string[] {
	let errs: string[] = validateConductKizai(kizai);
	if( errs.length > 0 ){
		return errs;
	}
	errs = errs.concat(validateKizaiMaster(kizai));
	return errs;
}

export function fromJsonToFullConductKizai(src: any): FullConductKizai | V.ValidationError {
	let kizai = new FullConductKizai(src.id, src.visit_conduct_id, 
			src.kizaicode, src.amount,src.name, src.yomi, src.unit,
		+src.kingaku, src.valid_from, src.valid_upto);
	let errs = validateFullConductKizai(kizai);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return kizai;
	}
}
*/


