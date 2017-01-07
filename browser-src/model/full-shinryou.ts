import { Shinryou, fillShinryouFromJson } from "./shinryou";
import { fillShinryouMasterFromJson } from "./shinryou-master";

export class FullShinryou extends Shinryou {
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

export function jsonToFullShinryou(src: any): FullShinryou {
	let shinryou = new FullShinryou();
	fillShinryouFromJson(shinryou, src);
	fillShinryouMasterFromJson(shinryou, src);
	return shinryou;
}

/**
export function validateFullShinryou(shinryou: FullShinryou): string[] {
	let errs: string[] = validateShinryou(shinryou);
	if( errs.length > 0 ){
		return errs;
	}
	errs = errs.concat(validateShinryouMaster(shinryou));
	return errs;
}

export function fromJsonToFullShinryou(src: any): FullShinryou | V.ValidationError {
	let shinryou = new FullShinryou(src.shinryou_id, src.visit_id, src.shinryoucode,
		src.name, +src.tensuu,
		+src.tensuu_shikibetsu, src.houkatsukensa, +src.oushinkubun, 
		src.kensagroup, +src.roujintekiyou, +src.code_shou, 
		src.code_bu, src.code_alpha, src.code_kubun, src.valid_from, src.valid_upto);
	let errs = validateFullShinryou(shinryou);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return shinryou;
	}
}

**/


