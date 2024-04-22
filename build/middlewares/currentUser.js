"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")) {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        if (!payload) {
            return next();
        }
        req.currentUser = payload;
    }
    catch (err) {
        throw err;
    }
    next();
});
exports.currentUser = currentUser;
