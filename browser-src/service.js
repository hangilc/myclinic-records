"use strict";
const $ = require("jquery");
const validator_1 = require("./validator");
const model = require("./model");
class HttpError {
    constructor(status, text, exception) {
        this.status = status;
        this.text = text;
        this.exception = exception;
    }
}
exports.HttpError = HttpError;
function arrayConverter(cvt) {
    return function (src) {
        return convertArray(src, cvt);
    };
}
function convertArray(src, cvt) {
    let result = src.map(cvt);
    let errs = [];
    let vals = [];
    result.forEach(r => {
        if (r instanceof validator_1.ValidationError) {
            errs.push(r);
        }
        else {
            vals.push(r);
        }
    });
    if (errs.length > 0) {
        return errs.map(e => e.body);
    }
    else {
        if (vals.length !== src.length) {
            throw new Error("cannot happen in convertArray");
        }
        return vals;
    }
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
                let obj = cvtor(result);
                if (obj instanceof validator_1.ValidationError) {
                    console.log(result);
                    reject(obj);
                }
                else {
                    resolve(obj);
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
    return request("get_patient", { patient_id: patientId }, "GET", model.convertToPatient);
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
function getIyakuhinMaster(iyakuhincode, at) {
    if (!(Number.isInteger(iyakuhincode) && iyakuhincode > 0)) {
        return Promise.reject("invalid iyakuhincode");
    }
    if (!(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at))) {
        return Promise.reject("invalid at");
    }
    return request("get_iyakuhin_master", { iyakuhincode: iyakuhincode, at: at }, "GET", model.fromJsonToIyakuhinMaster);
}
exports.getIyakuhinMaster = getIyakuhinMaster;
function getShinryouMaster(shinryoucode, at) {
    if (!(Number.isInteger(shinryoucode) && shinryoucode > 0)) {
        return Promise.reject("invalid shinryoucode");
    }
    if (!(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at))) {
        return Promise.reject("invalid at");
    }
    return request("get_shinryou_master", { shinryoucode: shinryoucode, at: at }, "GET", model.fromJsonToShinryouMaster);
}
exports.getShinryouMaster = getShinryouMaster;
function getKizaiMaster(kizaicode, at) {
    if (!(Number.isInteger(kizaicode) && kizaicode > 0)) {
        return Promise.reject("invalid kizaicode");
    }
    if (!(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at))) {
        return Promise.reject("invalid at");
    }
    return request("get_kizai_master", { kizaicode: kizaicode, at: at }, "GET", model.fromJsonToKizaiMaster);
}
exports.getKizaiMaster = getKizaiMaster;
function getFullVisit(visitId) {
    if (!(Number.isInteger(visitId) && visitId > 0)) {
        return Promise.reject("invalid visitId");
    }
    return request("get_full_visit", { visit_id: visitId }, "GET", model.fromJsonToFullVisit);
}
exports.getFullVisit = getFullVisit;
