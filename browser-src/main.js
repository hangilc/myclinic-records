"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const $ = require("jquery");
const moment = require("moment");
const kanjidate = require("kanjidate");
let dateInputForm = $("#date-input-form");
function setDate(m) {
    let month = m.month() + 1;
    let day = m.date();
    let g = kanjidate.toGengou(m.year(), month, day);
    let form = dateInputForm;
    $("input[name=nen]", form).val(g.nen);
    $("input[name=month]", form).val(month);
    $("input[name=day]", form).val(day);
}
function getDate() {
    let gengou = "平成";
    let form = dateInputForm;
    let nen = +$("input[name=nen]", form).val();
    let month = +$("input[name=month]", form).val();
    let day = +$("input[name=day]", form).val();
    let year = kanjidate.fromGengou(gengou, nen);
    let m = moment({ year: year, month: month - 1, date: day });
    if (m.isValid()) {
        return m;
    }
    else {
        return undefined;
    }
}
setDate(moment());
$("form#date-input-form .goto-today").click(function (event) {
    event.preventDefault();
    setDate(moment());
});
$("form#date-input-form").submit(function (event) {
    let m = getDate();
    if (!m) {
        alert("日付の入力が不適切です。");
        return;
    }
    console.log(m.format("YYYY-MM-DD"));
});
class UnRegisteredPatient {
    constructor(theLastName, theFirstName, theLastNameYomi, theFirstNameYomi, theBirthday, theSex, thePhone, theAddress) {
        if (theLastName === "") {
            throw new Error("姓が不適切です。");
        }
        if (theFirstName === "") {
            throw new Error("名が不適切です。");
        }
        if (theLastNameYomi === "") {
            throw new Error("姓のよみが不適切です。");
        }
        if (theFirstNameYomi === "") {
            throw new Error("名のよみが不適切です。");
        }
        if (/^\d{4}-\d{2}-\d{2}$/.test(theBirthday)) {
            if (theBirthday !== "0000-00-00") {
                let m = moment(theBirthday);
                if (!m.isValid()) {
                    throw new Error("生年月日が不適切です。");
                }
            }
        }
        else {
            throw new Error("生年月日が不適切です。");
        }
        if (!(theSex === "M" || theSex === "F")) {
            throw new Error("性が不適切です。");
        }
        this.lastName = theLastName;
        this.firstName = theFirstName;
        this.lastNameYomi = theLastNameYomi;
        this.firstNameYomi = theFirstNameYomi;
        this.birthday = theBirthday;
        this.sex = theSex;
        this.phone = thePhone;
        this.address = theAddress;
    }
}
class Patient extends UnRegisteredPatient {
    constructor(thePatientId, theLastName, theFirstName, theLastNameYomi, theFirstNameYomi, theBirthday, theSex, thePhone, theAddress) {
        super(theLastName, theFirstName, theLastNameYomi, theFirstNameYomi, theBirthday, theSex, thePhone, theAddress);
        if (!(thePatientId > 0)) {
            throw new Error("患者番号が不適切です。");
        }
        this.patientId = thePatientId;
    }
}
function fromObjectToPatient(obj) {
    let patientId = obj.patient_id;
    let lastName = obj.last_name;
    let firstName = obj.first_name;
    let lastNameYomi = obj.last_name_yomi;
    let firstNameYomi = obj.first_name_yomi;
    let birthday = obj.birth_day;
    let sex = obj.sex;
    let phone = obj.phone;
    let address = obj.address;
    if (typeof patientId !== "number") {
        throw new Error("患者番号が不適切です。");
    }
    if (typeof lastName !== "string") {
        throw new Error("姓が不適切です。");
    }
    if (typeof firstName !== "string") {
        throw new Error("名が不適切です。");
    }
    if (typeof lastNameYomi !== "string") {
        throw new Error("姓のよみが不適切です。");
    }
    if (typeof firstNameYomi !== "string") {
        throw new Error("名のよみが不適切です。");
    }
    if (typeof birthday !== "string") {
        throw new Error("生年月日が不適切です。");
    }
    if (typeof phone !== "string") {
        throw new Error("電話番号が不適切です。");
    }
    if (typeof address !== "string") {
        throw new Error("住所が不適切です。");
    }
    return new Patient(patientId, lastName, firstName, lastNameYomi, firstNameYomi, birthday, sex, phone, address);
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
                let ret = cvtor(result);
                try {
                    resolve(ret);
                }
                catch (err) {
                    reject(err);
                }
            },
            error: function (xhr, status, ex) {
                reject({
                    status: status,
                    text: xhr.responseText,
                    ex: ex
                });
            }
        });
    });
}
function getPatient(patientId) {
    return request("get_patient", { patient_id: patientId }, "GET", fromObjectToPatient);
}
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let patient1 = yield getPatient(199);
        let patient2 = yield getPatient(patient1.patientId + 1);
        console.log(patient1);
        console.log(patient2);
    });
}
test();
