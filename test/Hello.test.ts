import { expect } from 'chai';
import Hello from '../src/Hello';

describe("Hello tests:", () => {
    describe("myMethod test", () => {
        it("should right", () => {
            let h = new Hello();
            expect(h.myMethod(2)).to.equal(4);
        });

    });
})