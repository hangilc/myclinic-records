import * as V from "../validation";

export class ShinryouMaster {
	constructor(
		readonly shinryoucode: number,
		readonly name: string,
		readonly tensuu: number,
		readonly tensuuShikibetsu: number,
		readonly houketsuKensa: string,
		readonly oushinKubun: number,
		readonly kensaGroup: string,
		readonly roujinTekiyou: number,
		readonly codeShou: number,
		readonly codeBu: string,
		readonly codeAlpha: string,
		readonly codeKubun: string,
		readonly validFrom: string,
		readonly validUpto: string
	){}
}

export function validateShinryouMaster(shinryouMaster: ShinryouMaster): string[] {
	let errs: string[] = [];
	V.validate("診療コード", shinryouMaster.shinryoucode, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("名前", shinryouMaster.name, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("点数", shinryouMaster.tensuu, errs, [
		V.isDefined, V.isNumber, V.isZeroOrPositive
	]);
	V.validate("点数識別", shinryouMaster.tensuuShikibetsu, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	V.validate("包括検査", shinryouMaster.houketsuKensa, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("往診区分", shinryouMaster.oushinKubun, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	V.validate("検査グループ", shinryouMaster.kensaGroup, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("老人適用", shinryouMaster.roujinTekiyou, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	V.validate("コード章", shinryouMaster.codeShou, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	V.validate("コード部", shinryouMaster.codeBu, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("コードアルファ", shinryouMaster.codeAlpha, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("コード区分", shinryouMaster.codeKubun, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("有効期限（開始）", shinryouMaster.validFrom, errs, [
		V.isDefined, V.isSqlDate
	]);
	V.validate("有効期限（終了）", shinryouMaster.validFrom, errs, [
		V.isDefined, V.isSqlDateOrZero
	]);
	return errs;
}

export function fromJsonToShinryouMaster(src: any): ShinryouMaster | V.ValidationError {
	let master = new ShinryouMaster(src.shinryoucode, src.name, +src.tensuu,
		+src.tensuu_shikibetsu, src.houkatsukensa, +src.oushinkubun, 
		src.kensagroup, +src.roujintekiyou, +src.code_shou, 
		src.code_bu, src.code_alpha, src.code_kubun, src.valid_from, src.valid_upto);
	let errs = validateShinryouMaster(master);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return master;
	}
}




