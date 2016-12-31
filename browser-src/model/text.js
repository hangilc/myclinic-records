"use strict";
const V = require("../validation");
class Text {
    constructor(textId, visitId, content) {
        this.textId = textId;
        this.visitId = visitId;
        this.content = content;
    }
}
exports.Text = Text;
function validateText(text, checkTextId = true) {
    let errs = [];
    if (checkTextId) {
        V.validate("textId", text.textId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("visitId", text.visitId, errs, [
        V.isInteger, V.isPositive
    ]);
    V.validate("content", text.content, errs, [V.isString]);
    return errs;
}
exports.validateText = validateText;
function fromJsonToText(src) {
    let text = new Text(src.text_id, src.visit_id, src.content);
    let errs = validateText(text, true);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [text, null];
    }
}
exports.fromJsonToText = fromJsonToText;
