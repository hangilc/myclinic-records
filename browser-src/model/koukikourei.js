"use strict";
class Koukikourei {
}
exports.Koukikourei = Koukikourei;
function jsonToKoukikourei(src) {
    let hoken = new Koukikourei();
    hoken.koukikoureiId = src.koukikourei_id;
    hoken.patientId = src.patient_id;
    hoken.hokenshaBangou = src.hokensha_bangou;
    hoken.hihokenshaBangou = src.hihokensha_bangou;
    hoken.futanWari = src.futan_wari;
    hoken.validFrom = src.valid_from;
    hoken.validUpto = src.valid_upto;
    return hoken;
}
exports.jsonToKoukikourei = jsonToKoukikourei;
// export function validateKoukikourei(koukikourei: Koukikourei,
// 	checkKoukikoureiId: boolean = true): string[] {
// 	let errs: string[] = [];
// 	if( checkKoukikoureiId ){
// 		V.validate("koukikoureiId", koukikourei.koukikoureiId, errs, [
// 			V.isDefined, V.isInteger, V.isPositive
// 		]);
// 	}
// 	V.validate("患者番号", koukikourei.patientId, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("保険者番号", koukikourei.hokenshaBangou, errs, [
// 		V.isDefined, V.isString, V.isNotEmpty
// 	]);
// 	V.validate("被保険者番号", koukikourei.hihokenshaBangou, errs, [
// 		V.isDefined, V.isString, V.isNotEmpty
// 	]);
// 	V.validate("負担割", koukikourei.futanWari, errs, [
// 		V.isDefined, V.isInteger, V.isZeroOrPositive
// 	]);
// 	V.validate("有効期限（開始）", koukikourei.validFrom, errs, [
// 		V.isDefined, V.isSqlDate
// 	]);
// 	V.validate("有効期限（終了）", koukikourei.validFrom, errs, [
// 		V.isDefined, V.isSqlDateOrZero
// 	]);
// 	return errs;
// }
// export function fromJsonToKoukikourei(src: any): Koukikourei | V.ValidationError {
// 	let koukikourei = new Koukikourei(src.koukikourei_id, src.patient_id, 
// 		src.hokensha_bangou, src.hihokensha_bangou, 
// 		src.futan_wari, src.valid_from, src.valid_upto);
// 	let errs = validateKoukikourei(koukikourei, true);
// 	if( errs.length > 0 ){
// 		return new V.ValidationError(errs);
// 	} else {
// 		return koukikourei;
// 	}
// }
