"use strict";
const $ = require("jquery");
const validation_1 = require("./validation");
const model = require("./model");
class HttpError {
    constructor(status, text, exception) {
        this.status = status;
        this.text = text;
        this.exception = exception;
    }
}
exports.HttpError = HttpError;
function fromJsonArray(cvtor) {
    return function (json) {
        if (Array.isArray(json)) {
            let list = json;
            let ret = [];
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                let [v, e] = cvtor(item);
                if (e) {
                    return [undefined, e];
                }
                ret.push(v);
            }
            return [ret, undefined];
        }
        else {
            return [undefined, new validation_1.ValidationError(["array expected"])];
        }
    };
}
function request(service, data, method, cvtor) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/service',
            type: method,
            data: Object.assign({
                _q: service
            }, data),
            dataType: "json",
            timeout: 15000,
            success: function (result) {
                let [ret, err] = cvtor(result);
                if (err) {
                    reject(err);
                }
                else {
                    resolve(ret);
                }
            },
            error: function (xhr, status, ex) {
                reject(new HttpError(status, xhr.responseText, ex));
            }
        });
    });
}
function getPatient(patientId) {
    if (!(Number.isInteger(patientId) && patientId > 0)) {
        return Promise.reject("invalid patientId");
    }
    return request("get_patient", { patient_id: patientId }, "GET", model.fromJsonToPatient);
}
exports.getPatient = getPatient;
function listVisitsByDate(at) {
    if (!(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at))) {
        return Promise.reject("invalid at");
    }
    return request("list_visits_by_date", { at: at }, "GET", fromJsonArray(model.fromJsonToVisit));
}
exports.listVisitsByDate = listVisitsByDate;
function getText(textId) {
    if (!(Number.isInteger(textId) && textId > 0)) {
        return Promise.reject("invalid textId");
    }
    return request("get_text", { text_id: textId }, "GET", model.fromJsonToText);
}
exports.getText = getText;
function getShahokokuho(shahokokuhoId) {
    if (!(Number.isInteger(shahokokuhoId) && shahokokuhoId > 0)) {
        return Promise.reject("invalid shahokokuhoId");
    }
    return request("get_shahokokuho", { shahokokuho_id: shahokokuhoId }, "GET", model.fromJsonToShahokokuho);
}
exports.getShahokokuho = getShahokokuho;
