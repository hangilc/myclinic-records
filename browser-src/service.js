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
function arrayConverter(c) {
    return function (src) {
        return src.map(c);
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
                try {
                    let obj = cvtor(result);
                    resolve(obj);
                }
                catch (ex) {
                    reject(ex);
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
    return request("get_patient", { patient_id: patientId }, "GET", model.jsonToPatient);
}
exports.getPatient = getPatient;
function listVisitsByDate(at) {
    if (!(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at))) {
        return Promise.reject("invalid at");
    }
    return request("list_visits_by_date", { at: at }, "GET", arrayConverter(model.jsonToVisit));
}
exports.listVisitsByDate = listVisitsByDate;
function getText(textId) {
    if (!(Number.isInteger(textId) && textId > 0)) {
        return Promise.reject("invalid textId");
    }
    return request("get_text", { text_id: textId }, "GET", model.jsonToText);
}
exports.getText = getText;
function getShahokokuho(shahokokuhoId) {
    if (!(Number.isInteger(shahokokuhoId) && shahokokuhoId > 0)) {
        return Promise.reject("invalid shahokokuhoId");
    }
    return request("get_shahokokuho", { shahokokuho_id: shahokokuhoId }, "GET", model.jsonToShahokokuho);
}
exports.getShahokokuho = getShahokokuho;
function getKoukikourei(koukikoureiId) {
    if (!(Number.isInteger(koukikoureiId) && koukikoureiId > 0)) {
        return Promise.reject("invalid koukikoureiId");
    }
    return request("get_koukikourei", { koukikourei_id: koukikoureiId }, "GET", model.jsonToKoukikourei);
}
exports.getKoukikourei = getKoukikourei;
function getRoujin(roujinId) {
    if (!(Number.isInteger(roujinId) && roujinId > 0)) {
        return Promise.reject("invalid roujinId");
    }
    return request("get_roujin", { roujin_id: roujinId }, "GET", model.jsonToRoujin);
}
exports.getRoujin = getRoujin;
function getKouhi(kouhiId) {
    if (!(Number.isInteger(kouhiId) && kouhiId > 0)) {
        return Promise.reject("invalid kouhiId");
    }
    return request("get_kouhi", { kouhi_id: kouhiId }, "GET", model.jsonToKouhi);
}
exports.getKouhi = getKouhi;
function getDrug(drugId) {
    if (!(Number.isInteger(drugId) && drugId > 0)) {
        return Promise.reject("invalid drugId");
    }
    return request("get_drug", { drug_id: drugId }, "GET", model.jsonToDrug);
}
exports.getDrug = getDrug;
function getShinryou(shinryouId) {
    if (!(Number.isInteger(shinryouId) && shinryouId > 0)) {
        return Promise.reject("invalid shinryouId");
    }
    return request("get_shinryou", { shinryou_id: shinryouId }, "GET", model.jsonToShinryou);
}
exports.getShinryou = getShinryou;
function getConduct(conductId) {
    if (!(Number.isInteger(conductId) && conductId > 0)) {
        return Promise.reject("invalid conductId");
    }
    return request("get_conduct", { conduct_id: conductId }, "GET", model.jsonToConduct);
}
exports.getConduct = getConduct;
function getGazouLabel(conductId) {
    if (!(Number.isInteger(conductId) && conductId > 0)) {
        return Promise.reject("invalid conductId");
    }
    return request("get_gazou_label", { conduct_id: conductId }, "GET", model.jsonToGazouLabel);
}
exports.getGazouLabel = getGazouLabel;
function getConductDrug(conductDrugId) {
    if (!(Number.isInteger(conductDrugId) && conductDrugId > 0)) {
        return Promise.reject("invalid conductDrugId");
    }
    return request("get_conduct_drug", { conduct_drug_id: conductDrugId }, "GET", model.jsonToConductDrug);
}
exports.getConductDrug = getConductDrug;
function getConductShinryou(conductShinryouId) {
    if (!(Number.isInteger(conductShinryouId) && conductShinryouId > 0)) {
        return Promise.reject("invalid conductShinryouId");
    }
    return request("get_conduct_shinryou", { conduct_shinryou_id: conductShinryouId }, "GET", model.jsonToConductShinryou);
}
exports.getConductShinryou = getConductShinryou;
function getConductKizai(conductKizaiId) {
    if (!(Number.isInteger(conductKizaiId) && conductKizaiId > 0)) {
        return Promise.reject("invalid conductKizaiId");
    }
    return request("get_conduct_kizai", { conduct_kizai_id: conductKizaiId }, "GET", model.jsonToConductKizai);
}
exports.getConductKizai = getConductKizai;
function getCharge(visitId) {
    if (!(Number.isInteger(visitId) && visitId > 0)) {
        return Promise.reject("invalid visitId");
    }
    return request("get_charge", { visit_id: visitId }, "GET", model.jsonToCharge);
}
exports.getCharge = getCharge;
function getIyakuhinMaster(iyakuhincode, at) {
    if (!(Number.isInteger(iyakuhincode) && iyakuhincode > 0)) {
        return Promise.reject("invalid iyakuhincode");
    }
    if (!(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at))) {
        return Promise.reject("invalid at");
    }
    return request("get_iyakuhin_master", { iyakuhincode: iyakuhincode, at: at }, "GET", model.jsonToIyakuhinMaster);
}
exports.getIyakuhinMaster = getIyakuhinMaster;
function getShinryouMaster(shinryoucode, at) {
    if (!(Number.isInteger(shinryoucode) && shinryoucode > 0)) {
        return Promise.reject("invalid shinryoucode");
    }
    if (!(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at))) {
        return Promise.reject("invalid at");
    }
    return request("get_shinryou_master", { shinryoucode: shinryoucode, at: at }, "GET", model.jsonToShinryouMaster);
}
exports.getShinryouMaster = getShinryouMaster;
function getKizaiMaster(kizaicode, at) {
    if (!(Number.isInteger(kizaicode) && kizaicode > 0)) {
        return Promise.reject("invalid kizaicode");
    }
    if (!(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at))) {
        return Promise.reject("invalid at");
    }
    return request("get_kizai_master", { kizaicode: kizaicode, at: at }, "GET", model.jsonToKizaiMaster);
}
exports.getKizaiMaster = getKizaiMaster;
function getFullVisit(visitId) {
    if (!(Number.isInteger(visitId) && visitId > 0)) {
        return Promise.reject("invalid visitId");
    }
    return request("get_full_visit", { visit_id: visitId }, "GET", model.jsonToFullVisit);
}
exports.getFullVisit = getFullVisit;
function calcVisits(patientId) {
    if (!(Number.isInteger(patientId) && patientId > 0)) {
        return Promise.reject("invalid patientId");
    }
    return request("calc_visits", { patient_id: patientId }, "GET", (src) => +src);
}
exports.calcVisits = calcVisits;
function listVisits(patientId, offset, n) {
    if (!(Number.isInteger(patientId) && patientId > 0)) {
        return Promise.reject("invalid patientId");
    }
    if (!(offset >= 0)) {
        return Promise.reject("invalid offset");
    }
    if (!(n >= 0)) {
        return Promise.reject("invaid n");
    }
    return request("list_visits", { patient_id: patientId, offset: offset, n: n }, "GET", arrayConverter(model.jsonToVisit));
}
exports.listVisits = listVisits;
