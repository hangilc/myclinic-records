"use strict";
class Shahokokuho {
}
exports.Shahokokuho = Shahokokuho;
class ShahokokuhoValues {
}
exports.ShahokokuhoValues = ShahokokuhoValues;
function jsonToShahokokuho(src) {
    let shaho = new Shahokokuho();
    shaho.shahokokuhoId = src.shahokokuho_id;
    shaho.patientId = src.patient_id;
    shaho.hokenshaBangou = src.hokensha_bangou;
    shaho.hihokenshaKigou = src.hihokensha_kigou;
    shaho.hihokenshaBangou = src.hihokensha_bangou;
    shaho.honnin = src.honnin === 0 ? false : true;
    shaho.validFrom = src.valid_from;
    shaho.validUpto = src.valid_upto;
    shaho.kourei = src.kourei;
    return shaho;
}
exports.jsonToShahokokuho = jsonToShahokokuho;
function rep(hoken) {
    let hokenshaBangou = hoken.hokenshaBangou;
    if (hokenshaBangou <= 9999)
        return "政管健保";
    if (hokenshaBangou <= 999999)
        return "国保";
    switch (Math.floor(hokenshaBangou / 1000000)) {
        case 1: return "協会けんぽ";
        case 2: return "船員";
        case 3: return "日雇一般";
        case 4: return "日雇特別";
        case 6: return "組合健保";
        case 7: return "自衛官";
        case 31: return "国家公務員共済";
        case 32: return "地方公務員共済";
        case 33: return "警察公務員共済";
        case 34: return "学校共済";
        case 63: return "特定健保退職";
        case 67: return "国保退職";
        case 72: return "国家公務員共済退職";
        case 73: return "地方公務員共済退職";
        case 74: return "警察公務員共済退職";
        case 75: return "学校共済退職";
        default: return "不明";
    }
}
function shahokokuhoRep(hoken) {
    let s = rep(hoken);
    if (hoken.kourei > 0) {
        s += `(高齢${hoken.kourei}割)`;
    }
    return s;
}
exports.shahokokuhoRep = shahokokuhoRep;
// export function validateShahokokuho(shahokokuho: Shahokokuho,
// 	checkShahokokuhoId: boolean = true): string[] {
// 	let errs: string[] = [];
// 	if( checkShahokokuhoId ){
// 		V.validate("shahokokuhoId", shahokokuho.shahokokuhoId, errs, [
// 			V.isDefined, V.isInteger, V.isPositive
// 		]);
// 	}
// 	V.validate("患者番号", shahokokuho.patientId, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("保険者番号", shahokokuho.hokenshaBangou, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("被保険者記号", shahokokuho.hihokenshaKigou, errs, [
// 		V.isDefined, V.isString, V.isNotEmpty
// 	]);
// 	V.validate("被保険者番号", shahokokuho.hihokenshaBangou, errs, [
// 		V.isDefined, V.isString, V.isNotEmpty
// 	]);
// 	V.validate("本人", shahokokuho.honnin, errs, [
// 		V.isDefined, V.isBoolean
// 	]);
// 	V.validate("有効期限（開始）", shahokokuho.validFrom, errs, [
// 		V.isDefined, V.isSqlDate
// 	]);
// 	V.validate("有効期限（終了）", shahokokuho.validFrom, errs, [
// 		V.isDefined, V.isSqlDateOrZero
// 	]);
// 	V.validate("高齢", shahokokuho.kourei, errs, [
// 		V.isDefined, V.isInteger, V.isZeroOrPositive
// 	]);
// 	return errs;
// }
// export function fromJsonToShahokokuho(src: any): Shahokokuho | V.ValidationError {
// 	let shahokokuho = new Shahokokuho(src.shahokokuho_id, src.patient_id, 
// 		src.hokensha_bangou, src.hihokensha_kigou, src.hihokensha_bangou, 
// 		src.honnin === 0 ? false : true, src.valid_from, 
// 		src.valid_upto, src.kourei);
// 	let errs = validateShahokokuho(shahokokuho, true);
// 	if( errs.length > 0 ){
// 		return new V.ValidationError(errs);
// 	} else {
// 		return shahokokuho;
// 	}
// }
