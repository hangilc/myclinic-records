"use strict";
const moment = require("moment");
class PrimitiveError {
    constructor(message, value) {
        this.message = message;
        this.value = value;
    }
}
class Value {
    constructor(_value, error = null) {
        this._value = _value;
        this.error = error;
    }
    get isError() {
        return this.error !== null;
    }
    get value() {
        if (this.isError) {
            throw this.error;
        }
        return this._value;
    }
}
exports.Value = Value;
class PrimitiveValue extends Value {
    constructor(value, error = null) {
        super(value, error);
    }
    confirm(pred, message) {
        if (!this.isError && !pred(this._value)) {
            this.error = new PrimitiveError(message, this._value);
        }
        return this;
    }
    oneOf(...choices) {
        if (this.isError) {
            return this;
        }
        let value = this._value;
        for (let i = 0; i < choices.length; i++) {
            let choice = choices[i];
            if (value === choice) {
                return this;
            }
        }
        this.error = new PrimitiveError("選択できる値のひとつでありません。", this._value);
        return this;
    }
}
exports.PrimitiveValue = PrimitiveValue;
class NumberValue extends PrimitiveValue {
    isInteger() {
        return this.confirm(value => Number.isInteger(value), "整数でありません。");
    }
    isPositive() {
        return this.confirm(value => value > 0, "正の数値でありません。");
    }
    isZeroOrPositive() {
        return this.confirm(value => value >= 0, "正またはｾﾞﾛでありません。");
    }
}
exports.NumberValue = NumberValue;
class StringValue extends PrimitiveValue {
    isNotEmpty() {
        return this.confirm(value => value !== "", "空の文字列です。");
    }
    matches(re) {
        return this.confirm(value => re.test(value), "文字列の値が不適切です。");
    }
    isValidDate() {
        return this.confirm(value => moment(value).isValid(), "正しい日付でありません。");
    }
    isValidDateTime() {
        return this.confirm(value => moment(value).isValid(), "正しい日付時刻でありません。");
    }
    isZeroOrValidDate() {
        return this.confirm(value => value === "0000-00-00" || moment(value).isValid(), "（'0000-00-00' を含む）正しい日付でありません。");
    }
    isSqlDate() {
        return this.confirm(value => /^\d{4}-\d{2}-\d{2}$/.test(value), "日付の形式に合致しません。");
    }
    isSqlDateTime() {
        return this.confirm(value => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value), "日付の形式に合致しません。");
    }
}
exports.StringValue = StringValue;
class BooleanValue extends PrimitiveValue {
}
exports.BooleanValue = BooleanValue;
function ensureNumber(value) {
    if (typeof value === "undefined") {
        return new NumberValue(0, new PrimitiveError("値が設定されていません。", value));
    }
    if (typeof value === "number") {
        return new NumberValue(value);
    }
    else {
        return new NumberValue(0, new PrimitiveError("値が数値でありません。", value));
    }
}
exports.ensureNumber = ensureNumber;
function ensureString(value) {
    if (typeof value === "undefined") {
        return new StringValue("", new PrimitiveError("値が設定されていません。", value));
    }
    if (typeof value === "string") {
        return new StringValue(value);
    }
    else {
        return new StringValue("", new PrimitiveError("値が文字列でありません。", value));
    }
}
exports.ensureString = ensureString;
function ensurePositiveInteger(value) {
    return ensureNumber(value).isInteger().isPositive();
}
exports.ensurePositiveInteger = ensurePositiveInteger;
/**
export class Value<T> {

    constructor(
        protected _value: T | undefined = undefined,
        protected _err: any = null
    ){}

    get err(): any { return this._err; }

    get value(): T {
        if( this._err !== null ){
            throw this._err;
        }
        if( this._value === undefined ){
            throw new Error("There is no value.");
        } else {
            return this._value;
        }
    }

    confirm(pred: (value: T) => boolean, errString: string): this {
        if( this._err ){
            return this;
        }
        let value = this._value;
        if( value === undefined ){
            this._err = "Undefined value";
        } else {
            if( !pred(value) ){
                this._err = errString;
            }
        }
        return this;
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

**/
