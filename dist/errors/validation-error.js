import { CustomError } from "./custom-error.js";
export class RequestValidationError extends CustomError {
    errors;
    statusCode = 400;
    constructor(errors) {
        super();
        this.errors = errors;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeError() {
        return this.errors.map((err) => {
            if (err.type === "field") {
                return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
        });
    }
}
