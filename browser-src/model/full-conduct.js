"use strict";
const V = require("../validation");
const conduct_1 = require("./conduct");
const full_conduct_shinryou_1 = require("./full-conduct-shinryou");
class FullConduct extends conduct_1.Conduct {
    constructor(conductId, visitId, kind, gazouLabel, shinryouList) {
        super(conductId, visitId, kind);
        this.gazouLabel = gazouLabel;
        this.shinryouList = shinryouList;
    }
}
exports.FullConduct = FullConduct;
function validateFullConduct(conduct) {
    let errs = conduct_1.validateConduct(conduct);
    V.validate("画像ラベル", conduct.gazouLabel, errs, [
        V.isDefined, V.isOptionalString
    ]);
    conduct.shinryouList.forEach(s => {
        errs = errs.concat(full_conduct_shinryou_1.validateFullConductShinryou(s));
    });
    return errs;
}
exports.validateFullConduct = validateFullConduct;
function fromJsonToFullConduct(src) {
    let shinryouList = src.shinryou_list.map(s => {
        let [result, err] = full_conduct_shinryou_1.fromJsonToFullConductShinryou(s);
        if (err) {
            return [undefined, err];
        }
        return result;
    });
    let conduct = new FullConduct(src.id, src.visit_id, src.kind, src.gazou_label, shinryouList);
    let errs = validateFullConduct(conduct);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [conduct, null];
    }
}
exports.fromJsonToFullConduct = fromJsonToFullConduct;
