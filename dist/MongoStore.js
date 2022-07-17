"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoStore = void 0;
const authenticator_common_1 = require("@apikee/authenticator-common");
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
class MongoStore extends authenticator_common_1.Store {
    _connectionString;
    _connectionOptions;
    _connectionCallback;
    constructor(_connectionString, _connectionOptions = {}, _connectionCallback) {
        super();
        this._connectionString = _connectionString;
        this._connectionOptions = _connectionOptions;
        this._connectionCallback = _connectionCallback;
        this._connect();
    }
    _connect = async () => {
        await mongoose_1.default.connect(this._connectionString, this._connectionOptions);
        this._connectionCallback && this._connectionCallback();
    };
    addToken = async (token, subject, replace = false) => {
        try {
            if (replace) {
                await models_1.RecordModel.deleteMany({ subject });
            }
            await models_1.RecordModel.create({ _id: token, subject });
        }
        catch (error) {
            console.log("Cannot addToken", error);
        }
    };
    findSubjectByToken = async (token) => {
        try {
            const record = await models_1.RecordModel.findOne({ _id: token });
            return record?.subject;
        }
        catch (error) {
            console.log("Cannot findSubjectByToken", error);
            return "";
        }
    };
    deleteToken = async (token) => {
        try {
            await models_1.RecordModel.deleteOne({ _id: token });
        }
        catch (error) {
            console.log("Cannot deleteToken", error);
        }
    };
    deleteAllTokensForSubject = async (subject) => {
        try {
            await models_1.RecordModel.deleteMany({ subject });
        }
        catch (error) {
            console.log("Cannot deleteAllTokensForSubject", error);
        }
    };
    clearExpiredTokens = async (validateToken) => {
        try {
            const records = await models_1.RecordModel.find();
            await Promise.all(records.map(async ({ _id: token }) => {
                if (!validateToken("refresh", token)) {
                    await this.deleteToken(token);
                }
            }));
        }
        catch (error) {
            console.log("Cannot clearExpiredTokens", error);
        }
    };
}
exports.MongoStore = MongoStore;
