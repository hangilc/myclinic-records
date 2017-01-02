import * as moment from "moment";

export class ValidationError {
	constructor(readonly errors: string[]){}
}

export interface Validator {
	(name: string, o: any) : string | null
}

export function mapConvert<S,T>(arr: S[], cvt: (src:S) => T|ValidationError): T[] | ValidationError {
	let res: T[] = [];
	for(let i=0;i<arr.length;i++){
		let c = cvt(arr[i]);
		if( c instanceof ValidationError ){
			return c;
		} else {
			res.push(c);
		}
	}
	return res;
}

export function isDefined(name: string, value: any): string | null {
	if( value === undefined ){
		return `${ name }の値が指摘されていません。`;
	} else {
		return null;
	}
}

export function isNumber(name: string, value: any): string | null {
	if( typeof value === "number" ){
		return null;
	} else {
		return `${ name }の値が数値でありません。`;
	}
}

export function isInteger(name: string, value: any): string | null {
	if( Number.isInteger(value) ){
		return null;
	} else {
		return `${ name }の値が整数でありません。`;
	}
}

export function isString(name: string, value: any): string | null {
	if( typeof value === "string" ){
		return null;
	} else {
		return `${ name }の値が文字列でありません。`;
	}
}

export function isBoolean(name: string, value: any): string | null {
	if( typeof value === "boolean" ){
		return null;
	} else {
		return `${ name }の値が真偽値でありません。`;
	}
}

export function isPositive(name: string, value: any): string | null {
	if( value > 0 ){
		return null;
	} else {
		return `${ name }の値が正数でありません。`;
	}
}

export function isZeroOrPositive(name: string, value: any): string | null {
	if( value >= 0 ){
		return null;
	} else {
		return `${ name }の値がゼロあるいは正数でありません。`;
	}
}

export function isNotEmpty(name: string, value: any): string | null {
	if( value === "" || value == null ){
		return `${ name}の値が空白です。`;
	} else {
		return null;
	}
}

export function isSqlDate(name: string, value: any): string | null {
	if( /^\d{4}-\d{2}-\d{2}$/.test(value) ){
		let m = moment(value);
		if( m.isValid() ){
			return null;
		}
	}
	return `${ name }の値が不適切です。`;
}

export function isSqlDateOrZero(name: string, value: any): string | null {
	if( value === "0000-00-00" ){
		return null;
	}
	if( /^\d{4}-\d{2}-\d{2}$/.test(value) ){
		let m = moment(value);
		if( m.isValid() ){
			return null;
		}
	}
	return `${ name }の値が不適切です。`;
}

export function isSqlDateTime(name: string, value: any): string | null {
	if( /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) ){
		let m = moment(value);
		if( m.isValid() ){
			return null;
		}
	}
	return `${ name }の値が不適切です。`;
}

export function isOneOf(...list: any[]): Validator {
	return function(name: string, value: any): string | null {
		for(let i=0;i<list.length;i++){
			if( value === list[i] ){
				return null;
			}
		}
		return `${ name }の値が不適切です。`;
	}
}

export function isFloatCompatibleString(name: string, value: any): string | null {
	if( /^\d+(\.\d+)?$/.test(value) ){
		return null;
	} else {
		return `${ name }の値が数値をあらわす文字列でありません。`;
	}
}

export function isOptionalString(name: string, value: any): string | null {
	if( value == null || typeof value === "string" ){
		return null;
	} else {
		return `${ name }の値が不適切です。`;
	}
}

export function validate(name: string, value: any, errs: string[], 
	validators: Validator[]): void {
	for(let i=0;i<validators.length;i++){
		let validator = validators[i];
		let err = validator(name, value);
		if( err ){
			errs.push(err);
			return;
		}
	}
}
