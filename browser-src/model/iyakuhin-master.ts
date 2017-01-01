import * as V from "../validation";

export class IyakuhinMaster {
	constructor(
		readonly iyakuhincode: number,
		readonly name: string,
		readonly yomi: string,
		readonly unit: string,
		readonly yakka: number,
		readonly madoku: number,
		readonly kouhatsu: boolean,
		readonly zaikei: number,
		readonly validFrom: string,
		readonly validUpto: string
	){}
}

export function validateIyakuhinMaster(iyakuhinMaster: IyakuhinMaster): string[] {
	let errs: string[] = [];
	V.validate("医薬品コード", iyakuhinMaster.iyakuhincode, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("名前", iyakuhinMaster.name, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("よみ", iyakuhinMaster.yomi, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("単位", iyakuhinMaster.unit, errs, [
		V.isDefined, V.isString, V.isNotEmpty
	]);
	V.validate("薬価", iyakuhinMaster.yakka, errs, [
		V.isDefined, V.isNumber, V.isZeroOrPositive
	]);
	V.validate("麻毒", iyakuhinMaster.madoku, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	V.validate("後発", iyakuhinMaster.kouhatsu, errs, [
		V.isDefined, V.isBoolean
	]);
	V.validate("剤型", iyakuhinMaster.zaikei, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	V.validate("有効期限（開始）", iyakuhinMaster.validFrom, errs, [
		V.isDefined, V.isSqlDate
	]);
	V.validate("有効期限（終了）", iyakuhinMaster.validFrom, errs, [
		V.isDefined, V.isSqlDateOrZero
	]);
	return errs;
}

export function fromJsonToIyakuhinMaster(src: any): [IyakuhinMaster, V.ValidationError] {
	let master = new IyakuhinMaster(src.iyakuhincode, src.name, src.yomi, src.unit,
		+src.yakka, +src.madoku, src.kouhatsu === 0 ? false : true,
		+src.zaikei, src.valid_from, src.valid_upto);
	let errs = validateIyakuhinMaster(master);
	if( errs.length > 0 ){
		return [undefined, new V.ValidationError(errs)];
	} else {
		return [master, null];
	}
}




