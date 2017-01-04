"use strict";
const moment = require("moment");
class ValidationError {
    constructor(body) {
        this.body = body;
    }
    toString() {
        return JSON.stringify(this.body);
    }
}
exports.ValidationError = ValidationError;
class ValidatorBase {
    constructor(value, err = null) {
        this.value = value;
        this.err = err;
    }
    oneOf(candidates) {
        return this.confirm(() => {
            let value = this.value;
            for (let i = 0; i < candidates.length; i++) {
                if (value === candidates[i]) {
                    return true;
                }
            }
            return false;
        }, "正しい値のうちのひとつでありません。");
    }
    get hasError() {
        return this.err !== null;
    }
    getError() {
        let err = this.err;
        if (err instanceof ValidationError) {
            return err.body;
        }
        else {
            throw new Error("there is no error");
        }
    }
    getValue() {
        if (this.hasError) {
            throw new Error("cannot get value (Validation failed)");
        }
        return this.value;
    }
    confirm(pred, errString) {
        if (this.hasError) {
            return this;
        }
        if (pred()) {
            return this;
        }
        else {
            let msg = `${errString} ${JSON.stringify(this.value)}`;
            this.err = new ValidationError(msg);
            return this;
        }
    }
}
exports.ValidatorBase = ValidatorBase;
class Validator extends ValidatorBase {
    constructor(value, err = null) {
        super(value, err);
    }
    isDefined() {
        return this.confirm(() => typeof this.value !== "undefined", "値が設定されていません。");
    }
    ensureNumber() {
        if (this.hasError) {
            return new NumberValidator(0, this.err);
        }
        else {
            if (typeof this.value === "number") {
                let num = this.value;
                return new NumberValidator(num);
            }
            else {
                let msg = `数値でありません。${JSON.stringify(this.value)}`;
                return new NumberValidator(0, new ValidationError(msg));
            }
        }
    }
    ensureString() {
        if (this.hasError) {
            return new StringValidator("", this.err);
        }
        else {
            if (typeof this.value === "string") {
                let str = this.value;
                return new StringValidator(str);
            }
            else {
                let msg = `数値でありません。${JSON.stringify(this.value)}`;
                return new StringValidator("", new ValidationError(msg));
            }
        }
    }
}
exports.Validator = Validator;
class NumberValidator extends ValidatorBase {
    constructor(value, err = null) {
        super(value, err);
    }
    isInteger() {
        return this.confirm(() => Number.isInteger(this.value), "整数でありません。");
    }
    isPositive() {
        return this.confirm(() => this.value > 0, "正の数値でありません。");
    }
    isZeroPositive() {
        return this.confirm(() => this.value >= 0, "正またはｾﾞﾛでありません。");
    }
}
exports.NumberValidator = NumberValidator;
class StringValidator extends ValidatorBase {
    constructor(value, err = null) {
        super(value, err);
    }
    isNotEmpty() {
        return this.confirm(() => this.value !== "", "空の文字列です。");
    }
    matches(re) {
        return this.confirm(() => re.test(this.value), "文字列の値が不適切です。");
    }
    isValidDate() {
        return this.confirm(() => moment(this.value).isValid(), "正しい日付でありません。");
    }
    isSqlDate() {
        return this.confirm(() => /^\d{4}-\d{2}-\d{2}$/.test(this.value), "日付の形式に合致しません。");
    }
    isSqlDateTime() {
        return this.confirm(() => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(this.value), "日付時間の形式に合致しません。");
    }
}
exports.StringValidator = StringValidator;
