"use strict";
const typed_dom_1 = require("./typed-dom");
const records_by_date_1 = require("./records-by-date");
const records_by_patient_1 = require("./records-by-patient");
const records_search_patient_1 = require("./records-search-patient");
const moment = require("moment");
let main = typed_dom_1.h.div({}, []);
document.body.appendChild(main);
function appRecordsByDate(wrapper) {
    let app = new records_by_date_1.RecordsByDate();
    app.setOnGotoPatientRecords(patientId => {
        appPatientRecords(wrapper, patientId);
    });
    app.setOnSearchRecords(() => {
        appSearchRecords(wrapper);
    });
    wrapper.innerHTML = "";
    let tmpDom = typed_dom_1.h.div({}, [app.dom]);
    wrapper.appendChild(tmpDom);
    app.set(moment("2016-08-29"));
    //app.setToday();
}
function appPatientRecords(wrapper, patientId) {
    let app = new records_by_patient_1.RecordsByPatient(patientId);
    app.setOnGotoRecordsByDate(() => {
        appRecordsByDate(wrapper);
    });
    wrapper.innerHTML = "";
    let tmpDom = typed_dom_1.h.div({}, [app.dom]);
    wrapper.appendChild(tmpDom);
}
function appSearchRecords(wrapper) {
    let app = new records_search_patient_1.RecordsSearchPatient();
    app.setOnSelect(patientId => {
        appPatientRecords(wrapper, patientId);
    });
    app.setOnGotoRecordsByDate(() => {
        appRecordsByDate(wrapper);
    });
    wrapper.innerHTML = "";
    let tmpDom = typed_dom_1.h.div({}, [app.dom]);
    wrapper.appendChild(tmpDom);
}
appRecordsByDate(main);
