"use strict";
const typed_dom_1 = require("./typed-dom");
const records_by_date_1 = require("./records-by-date");
const moment = require("moment");
let main = typed_dom_1.h.div({}, []);
document.body.appendChild(main);
function appRecordsByDate(wrapper) {
    let app = new records_by_date_1.RecordsByDate();
    wrapper.appendChild(app.dom);
    //app.setToday();
    app.set(moment("2016-08-29"));
}
appRecordsByDate(main);
