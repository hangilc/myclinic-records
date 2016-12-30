"use strict";
class Patient {
    constructor(lastName, firstName, lastNameYomi, firstNameYomi) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.lastNameYomi = lastNameYomi;
        this.firstNameYomi = firstNameYomi;
    }
}
exports.Patient = Patient;
function getPatient_(patientId) {
    return new Patient("lastName", "firstName", "lastNameYomi", "firstNameYomi");
}
exports.getPatient_ = getPatient_;
