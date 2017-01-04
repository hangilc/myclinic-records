import * as moment from "moment";

export class ValidationError {
	constructor(
		readonly body: any
	){}

	toString(): string {
		return JSON.stringify(this.body);
	}
}

export class ValidatorBase<V> {
	constructor(
		protected value: V,
		protected err: ValidationError | null = null
	){}

	oneOf(candidates: V[]): this {
		return this.confirm(
			() => {
				let value = this.value;
				for(let i=0;i<candidates.length;i++){
					if( value === candidates[i] ){
						return true;
					}
				}
				return false;
			},
			"正しい値のうちのひとつでありません。"
		);

	}

	get hasError(): boolean {
		return this.err !== null;
	}

	getError(): any {
		let err = this.err;
		if( err instanceof ValidationError ){
			return err.body;
		} else {
			throw new Error("there is no error");
		}
	}

	getValue(): V {
		if( this.hasError ){
			throw new Error("cannot get value (Validation failed)");
		}
		return this.value;
	}

	confirm(pred: () => boolean, errString: string): this {
		if( this.hasError ){
			return this;
		}
		if( pred() ){
			return this;
		} else {
			let msg = `${ errString } ${ JSON.stringify(this.value) }`;
			this.err = new ValidationError(msg);
			return this;
		}
	}
}

export class Validator extends ValidatorBase<any> {
	constructor(
		value: any,
		err: ValidationError | null= null
	){
		super(value, err);
	}

	isDefined(): Validator {
		return this.confirm(
			() => typeof this.value !== "undefined",
			"値が設定されていません。"
		);
	}

	ensureNumber(): NumberValidator {
		if( this.hasError ){
			return new NumberValidator(0, this.err);
		} else {
			if( typeof this.value === "number" ){
				let num: number = <number>this.value;
				return new NumberValidator(num);
			} else {
				let msg = `数値でありません。${ JSON.stringify(this.value) }`;
				return new NumberValidator(0, new ValidationError(msg));
			}
		}
	}

	ensureString(): StringValidator {
		if( this.hasError ){
			return new StringValidator("", this.err);
		} else {
			if( typeof this.value === "string" ){
				let str: string = <string>this.value;
				return new StringValidator(str);
			} else {
				let msg = `数値でありません。${ JSON.stringify(this.value) }`;
				return new StringValidator("", new ValidationError(msg));
			}
		}
	}
}

export class NumberValidator extends ValidatorBase<number> {
	constructor(
		value: number,
		err: ValidationError | null = null
	){
		super(value, err);
	}

	isInteger(): NumberValidator {
		return this.confirm(
			() => Number.isInteger(this.value),
			"整数でありません。"
		);
	}

	isPositive(): NumberValidator {
		return this.confirm(
			() => this.value > 0,
			"正の数値でありません。"
		);
	}

	isZeroPositive(): NumberValidator {
		return this.confirm(
			() => this.value >= 0,
			"正またはｾﾞﾛでありません。"
		);
	}
}

export class StringValidator extends ValidatorBase<string> {
	constructor(
		value: string,
		err: ValidationError | null = null
	){
		super(value, err);
	}

	isNotEmpty(): StringValidator {
		return this.confirm(
			() => this.value !== "",
			"空の文字列です。"
		);
	}

	matches(re: RegExp): StringValidator {
		return this.confirm(
			() => re.test(this.value),
			"文字列の値が不適切です。"
		);
	}

	isValidDate(): StringValidator {
		return this.confirm(
			() => moment(this.value).isValid(),
			"正しい日付でありません。"
		);
	}

	isSqlDate(): StringValidator {
		return this.confirm(
			() => /^\d{4}-\d{2}-\d{2}$/.test(this.value),
			"日付の形式に合致しません。"
		);
	}

	isSqlDateTime(): StringValidator {
		return this.confirm(
			() => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(this.value),
			"日付時間の形式に合致しません。"
		);
	}
}

