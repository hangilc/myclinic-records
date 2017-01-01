"use strict";
const V = require("../validation");
const conduct_kizai_1 = require("./conduct-kizai");
const kizai_master_1 = require("./kizai-master");
class FullConductKizai extends conduct_kizai_1.ConductKizai {
    constructor(conductKizaiId, conductId, kizaicode, amount, name, yomi, unit, kingaku, validFrom, validUpto) {
        super(conductKizaiId, conductId, kizaicode, amount);
        this.name = name;
        this.yomi = yomi;
        this.unit = unit;
        this.kingaku = kingaku;
        this.validFrom = validFrom;
        this.validUpto = validUpto;
    }
}
exports.FullConductKizai = FullConductKizai;
function validateFullConductKizai(kizai) {
    let errs = conduct_kizai_1.validateConductKizai(kizai);
    if (errs.length > 0) {
        return errs;
    }
    errs = errs.concat(kizai_master_1.validateKizaiMaster(kizai));
    return errs;
}
exports.validateFullConductKizai = validateFullConductKizai;
function fromJsonToFullConductKizai(src) {
    let kizai = new FullConductKizai(src.id, src.visit_conduct_id, src.kizaicode, src.amount, src.name, src.yomi, src.unit, +src.kingaku, src.valid_from, src.valid_upto);
    let errs = validateFullConductKizai(kizai);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [kizai, null];
    }
}
exports.fromJsonToFullConductKizai = fromJsonToFullConductKizai;
