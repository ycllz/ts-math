"use strict";
var Hello = (function () {
    function Hello() {
        this.myProperty = "string";
    }
    Hello.prototype.myMethod = function (arg1) {
        return arg1 * 2;
    };
    return Hello;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Hello;
//# sourceMappingURL=Hello.js.map