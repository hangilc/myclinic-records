"use strict";
const V = require("../validation");
class GazouLabel {
    constructor(conductId, label) {
        this.conductId = conductId;
        this.label = label;
    }
}
exports.GazouLabel = GazouLabel;
function validateGazouLabel(gazouLabel) {
    let errs = [];
    V.validate("conductId", gazouLabel.conductId, errs, [
        V.isDefined, V.isInteger, V.isPositive
    ]);
    V.validate("ラベル", gazouLabel.label, errs, [
        V.isDefined, V.isString
    ]);
    return errs;
}
exports.validateGazouLabel = validateGazouLabel;
function fromJsonToGazouLabel(src) {
    let gazouLabel = new GazouLabel(src.visit_conduct_id, src.label);
    let errs = validateGazouLabel(gazouLabel);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [gazouLabel, null];
    }
}
exports.fromJsonToGazouLabel = fromJsonToGazouLabel;
