"use strict";
const $ = require("jquery");
const model = require("./model");
class HttpError {
    constructor(status, text, exception) {
        this.status = status;
        this.text = text;
        this.exception = exception;
    }
}
exports.HttpError = HttpError;
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
    return request("get_patient", { patient_id: patientId }, "GET", model.fromJsonToPatient);
}
exports.getPatient = getPatient;
