"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const CustomError_1 = require("./CustomError");
class NotFoundError extends CustomError_1.CustomError {
    constructor() {
        super("Route Not Found");
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: "Route Not Found" }];
    }
}
exports.NotFoundError = NotFoundError;
