"use strict";
const visit_1 = require("./visit");
const text_1 = require("./text");
const shahokokuho_1 = require("./shahokokuho");
const koukikourei_1 = require("./koukikourei");
const roujin_1 = require("./roujin");
const kouhi_1 = require("./kouhi");
const full_drug_1 = require("./full-drug");
const full_shinryou_1 = require("./full-shinryou");
const full_conduct_1 = require("./full-conduct");
const charge_1 = require("./charge");
const V = require("../validation");
class FullVisit extends visit_1.Visit {
    constructor(visitId, patientId, visitedAt, shahokokuhoId, koukikoureiId, roujinId, kouhi1Id, kouhi2Id, kouhi3Id, texts, shahokokuho, koukikourei, roujin, kouhiList, drugs, shinryouList, conducts, charge) {
        super(visitId, patientId, visitedAt, shahokokuhoId, koukikoureiId, roujinId, kouhi1Id, kouhi2Id, kouhi3Id);
        this.texts = texts;
        this.shahokokuho = shahokokuho;
        this.koukikourei = koukikourei;
        this.roujin = roujin;
        this.kouhiList = kouhiList;
        this.drugs = drugs;
        this.shinryouList = shinryouList;
        this.conducts = conducts;
        this.charge = charge;
    }
}
exports.FullVisit = FullVisit;
function validateFullVisit(visit) {
    let errs;
    errs = visit_1.validateVisit(visit);
    visit.texts.forEach(t => {
        errs = errs.concat(text_1.validateText(t));
    });
    if (visit.shahokokuho) {
        errs = errs.concat(shahokokuho_1.validateShahokokuho(visit.shahokokuho));
    }
    if (visit.koukikourei) {
        errs = errs.concat(koukikourei_1.validateKoukikourei(visit.koukikourei));
    }
    if (visit.roujin) {
        errs = errs.concat(roujin_1.validateRoujin(visit.roujin));
    }
    if (visit.kouhiList) {
        visit.kouhiList.forEach(function (kouhi) {
            errs = errs.concat(kouhi_1.validateKouhi(kouhi));
        });
    }
    visit.drugs.forEach(t => {
        errs = errs.concat(full_drug_1.validateFullDrug(t));
    });
    visit.shinryouList.forEach(s => {
        errs = errs.concat(full_shinryou_1.validateFullShinryou(s));
    });
    visit.conducts.forEach(t => {
        errs = errs.concat(full_conduct_1.validateFullConduct(t));
    });
    if (visit.charge) {
        errs = errs.concat(charge_1.validateCharge(visit.charge));
    }
    return errs;
}
exports.validateFullVisit = validateFullVisit;
function fromJsonToFullVisit(src) {
    let texts;
    {
        let result = V.mapConvert(src.texts, text_1.fromJsonToText);
        if (result instanceof V.ValidationError) {
            return result;
        }
        texts = result;
    }
    let shahokokuho = null;
    if (src.shahokokuho) {
        let result = shahokokuho_1.fromJsonToShahokokuho(src.shahokokuho);
        if (result instanceof V.ValidationError) {
            return result;
        }
        shahokokuho = result;
    }
    let koukikourei = null;
    if (src.koukikourei) {
        let result = koukikourei_1.fromJsonToKoukikourei(src.koukikourei);
        if (result instanceof V.ValidationError) {
            return result;
        }
        koukikourei = result;
    }
    let roujin = null;
    if (src.roujin) {
        let result = roujin_1.fromJsonToRoujin(src.roujin);
        if (result instanceof V.ValidationError) {
            return result;
        }
        roujin = result;
    }
    let kouhiList;
    {
        let result = V.mapConvert(src.kouhi_list, kouhi_1.fromJsonToKouhi);
        if (result instanceof V.ValidationError) {
            return result;
        }
        kouhiList = result;
    }
    let drugs;
    {
        let result = V.mapConvert(src.drugs, full_drug_1.fromJsonToFullDrug);
        if (result instanceof V.ValidationError) {
            return result;
        }
        drugs = result;
    }
    let shinryouList;
    {
        let result = V.mapConvert(src.shinryou_list, full_shinryou_1.fromJsonToFullShinryou);
        if (result instanceof V.ValidationError) {
            return result;
        }
        shinryouList = result;
    }
    let conducts;
    {
        let result = V.mapConvert(src.conducts, full_conduct_1.fromJsonToFullConduct);
        if (result instanceof V.ValidationError) {
            return result;
        }
        conducts = result;
    }
    let charge = null;
    if (src.charge) {
        let result = charge_1.fromJsonToCharge(src.charge);
        if (result instanceof V.ValidationError) {
            return result;
        }
        else {
            charge = result;
        }
    }
    let visit = new FullVisit(src.visit_id, src.patient_id, src.v_datetime, src.shahokokuho_id, src.koukikourei_id, src.roujin_id, src.kouhi_1_id, src.kouhi_2_id, src.kouhi_3_id, texts, shahokokuho, koukikourei, roujin, kouhiList, drugs, shinryouList, conducts, charge);
    let errs = validateFullVisit(visit);
    if (errs.length > 0) {
        return new V.ValidationError(errs);
    }
    else {
        return visit;
    }
}
exports.fromJsonToFullVisit = fromJsonToFullVisit;
