"use strict";
const visit_1 = require("./visit");
const text_1 = require("./text");
const shahokokuho_1 = require("./shahokokuho");
const koukikourei_1 = require("./koukikourei");
const roujin_1 = require("./roujin");
const kouhi_1 = require("./kouhi");
const drug_1 = require("./drug");
const shinryou_1 = require("./shinryou");
const conduct_1 = require("./conduct");
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
        errs = errs.concat(drug_1.validateDrug(t));
    });
    visit.shinryouList.forEach(s => {
        errs = errs.concat(shinryou_1.validateShinryou(s));
    });
    visit.conducts.forEach(t => {
        errs = errs.concat(conduct_1.validateConduct(t));
    });
    if (visit.charge) {
        errs = errs.concat(charge_1.validateCharge(visit.charge));
    }
    return errs;
}
exports.validateFullVisit = validateFullVisit;
function fromJsonToFullVisit(src) {
    let texts = src.texts.map(s => {
        let [result, err] = text_1.fromJsonToText(s);
        if (err) {
            return [undefined, err];
        }
        return result;
    });
    let shahokokuho = null;
    if (src.shahokokuho) {
        let [result, err] = shahokokuho_1.fromJsonToShahokokuho(src.shahokokuho);
        if (err) {
            return [undefined, err];
        }
        shahokokuho = result;
    }
    let koukikourei = null;
    if (src.koukikourei) {
        let [result, err] = koukikourei_1.fromJsonToKoukikourei(src.koukikourei);
        if (err) {
            return [undefined, err];
        }
        koukikourei = result;
    }
    let roujin = null;
    if (src.roujin) {
        let [result, err] = roujin_1.fromJsonToRoujin(src.roujin);
        if (err) {
            return [undefined, err];
        }
        roujin = result;
    }
    let kouhiList = [];
    if (src.kouhi_list) {
        kouhiList = src.kouhi_list.map(function (srcKouhi) {
            let [kouhi, err] = kouhi_1.fromJsonToKouhi(srcKouhi);
            if (err) {
                return [undefined, err];
            }
            return kouhi;
        });
    }
    let drugs = src.drugs.map(s => {
        let [result, err] = drug_1.fromJsonToDrug(s);
        if (err) {
            return [undefined, err];
        }
        return result;
    });
    let shinryouList = src.shinryou_list.map(s => {
        let [result, err] = shinryou_1.fromJsonToShinryou(s);
        if (err) {
            return [undefined, err];
        }
        return result;
    });
    let conducts = src.conducts.map(s => {
        let [result, err] = conduct_1.fromJsonToConduct(s);
        if (err) {
            return [undefined, err];
        }
        return result;
    });
    let charge = null;
    if (src.charge) {
        let [result, err] = charge_1.fromJsonToCharge(src.charge);
        if (err) {
            return [undefined, err];
        }
        charge = result;
    }
    let visit = new FullVisit(src.visit_id, src.patient_id, src.v_datetime, src.shahokokuho_id, src.koukikourei_id, src.roujin_id, src.kouhi_1_id, src.kouhi_2_id, src.kouhi_3_id, texts, shahokokuho, koukikourei, roujin, kouhiList, drugs, shinryouList, conducts, charge);
    let errs = validateFullVisit(visit);
    console.log(src);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [visit, null];
    }
}
exports.fromJsonToFullVisit = fromJsonToFullVisit;
