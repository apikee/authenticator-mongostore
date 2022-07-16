import { Store } from "@apikee/authenticator-common";
import { JwtPayload } from "jsonwebtoken";
import { ConnectOptions } from "mongoose";
export declare class MongoStore extends Store {
    private _connectionString;
    private _connectionOptions;
    private _connectionCallback?;
    constructor(_connectionString: string, _connectionOptions?: ConnectOptions, _connectionCallback?: (() => void) | undefined);
    private _connect;
    addToken: (token: string, subject: string, replace?: boolean) => Promise<void>;
    findSubjectByToken: (token: string) => Promise<string>;
    deleteToken: (token: string) => Promise<void>;
    deleteAllTokensForSubject: (subject: string) => Promise<void>;
    clearExpiredTokens: (validateToken: (type: "access" | "refresh", token: string) => JwtPayload | string | null) => Promise<void>;
}
