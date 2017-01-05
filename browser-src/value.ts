import * as moment from "moment";

export class Value<T> {

	constructor(
		protected value: T | undefined = undefined,
		protected err: any = null
	){}

	hasError(): boolean {
		return this.err !== null;
	}

	getError(): any {
		if( this.err === null ){
			throw new Error("There is no error.");
		} else {
			return this.err;
		}
	}

	getValue(): T {
		if( this.hasError() ){
			throw new Error("There is an error.");
		}
		let value = this.value;
		if( value === undefined ){
			throw new Error("There is no valud.");
		} else {
			return value;
		}
	}

	confirm(pred: (value: T) => boolean, errString: string): this {
		if( this.hasError ){
			return this;
		}
		let value = this.value;
		if( value === undefined ){
			throw new Error("Value is not defined");
		} else {
			if( pred(value) ){
				return this;
			} else {
				this.err = `${ errString } ${ JSON.stringify(value) }`;
				return this;
			}
		}
	}

	convert(onErr: (err: any) => any, defaultValue: T): T {
		if( this.hasError() ){
			onErr(this.getError());
			return defaultValue;
		} else {
			return this.getValue();
		}
	}

	or(c1: (v: this) => this, c2: (v: this) => this): this {
		let v1 = c1(this);
		if( !v1.hasError() ){
			return v1;
		} else {
			return c2(this);
		}
	}

	oneOf(...choices: T[]): this {
		if( this.hasError() ){
			return this;
		}
		let value = this.getValue();
		for(let i=0;i<choices.length;i++){
			let c = choices[i];
			if( c === value ){
				return this;
			}
		}
		this.err = "選択できる値のひとつでありません。";
		return this;
	}
}

export function makeValue(src: any){
	return new SrcValue(src);
}

export let Undefined = new Value<any>(undefined, "値が設定されていません。");

class SrcValue extends Value<any> {

	ensureNumber(): NumberValue {
		if( this.hasError ){
			return new NumberValue(undefined, this.err);
		}
		if( typeof this.value === "number" ){
			return new NumberValue(<number>this.value);
		} else {
			return new NumberValue(undefined, "数値でありません。");
		}
	}

	ensureString(): StringValue {
		if( this.hasError ){
			return new StringValue(undefined, this.err);
		}
		if( typeof this.value === "string" ){
			return new StringValue(<string>this.value);
		} else {
			return new StringValue(undefined, "文字列でありません。");
		}
	}
}

class NumberValue extends Value<number> {

	isInteger(): NumberValue {
		return this.confirm(
			value => Number.isInteger(value),
			"整数でありません。"
		);
	}

	isPositive(): NumberValue {
		return this.confirm(
			value => value > 0,
			"正の数値でありません。"
		);
	}

	isZeroPositive(): NumberValue {
		return this.confirm(
			value => value >= 0,
			"正またはｾﾞﾛでありません。"
		);
	}
}

class StringValue extends Value<string> {

	isNotEmpty(): StringValue {
		return this.confirm(
			value => value !== "",
			"空の文字列です。"
		);
	}

	matches(re: RegExp): StringValue {
		return this.confirm(
			value => re.test(value),
			"文字列の値が不適切です。"
		);
	}

	isValidDate(): StringValue {
		return this.confirm(
			value => moment(value).isValid(),
			"正しい日付でありません。"
		);
	}

	isSqlDate(): StringValue {
		return this.confirm(
			value => /^\d{4}-\d{2}-\d{2}$/.test(value),
			"日付の形式に合致しません。"
		);
	}

	isZeroSqlDate(): StringValue {
		return this.confirm(
			value => value === "0000-00-00",
			"0000-00-00 でありません。"
		)
	}

	isSqlDateTime(): StringValue {
		return this.confirm(
			value => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value),
			"日付時間の形式に合致しません。"
		);
	}
}

