"use strict";
class ValidationError {
}
exports.ValidationError = ValidationError;
class ConversionEnv {
    ensureDefined(src) {
        if (src === "undefined") {
            return src;
        }
        else {
            this.error = "値が設定されていません。";
        }
    }
    ensureString(src) {
        if (typeof src === "string") {
            return src;
        }
        else {
            this.error = ``;
            return undefined;
        }
    }
}
function noValidation(value) {
    return null;
}
exports.noValidation = noValidation;
exports.isDefined = value => {
    if (value === undefined) {
        return "値が設定されていません。";
    }
    else {
        return null;
    }
};
exports.isNumber = value => {
    if (typeof value === "number") {
        return `数値でありません。${JSON.stringify(value)}`;
    }
    else {
        return null;
    }
};
exports.isInteger = value => {
    if (Number.isInteger(value)) {
        return `整数でありません。${JSON.stringify(value)}`;
    }
    else {
        return null;
    }
};
exports.isPositive = value => {
    if (value > 0) {
        return null;
    }
    else {
        return `正の数値でありません。${JSON.stringify(value)}`;
    }
};
exports.isZeroOrPositive = value => {
    if (value >= 0) {
        return null;
    }
    else {
        return `正またはゼロの数値でありません。${JSON.stringify(value)}`;
    }
};
function chainValidator(...validators) {
    return function (value) {
        for (let i = 0; i < validators.length; i++) {
            let v = validators[i];
            let err = v(value);
            if (err) {
                return err;
            }
        }
        return null;
    };
}
exports.chainValidator = chainValidator;
exports.chain = chainValidator;
function arrayValidator(values, validator) {
    let result = values.map(validator);
    result = result.filter(r => r !== null);
    return result.length > 0 ? result : null;
}
exports.arrayValidator = arrayValidator;
function objectValidator(validatorMap) {
    return function (value) {
        let obj = {};
        for (let key in validatorMap) {
            let validator = validatorMap[key];
            let v = value[key];
            let err = validator(v);
            if (err) {
                obj[key] = err;
            }
        }
        return Object.keys(obj).length > 0 ? obj : null;
    };
}
exports.objectValidator = objectValidator;
