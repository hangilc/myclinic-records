import { ConductShinryou, fillConductShinryouFromJson } from "./conduct-shinryou";
import { fillShinryouMasterFromJson } from "./shinryou-master";

export class FullConductShinryou extends ConductShinryou {
	name: string;
	tensuu: number;
	tensuuShikibetsu: number;
	houketsuKensa: string;
	oushinKubun: number;
	kensaGroup: string;
	roujinTekiyou: number;
	codeShou: number;
	codeBu: string;
	codeAlpha: string;
	codeKubun: string;
	validFrom: string;
	validUpto: string;
}

export function jsonToFullConductShinryou(src: any): FullConductShinryou {
	let shinryou = new FullConductShinryou();
	fillConductShinryouFromJson(shinryou, src);
	fillShinryouMasterFromJson(shinryou, src);
	return shinryou;
}

/*
export function validateFullConductShinryou(shinryou: FullConductShinryou): string[] {
	let errs: string[] = validateConductShinryou(shinryou);
	if( errs.length > 0 ){
		return errs;
	}
	errs = errs.concat(validateShinryouMaster(shinryou));
	return errs;
}

export function fromJsonToFullConductShinryou(src: any): FullConductShinryou | V.ValidationError {
	let shinryou = new FullConductShinryou(src.id, src.visit_conduct_id, src.shinryoucode,
		src.name, +src.tensuu,
		+src.tensuu_shikibetsu, src.houkatsukensa, +src.oushinkubun, 
		src.kensagroup, +src.roujintekiyou, +src.code_shou, 
		src.code_bu, src.code_alpha, src.code_kubun, src.valid_from, src.valid_upto);
	let errs = validateFullConductShinryou(shinryou);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return shinryou;
	}
}
*/


