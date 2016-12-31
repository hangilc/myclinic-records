"use strict";
const moment = require("moment");
class ValidationError {
    constructor(errors) {
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
function isDefined(name, value) {
    if (value === undefined) {
        return `${name}の値が指摘されていません。`;
    }
    else {
        return null;
    }
}
exports.isDefined = isDefined;
function isInteger(name, value) {
    if (Number.isInteger(value)) {
        return null;
    }
    else {
        return `${name}の値が整数でありません。`;
    }
}
exports.isInteger = isInteger;
function isString(name, value) {
    if (typeof value === "string") {
        return null;
    }
    else {
        return `${name}の値が文字列でありません。`;
    }
}
exports.isString = isString;
function isPositive(name, value) {
    if (value > 0) {
        return null;
    }
    else {
        return `${name}の値が正数でありません。`;
    }
}
exports.isPositive = isPositive;
function isNotEmpty(name, value) {
    if (value === "" || value == null) {
        return `${name}の値が空白です。`;
    }
    else {
        return null;
    }
}
exports.isNotEmpty = isNotEmpty;
function isSqlDate(name, value) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        let m = moment(value);
        if (m.isValid()) {
            return null;
        }
    }
    return `${name}の値が不適切です。`;
}
exports.isSqlDate = isSqlDate;
function isSqlDateOrZero(name, value) {
    if (value === "0000-00-00") {
        return null;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        let m = moment(value);
        if (m.isValid()) {
            return null;
        }
    }
    return `${name}の値が不適切です。`;
}
exports.isSqlDateOrZero = isSqlDateOrZero;
function isOneOf(...list) {
    return function (name, value) {
        for (let i = 0; i < list.length; i++) {
            if (value === list[i]) {
                return null;
            }
        }
        return `${name}の値が不適切です。`;
    };
}
exports.isOneOf = isOneOf;
function validate(name, value, errs, validators) {
    for (let i = 0; i < validators.length; i++) {
        let validator = validators[i];
        let err = validator(name, value);
        if (err) {
            errs.push(err);
            return;
        }
    }
}
exports.validate = validate;
