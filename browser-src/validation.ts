import * as moment from "moment";

export class ValidationError {
	constructor(readonly errors: string[]){}
}

export interface Validator {
	(name: string, o: any) : string
}

export function isDefined(name, value): string {
	if( value === undefined ){
		return `${ name }の値が指摘されていません。`;
	} else {
		return null;
	}
}

export function isInteger(name, value): string {
	if( Number.isInteger(value) ){
		return null;
	} else {
		return `${ name }の値が整数でありません。`;
	}
}

export function isString(name, value): string {
	if( typeof value === "string" ){
		return null;
	} else {
		return `${ name }の値が文字列でありません。`;
	}
}

export function isPositive(name, value): string {
	if( value > 0 ){
		return null;
	} else {
		return `${ name }の値が正数でありません。`;
	}
}

export function isNotEmpty(name, value): string {
	if( value === "" || value == null ){
		return `${ name}の値が空白です。`;
	} else {
		return null;
	}
}

export function isSqlDate(name, value): string {
	if( /^\d{4}-\d{2}-\d{2}$/.test(value) ){
		let m = moment(value);
		if( m.isValid() ){
			return null;
		}
	}
	return `${ name }の値が不適切です。`;
}

export function isSqlDateOrZero(name, value): string {
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

export function isOneOf(...list: any[]): Validator {
	return function(name, value): string {
		for(let i=0;i<list.length;i++){
			if( value === list[i] ){
				return null;
			}
		}
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
