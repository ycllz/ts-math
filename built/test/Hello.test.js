"use strict";
var chai_1 = require("chai");
var Hello_1 = require("../src/Hello");
describe("Hello tests:", function () {
    describe("myMethod test", function () {
        it("should right", function () {
            var h = new Hello_1.default();
            chai_1.expect(h.myMethod(2)).to.equal(4);
        });
    });
});
//# sourceMappingURL=Hello.test.js.map