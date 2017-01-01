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
function isNumber(name, value) {
    if (typeof value === "number") {
        return null;
    }
    else {
        return `${name}の値が数値でありません。`;
    }
}
exports.isNumber = isNumber;
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
function isBoolean(name, value) {
    if (typeof value === "boolean") {
        return null;
    }
    else {
        return `${name}の値が真偽値でありません。`;
    }
}
exports.isBoolean = isBoolean;
function isPositive(name, value) {
    if (value > 0) {
        return null;
    }
    else {
        return `${name}の値が正数でありません。`;
    }
}
exports.isPositive = isPositive;
function isZeroOrPositive(name, value) {
    if (value >= 0) {
        return null;
    }
    else {
        return `${name}の値がゼロあるいは正数でありません。`;
    }
}
exports.isZeroOrPositive = isZeroOrPositive;
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
function isSqlDateTime(name, value) {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
        let m = moment(value);
        if (m.isValid()) {
            return null;
        }
    }
    return `${name}の値が不適切です。`;
}
exports.isSqlDateTime = isSqlDateTime;
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
function isFloatCompatibleString(name, value) {
    if (/^\d+(\.\d+)?$/.test(value)) {
        return null;
    }
    else {
        return `${name}の値が数値をあらわす文字列でありません。`;
    }
}
exports.isFloatCompatibleString = isFloatCompatibleString;
function isOptionalString(name, value) {
    if (value == null || typeof value === "string") {
        return null;
    }
    else {
        return `${name}の値が不適切です。`;
    }
}
exports.isOptionalString = isOptionalString;
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
