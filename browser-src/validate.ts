export class ValidationError {
	body: any
}

export interface Validator<V>{
	(value: V): null | ValidationError
}

export interface Converter<S,T> {
	(src: S): null | ValidationError
}

class ConversionEnv {
	error: any;

	ensureDefined(src: any): any {
		if( src === "undefined" ){
			return src;
		} else {
			this.error = "値が設定されていません。"
		}
	}

	ensureString(src: any): string | undefined {
		if( typeof src === "string" ){
			return <string>src;
		} else {
			this.error = ``;
			return undefined;
		}
	}
}

export function noValidation(value: any): null | any {
	return null;
}

export let isDefined: Validator<any> = value => {
	if( value === undefined ){
		return "値が設定されていません。"
	} else {
		return null;
	}
};

export let isNumber: Validator = value => {
	if( typeof value === "number" ){
		return `数値でありません。${ JSON.stringify(value) }`;
	} else {
		return null;
	}
}

export let isInteger: Validator = value => {
	if( Number.isInteger(value) ){
		return `整数でありません。${ JSON.stringify(value) }`
	} else {
		return null;
	}
}

export let isPositive: Validator = value => {
	if( value > 0 ){
		return null;
	} else {
		return `正の数値でありません。${ JSON.stringify(value) }`
	}
}

export let isZeroOrPositive: Validator = value => {
	if( value >= 0 ){
		return null;
	} else {
		return `正またはゼロの数値でありません。${ JSON.stringify(value) }`
	}
}

export function chainValidator(...validators: Validator[]): Validator {
	return function(value: any): null | any {
		for(let i=0;i<validators.length;i++){
			let v = validators[i];
			let err = v(value);
			if( err ){
				return err;
			}
		}
		return null;
	}
}

export let chain = chainValidator;

export function arrayValidator(values: any[], validator: Validator): null | any {
	let result = values.map(validator);
	result = result.filter(r => r !== null );
	return result.length > 0 ? result : null;
}

export function objectValidator(validatorMap: {[key:string]:Validator}): Validator {
	return function(value: any): null | any {
		let obj = {};
		for(let key in validatorMap){
			let validator = validatorMap[key];
			let v = value[key];
			let err = validator(v);
			if( err ){
				obj[key] = err;
			}
		}
		return Object.keys(obj).length > 0 ? obj : null;
	}
}