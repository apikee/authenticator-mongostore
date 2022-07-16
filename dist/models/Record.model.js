"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordModel = exports.RecordSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RecordSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    subject: { type: String, required: true },
}, { collection: "authenticator.mongostore" });
exports.RecordModel = (0, mongoose_1.model)("Record", exports.RecordSchema);
