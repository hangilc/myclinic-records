"use strict";
class Kouhi {
}
exports.Kouhi = Kouhi;
function jsonToKouhi(src) {
    let kouhi = new Kouhi();
    kouhi.kouhiId = src.kouhi_id;
    kouhi.patientId = src.patient_id;
    kouhi.futansha = src.futansha;
    kouhi.jukyuusha = src.jukyuusha;
    kouhi.validFrom = src.valid_from;
    kouhi.validUpto = src.valid_upto;
    return kouhi;
}
exports.jsonToKouhi = jsonToKouhi;
// export function validateKouhi(kouhi: Kouhi,
// 	checkKouhiId: boolean = true): string[] {
// 	let errs: string[] = [];
// 	if( checkKouhiId ){
// 		V.validate("kouhiId", kouhi.kouhiId, errs, [
// 			V.isDefined, V.isInteger, V.isPositive
// 		]);
// 	}
// 	V.validate("患者番号", kouhi.patientId, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("負担者番号", kouhi.futansha, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("受給者番号", kouhi.jukyuusha, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("有効期限（開始）", kouhi.validFrom, errs, [
// 		V.isDefined, V.isSqlDate
// 	]);
// 	V.validate("有効期限（終了）", kouhi.validFrom, errs, [
// 		V.isDefined, V.isSqlDateOrZero
// 	]);
// 	return errs;
// }
// export function fromJsonToKouhi(src: any): Kouhi | V.ValidationError {
// 	let kouhi = new Kouhi(src.kouhi_id, src.patient_id, 
// 		src.futansha, src.jukyuusha, src.valid_from, src.valid_upto);
// 	let errs = validateKouhi(kouhi, true);
// 	if( errs.length > 0 ){
// 		return new V.ValidationError(errs);
// 	} else {
// 		return kouhi;
// 	}
// }
