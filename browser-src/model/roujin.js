"use strict";
class Roujin {
}
exports.Roujin = Roujin;
function jsonToRoujin(src) {
    let hoken = new Roujin();
    hoken.roujinId = src.roujin_id;
    hoken.patientId = src.patient_id;
    hoken.shichouson = src.shichouson;
    hoken.jukyuusha = src.jukyuusha;
    hoken.futanWari = src.futan_wari;
    hoken.validFrom = src.valid_from;
    hoken.validUpto = src.valid_upto;
    return hoken;
}
exports.jsonToRoujin = jsonToRoujin;
function roujinRep(roujin) {
    return "老人" + roujin.futanWari + "割";
}
exports.roujinRep = roujinRep;
// export function validateRoujin(roujin: Roujin,
// 	checkRoujinId: boolean = true): string[] {
// 	let errs: string[] = [];
// 	if( checkRoujinId ){
// 		V.validate("roujinId", roujin.roujinId, errs, [
// 			V.isDefined, V.isInteger, V.isPositive
// 		]);
// 	}
// 	V.validate("患者番号", roujin.patientId, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("市町村番号", roujin.shichouson, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("受給者番号", roujin.jukyuusha, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("負担割", roujin.futanWari, errs, [
// 		V.isDefined, V.isInteger, V.isZeroOrPositive
// 	]);
// 	V.validate("有効期限（開始）", roujin.validFrom, errs, [
// 		V.isDefined, V.isSqlDate
// 	]);
// 	V.validate("有効期限（終了）", roujin.validFrom, errs, [
// 		V.isDefined, V.isSqlDateOrZero
// 	]);
// 	return errs;
// }
// export function fromJsonToRoujin(src: any): Roujin | V.ValidationError {
// 	let roujin = new Roujin(src.roujin_id, src.patient_id, 
// 		src.shichouson, src.jukyuusha, 
// 		src.futan_wari, src.valid_from, src.valid_upto);
// 	let errs = validateRoujin(roujin, true);
// 	if( errs.length > 0 ){
// 		return new V.ValidationError(errs);
// 	} else {
// 		return roujin;
// 	}
// }
