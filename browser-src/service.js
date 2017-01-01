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
function getKoukikourei(koukikoureiId) {
    if (!(Number.isInteger(koukikoureiId) && koukikoureiId > 0)) {
        return Promise.reject("invalid koukikoureiId");
    }
    return request("get_koukikourei", { koukikourei_id: koukikoureiId }, "GET", model.fromJsonToKoukikourei);
}
exports.getKoukikourei = getKoukikourei;
function getRoujin(roujinId) {
    if (!(Number.isInteger(roujinId) && roujinId > 0)) {
        return Promise.reject("invalid roujinId");
    }
    return request("get_roujin", { roujin_id: roujinId }, "GET", model.fromJsonToRoujin);
}
exports.getRoujin = getRoujin;
function getKouhi(kouhiId) {
    if (!(Number.isInteger(kouhiId) && kouhiId > 0)) {
        return Promise.reject("invalid kouhiId");
    }
    return request("get_kouhi", { kouhi_id: kouhiId }, "GET", model.fromJsonToKouhi);
}
exports.getKouhi = getKouhi;
function getDrug(drugId) {
    if (!(Number.isInteger(drugId) && drugId > 0)) {
        return Promise.reject("invalid drugId");
    }
    return request("get_drug", { drug_id: drugId }, "GET", model.fromJsonToDrug);
}
exports.getDrug = getDrug;
function getShinryou(shinryouId) {
    if (!(Number.isInteger(shinryouId) && shinryouId > 0)) {
        return Promise.reject("invalid shinryouId");
    }
    return request("get_shinryou", { shinryou_id: shinryouId }, "GET", model.fromJsonToShinryou);
}
exports.getShinryou = getShinryou;
function getConduct(conductId) {
    if (!(Number.isInteger(conductId) && conductId > 0)) {
        return Promise.reject("invalid conductId");
    }
    return request("get_conduct", { conduct_id: conductId }, "GET", model.fromJsonToConduct);
}
exports.getConduct = getConduct;
function getGazouLabel(conductId) {
    if (!(Number.isInteger(conductId) && conductId > 0)) {
        return Promise.reject("invalid conductId");
    }
    return request("get_gazou_label", { conduct_id: conductId }, "GET", model.fromJsonToGazouLabel);
}
exports.getGazouLabel = getGazouLabel;
function getConductDrug(conductDrugId) {
    if (!(Number.isInteger(conductDrugId) && conductDrugId > 0)) {
        return Promise.reject("invalid conductDrugId");
    }
    return request("get_conduct_drug", { conduct_drug_id: conductDrugId }, "GET", model.fromJsonToConductDrug);
}
exports.getConductDrug = getConductDrug;
function getConductShinryou(conductShinryouId) {
    if (!(Number.isInteger(conductShinryouId) && conductShinryouId > 0)) {
        return Promise.reject("invalid conductShinryouId");
    }
    return request("get_conduct_shinryou", { conduct_shinryou_id: conductShinryouId }, "GET", model.fromJsonToConductShinryou);
}
exports.getConductShinryou = getConductShinryou;
function getConductKizai(conductKizaiId) {
    if (!(Number.isInteger(conductKizaiId) && conductKizaiId > 0)) {
        return Promise.reject("invalid conductKizaiId");
    }
    return request("get_conduct_kizai", { conduct_kizai_id: conductKizaiId }, "GET", model.fromJsonToConductKizai);
}
exports.getConductKizai = getConductKizai;
function getCharge(visitId) {
    if (!(Number.isInteger(visitId) && visitId > 0)) {
        return Promise.reject("invalid visitId");
    }
    return request("get_charge", { visit_id: visitId }, "GET", model.fromJsonToCharge);
}
exports.getCharge = getCharge;
