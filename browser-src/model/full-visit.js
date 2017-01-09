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
class FullVisit extends visit_1.Visit {
}
exports.FullVisit = FullVisit;
function opt(src, cvt) {
    if (src === null || src === undefined) {
        return null;
    }
    else {
        return cvt(src);
    }
}
function jsonToFullVisit(src) {
    let visit = new FullVisit();
    visit_1.fillVisitFromJson(visit, src);
    visit.texts = src.texts.map(text_1.jsonToText);
    visit.shahokokuho = opt(src.shahokokuho, shahokokuho_1.jsonToShahokokuho);
    visit.koukikourei = opt(src.koukikourei, koukikourei_1.jsonToKoukikourei);
    visit.roujin = opt(src.roujin, roujin_1.jsonToRoujin);
    visit.kouhiList = src.kouhi_list.map(kouhi_1.jsonToKouhi);
    visit.drugs = src.drugs.map(full_drug_1.jsonToFullDrug);
    visit.shinryouList = src.shinryou_list.map(full_shinryou_1.jsonToFullShinryou);
    visit.conducts = src.conducts.map(full_conduct_1.jsonToFullConduct);
    visit.charge = opt(src.charge, charge_1.jsonToCharge);
    return visit;
}
exports.jsonToFullVisit = jsonToFullVisit;
function hokenRep(visit) {
    let items = [];
    if (visit.shahokokuho !== null) {
        items.push(shahokokuho_1.shahokokuhoRep(visit.shahokokuho));
    }
    if (visit.koukikourei !== null) {
        items.push(koukikourei_1.koukikoureiRep(visit.koukikourei));
    }
    if (visit.roujin !== null) {
        items.push(roujin_1.roujinRep(visit.roujin));
    }
    items = items.concat(visit.kouhiList.map(kouhi_1.kouhiRep));
    return items.length > 0 ? items.join("・") : "保険なし";
}
exports.hokenRep = hokenRep;
/*

export function validateFullVisit(visit: FullVisit): string[] {
    let errs: string[];
    errs = validateVisit(visit);
    visit.texts.forEach(t => {
        errs = errs.concat(validateText(t));
    })
    if( visit.shahokokuho ){
        errs = errs.concat(validateShahokokuho(visit.shahokokuho));
    }
    if( visit.koukikourei ){
        errs = errs.concat(validateKoukikourei(visit.koukikourei));
    }
    if( visit.roujin ){
        errs = errs.concat(validateRoujin(visit.roujin));
    }
    if( visit.kouhiList ){
        visit.kouhiList.forEach(function(kouhi){
            errs = errs.concat(validateKouhi(kouhi));
        })
    }
    visit.drugs.forEach(t => {
        errs = errs.concat(validateFullDrug(t));
    })
    visit.shinryouList.forEach(s => {
        errs = errs.concat(validateFullShinryou(s));
    })
    visit.conducts.forEach(t => {
        errs = errs.concat(validateFullConduct(t));
    })
    if( visit.charge ){
        errs = errs.concat(validateCharge(visit.charge));
    }
    return errs;
}

export function fromJsonToFullVisit(src: any): FullVisit | V.ValidationError {
    let texts: Text[];
    {
        let result = V.mapConvert(src.texts, fromJsonToText);
        if( result instanceof V.ValidationError ){
            return result;
        }
        texts = result;
    }
    let shahokokuho: Shahokokuho | null = null;
    if( src.shahokokuho ){
        let result = fromJsonToShahokokuho(src.shahokokuho);
        if( result instanceof V.ValidationError ){
            return result;
        }
        shahokokuho = result;
    }
    let koukikourei: Koukikourei | null = null;
    if( src.koukikourei ){
        let result = fromJsonToKoukikourei(src.koukikourei);
        if( result instanceof V.ValidationError ){
            return result;
        }
        koukikourei = result;
    }
    let roujin: Roujin | null = null;
    if( src.roujin ){
        let result = fromJsonToRoujin(src.roujin);
        if ( result instanceof V.ValidationError ){
            return result;
        }
        roujin = result;
    }
    let kouhiList: Kouhi[];
    {
        let result = V.mapConvert(src.kouhi_list, fromJsonToKouhi);
        if( result instanceof V.ValidationError ){
            return result;
        }
        kouhiList = result;
    }
    let drugs: FullDrug[];
    {
        let result = V.mapConvert(src.drugs, fromJsonToFullDrug);
        if( result instanceof V.ValidationError ){
            return result;
        }
        drugs = result;
    }
    let shinryouList: FullShinryou[];
    {
        let result = V.mapConvert(src.shinryou_list, fromJsonToFullShinryou);
        if( result instanceof V.ValidationError ){
            return result;
        }
        shinryouList = result;
    }
    let conducts: FullConduct[];
    {
        let result = V.mapConvert(src.conducts, fromJsonToFullConduct);
        if( result instanceof V.ValidationError ){
            return result;
        }
        conducts = result;
    }
    let charge: Charge | null = null;
    if( src.charge ){
        let result = fromJsonToCharge(src.charge);
        if( result instanceof V.ValidationError ){
            return result;
        } else {
            charge = result;
        }
    }
    let visit = new FullVisit(src.visit_id, src.patient_id, src.v_datetime,
        src.shahokokuho_id, src.koukikourei_id, src.roujin_id,
        src.kouhi_1_id, src.kouhi_2_id, src.kouhi_3_id,
        texts, shahokokuho, koukikourei, roujin, kouhiList,
        drugs, shinryouList, conducts, charge);
    let errs = validateFullVisit(visit);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return visit;
    }
}

*/
