"use strict";
var chai_1 = require("chai");
var Vector2D_1 = require("../src/Vector2D");
// some tests are based on glmatrix
describe("Vector2D test", function () {
    var vecA;
    var vecB;
    var out;
    var result;
    var EPSILON;
    beforeEach(function () {
        vecA = new Vector2D_1.Vector2D(1, 2);
        vecB = new Vector2D_1.Vector2D(3, 4);
        out = new Vector2D_1.Vector2D();
        EPSILON = 0.000001;
    });
    // static methods
    describe("Lerp", function () {
        describe("with a separate output vector", function () {
            beforeEach(function () { result = Vector2D_1.Vector2D.Lerp(vecA, vecB, 0.5, out); });
            it("should place values into out", function () { chai_1.expect(out).to.deep.equal(new Vector2D_1.Vector2D(2, 3)); }); // deep equal
            it("should return out", function () { chai_1.expect(result).to.equal(out); }); // same ref
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () { result = Vector2D_1.Vector2D.Lerp(vecA, vecB, 0.5, vecA); });
            it("should place values into vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(2, 3)); });
            it("should return vecA", function () { chai_1.expect(result).to.equal(vecA); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecB is the output vector", function () {
            beforeEach(function () { result = Vector2D_1.Vector2D.Lerp(vecA, vecB, 0.5, vecB); });
            it("should place values into vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(2, 3)); });
            it("should return vecB", function () { chai_1.expect(result).to.equal(vecB); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
        });
        describe("without output vector", function () {
            beforeEach(function () { result = Vector2D_1.Vector2D.Lerp(vecA, vecB, 0.5); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
            it("should return a new vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(2, 3));
            });
        });
    });
    describe("Random", function () {
        describe("without out", function () {
            describe("with no scale", function () {
                beforeEach(function () { result = Vector2D_1.Vector2D.Random(); });
                it("should result in a unit length vector", function () { chai_1.expect(result.length).to.be.closeTo(1.0, EPSILON); });
            });
            describe("with a scale", function () {
                beforeEach(function () { result = Vector2D_1.Vector2D.Random(5.0); });
                it("should result in a 5 length vector", function () { chai_1.expect(result.length).to.be.closeTo(5.0, EPSILON); });
            });
        });
        describe("with out", function () {
            describe("with no scale", function () {
                beforeEach(function () { result = Vector2D_1.Vector2D.Random(1, out); });
                it("should result in a unit length vector", function () { chai_1.expect(out.length).to.be.closeTo(1.0, EPSILON); });
                it("should return out", function () { chai_1.expect(result).to.equal(out); });
            });
            describe("with a scale", function () {
                beforeEach(function () { result = Vector2D_1.Vector2D.Random(5.0, out); });
                it("should result in a 5 length vector", function () { chai_1.expect(out.length).to.be.closeTo(5.0, EPSILON); });
                it("should return out", function () { chai_1.expect(result).to.equal(out); });
            });
        });
    });
    describe("Anglebetween", function () {
        var num;
        describe("with CCW", function () {
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(4, 4);
                vecB = new Vector2D_1.Vector2D(0, 10);
                num = Vector2D_1.Vector2D.AngleBetween(vecA, vecB);
            });
            it("it should return +45 degrees ", function () {
                chai_1.expect(num).to.equal(Math.PI / 4);
            });
        });
        describe("with CW", function () {
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(0, 10);
                vecB = new Vector2D_1.Vector2D(4, 4);
                num = Vector2D_1.Vector2D.AngleBetween(vecA, vecB);
            });
            it("it should return -45 degrees ", function () {
                chai_1.expect(num).to.equal(-Math.PI / 4);
            });
        });
        describe("with CW", function () {
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(4, -4);
                vecB = new Vector2D_1.Vector2D(-100, -100);
                num = Vector2D_1.Vector2D.AngleBetween(vecA, vecB);
            });
            it("it should return -90 degrees ", function () {
                chai_1.expect(num).to.equal(-Math.PI / 2);
            });
        });
    });
    describe("fromPolar", function () {
        it("it should return yaxis", function () {
            chai_1.expect(Vector2D_1.Vector2D.fromPolar(1, 0).x).to.closeTo(new Vector2D_1.Vector2D(1, 0).x, EPSILON);
            chai_1.expect(Vector2D_1.Vector2D.fromPolar(1, 0).y).to.closeTo(new Vector2D_1.Vector2D(1, 0).y, EPSILON);
        });
        it("it should return xaxis", function () {
            chai_1.expect(Vector2D_1.Vector2D.fromPolar(1, Math.PI / 2).x).to.closeTo(new Vector2D_1.Vector2D(0, 1).x, EPSILON);
            chai_1.expect(Vector2D_1.Vector2D.fromPolar(1, Math.PI / 2).y).to.closeTo(new Vector2D_1.Vector2D(0, 1).y, EPSILON);
        });
    });
    // getter
    describe("length", function () {
        beforeEach(function () {
            vecB.length = vecA.length;
        });
        it("should return the length", function () { chai_1.expect(vecA.length).to.closeTo(Math.sqrt(vecA.x * vecA.x + vecA.y * vecA.y), EPSILON); });
        it("should set vecB length equal to vecA", function () { chai_1.expect(vecA.length).to.closeTo(vecB.length, EPSILON); });
    });
    describe("lengthSquared", function () {
        it("should return the squared length", function () { chai_1.expect(vecA.squaredLength).to.equal(5); });
    });
    describe("isZero", function () {
        it("should be true", function () {
            chai_1.expect(new Vector2D_1.Vector2D().isZero).to.be.true;
        });
        it("should be false", function () {
            chai_1.expect(vecA.isZero).to.be.false;
        });
    });
    // public methods
    describe("add", function () {
        describe("with a separate output vector", function () {
            beforeEach(function () {
                result = vecA.add(vecB, out);
            });
            it("should place values into out", function () { chai_1.expect(out).to.deep.equal(new Vector2D_1.Vector2D(4, 6)); });
            it("should return out", function () { chai_1.expect(result).to.equal(out); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () { result = vecA.add(vecB, vecA); });
            it("should place values into vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(4, 6)); });
            it("should return vecA", function () { chai_1.expect(result).to.equal(vecA); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecB is the output vector", function () {
            beforeEach(function () { result = vecA.add(vecB, vecB); });
            it("should place values into vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(4, 6)); });
            it("should return vecB", function () { chai_1.expect(result).to.equal(vecB); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
        });
        describe("without output vector", function () {
            beforeEach(function () { result = vecA.add(vecB); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
            it("should return a new vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(4, 6));
            });
        });
    });
    describe("subtract", function () {
        describe("with a separate output vector", function () {
            beforeEach(function () {
                result = vecA.subtract(vecB, out);
            });
            it("should place values into out", function () { chai_1.expect(out).to.deep.equal(new Vector2D_1.Vector2D(-2, -2)); });
            it("should return out", function () { chai_1.expect(result).to.equal(out); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () { result = vecA.subtract(vecB, vecA); });
            it("should place values into vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(-2, -2)); });
            it("should return vecA", function () { chai_1.expect(result).to.equal(vecA); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecB is the output vector", function () {
            beforeEach(function () { result = vecA.subtract(vecB, vecB); });
            it("should place values into vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(-2, -2)); });
            it("should return vecB", function () { chai_1.expect(result).to.equal(vecB); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
        });
        describe("without output vector", function () {
            beforeEach(function () { result = vecA.subtract(vecB); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
            it("should return a new vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(-2, -2));
            });
        });
    });
    describe("multiply", function () {
        describe("with a separate output vector", function () {
            beforeEach(function () { result = vecA.multiply(vecB, out); });
            it("should place values into out", function () { chai_1.expect(out).to.deep.equal(new Vector2D_1.Vector2D(3, 8)); });
            it("should return out", function () { chai_1.expect(result).to.equal(out); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () { result = vecA.multiply(vecB, vecA); });
            it("should place values into vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(3, 8)); });
            it("should return vecA", function () { chai_1.expect(result).to.equal(vecA); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecB is the output vector", function () {
            beforeEach(function () { result = vecA.multiply(vecB, vecB); });
            it("should place values into vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 8)); });
            it("should return vecB", function () { chai_1.expect(result).to.equal(vecB); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
        });
        describe("without output vector", function () {
            beforeEach(function () { result = vecA.multiply(vecB); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
            it("should return a new vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(3, 8));
            });
        });
    });
    describe("divide", function () {
        describe("with a separate output vector", function () {
            beforeEach(function () { result = vecA.divide(vecB, out); });
            it("should place values into out", function () {
                chai_1.expect(out).to.have.property("x").closeTo(0.3333333, EPSILON);
                chai_1.expect(out).to.have.property("y").closeTo(0.5, EPSILON);
            });
            it("should return out", function () { chai_1.expect(result).to.equal(out); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () { result = vecA.divide(vecB, vecA); });
            it("should place values into vecA", function () {
                chai_1.expect(vecA).to.have.property("x").closeTo(0.3333333, EPSILON);
                chai_1.expect(vecA).to.have.property("y").closeTo(0.5, EPSILON);
            });
            it("should return vecA", function () { chai_1.expect(result).to.equal(vecA); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecB is the output vector", function () {
            beforeEach(function () { result = vecA.divide(vecB, vecB); });
            it("should place values into vecB", function () {
                chai_1.expect(vecB).to.have.property("x").closeTo(0.3333333, EPSILON);
                chai_1.expect(vecB).to.have.property("y").closeTo(0.5, EPSILON);
            });
            it("should return vecB", function () { chai_1.expect(result).to.equal(vecB); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
        });
        describe("without output vector", function () {
            beforeEach(function () { result = vecA.divide(vecB); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
            it("should return a new vector", function () {
                chai_1.expect(result).to.have.property("x").closeTo(0.3333333, EPSILON);
                chai_1.expect(result).to.have.property("y").closeTo(0.5, EPSILON);
            });
        });
    });
    describe("scale", function () {
        describe("with a separate output vector", function () {
            beforeEach(function () {
                result = vecA.scale(2, out);
            });
            it("should place values into out", function () { chai_1.expect(out).to.deep.equal(new Vector2D_1.Vector2D(2, 4)); });
            it("should return out", function () { chai_1.expect(result).to.equal(out); });
            it("should not modify vecA", function () { chai_1.expect(vecA).deep.equal(new Vector2D_1.Vector2D(1, 2)); });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () { result = vecA.scale(2, vecA); });
            it("should place values into vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(2, 4)); });
            it("should return vecA", function () { chai_1.expect(result).to.equal(vecA); });
        });
        describe("without output vector", function () {
            beforeEach(function () { result = vecA.scale(2); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should return a new vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(2, 4));
            });
        });
    });
    describe("scaleAbout", function () {
        describe("with a separate output vector", function () {
            beforeEach(function () {
                result = vecA.scaleAbout(new Vector2D_1.Vector2D(), 2, 2, out);
            });
            it("should place values into out", function () { chai_1.expect(out).to.deep.equal(new Vector2D_1.Vector2D(2, 4)); });
            it("should return out", function () { chai_1.expect(result).to.equal(out); });
            it("should not modify vecA", function () { chai_1.expect(vecA).deep.equal(new Vector2D_1.Vector2D(1, 2)); });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () { result = vecA.scaleAbout(new Vector2D_1.Vector2D(), 2, 2, vecA); });
            it("should place values into vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(2, 4)); });
            it("should return vecA", function () { chai_1.expect(result).to.equal(vecA); });
        });
        describe("without output vector", function () {
            beforeEach(function () { result = vecA.scaleAbout(new Vector2D_1.Vector2D(), 2, 2); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should return a new vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(2, 4));
            });
        });
    });
    describe("scaleAndAdd", function () {
        describe("with a separate output vector", function () {
            beforeEach(function () { result = vecA.scaleAndAdd(vecB, 0.5, out); });
            it("should place values into out", function () {
                chai_1.expect(out).to.deep.equal(new Vector2D_1.Vector2D(2.5, 4));
            });
            it("should return out", function () { chai_1.expect(result).to.equal(out); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () { result = vecA.scaleAndAdd(vecB, 0.5, vecA); });
            it("should place values into vecA", function () {
                chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(2.5, 4));
            });
            it("should return vecA", function () { chai_1.expect(result).to.equal(vecA); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        });
        describe("when vecB is the output vector", function () {
            beforeEach(function () { result = vecA.scaleAndAdd(vecB, 0.5, vecB); });
            it("should place values into vecB", function () {
                chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(2.5, 4));
            });
            it("should return vecB", function () { chai_1.expect(result).to.equal(vecB); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
        });
        describe("without output vector", function () {
            beforeEach(function () { result = vecA.scaleAndAdd(vecB, 0.5); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
            it("should return a new vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(2.5, 4));
            });
        });
    });
    describe("distanceTo", function () {
        var dis;
        beforeEach(function () { dis = vecA.distanceTo(vecB); });
        it("should return the distance", function () { chai_1.expect(dis).to.closeTo(2.828427, EPSILON); });
    });
    describe("squaredDistanceTo", function () {
        var dis;
        beforeEach(function () { dis = vecA.squaredDistanceTo(vecB); });
        it("should return the squared distance", function () { chai_1.expect(dis).to.equal(8); });
    });
    describe("negate", function () {
        var x, y;
        beforeEach(function () {
            x = -vecA.x;
            y = -vecA.y;
            vecA.negate();
        });
        it("should negate x", function () {
            chai_1.expect(vecA.x).to.equal(x);
        });
        it("should negate y", function () {
            chai_1.expect(vecA.y).to.equal(y);
        });
    });
    describe("normalize", function () {
        beforeEach(function () {
            vecA = new Vector2D_1.Vector2D(5, 0);
            vecB = new Vector2D_1.Vector2D(0, 5);
            vecA.normalize();
            vecB.normalize();
        });
        it("should normalize vectorA", function () {
            chai_1.expect(vecA).deep.equal(new Vector2D_1.Vector2D(1, 0));
        });
        it("should normalize vectorB", function () {
            chai_1.expect(vecB).deep.equal(new Vector2D_1.Vector2D(0, 1));
        });
    });
    describe("dot", function () {
        var dotResult;
        beforeEach(function () {
            dotResult = vecA.dot(vecB);
        });
        it("should return the dot product", function () {
            chai_1.expect(dotResult).to.equal(11);
        });
        it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
        it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
    });
    describe("cross", function () {
        var crossResult;
        beforeEach(function () {
            crossResult = vecA.cross(vecB);
        });
        it("should return the cross product", function () {
            chai_1.expect(crossResult).to.equal(vecA.x * vecB.y - vecA.y * vecB.x);
        });
        it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
        it("should not modify vecB", function () { chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4)); });
        it("should < 0 , because vecA on the left size of vecB", function () {
            chai_1.expect(crossResult).to.lessThan(0);
        });
    });
    describe("leftHandNormal", function () {
        describe("with out", function () {
            beforeEach(function () {
                result = vecA.leftHandNormal(out);
            });
            it("should return left normal", function () {
                chai_1.expect(out).deep.equal(new Vector2D_1.Vector2D(-2, 1));
            });
            it("should return out", function () {
                chai_1.expect(result).equal(out);
            });
            it("should not modify vecA", function () {
                chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2));
            });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () {
                result = vecA.leftHandNormal(vecA);
            });
            it("should return left normal", function () {
                chai_1.expect(result).deep.equal(new Vector2D_1.Vector2D(-2, 1));
            });
            it("should return vecA", function () {
                chai_1.expect(result).equal(vecA);
            });
        });
        describe("without out", function () {
            beforeEach(function () {
                result = vecB.leftHandNormal();
            });
            it("should return left normal", function () {
                chai_1.expect(result).deep.equal(new Vector2D_1.Vector2D(-4, 3));
            });
            it("should not modify vecB", function () {
                chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4));
            });
        });
    });
    describe("rightHandNormal", function () {
        describe("with out", function () {
            beforeEach(function () {
                result = vecA.rightHandNormal(out);
            });
            it("should return right normal", function () {
                chai_1.expect(out).deep.equal(new Vector2D_1.Vector2D(2, -1));
            });
            it("should return out", function () {
                chai_1.expect(result).equal(out);
            });
            it("should not modify vecA", function () {
                chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2));
            });
        });
        describe("when vecA is out vector", function () {
            beforeEach(function () {
                result = vecA.rightHandNormal(vecA);
            });
            it("should return right normal", function () {
                chai_1.expect(result).deep.equal(new Vector2D_1.Vector2D(2, -1));
            });
            it("should return vecA", function () {
                chai_1.expect(result).equal(vecA);
            });
        });
        describe("without out", function () {
            beforeEach(function () {
                result = vecB.rightHandNormal();
            });
            it("should return right normal", function () {
                chai_1.expect(result).deep.equal(new Vector2D_1.Vector2D(4, -3));
            });
            it("should not modify vecB", function () {
                chai_1.expect(vecB).to.deep.equal(new Vector2D_1.Vector2D(3, 4));
            });
        });
    });
    describe("fromPolar", function () {
        var result2;
        beforeEach(function () {
            result = vecA.fromPolar(10, Math.PI / 6); // 30 degrees
            result2 = vecB.fromPolar(10, 0);
        });
        it("should return the vector form", function () {
            chai_1.expect(result.x).to.closeTo(10 * Math.cos(Math.PI / 6), EPSILON);
            chai_1.expect(result.y).to.closeTo(10 * Math.sin(Math.PI / 6), EPSILON);
            chai_1.expect(result2.x).to.closeTo(10, EPSILON);
            chai_1.expect(result2.y).to.closeTo(0, EPSILON);
        });
        it("should return vecA", function () {
            chai_1.expect(result).equal(vecA);
        });
    });
    describe("toPolar", function () {
        var polar;
        describe("without out object", function () {
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(8.660254, 5);
                polar = vecA.toPolar();
            });
            it("should return the polar form", function () {
                chai_1.expect(polar).property("len").to.closeTo(10, EPSILON);
                chai_1.expect(polar).property("radians").to.closeTo(Math.PI / 6, EPSILON);
                chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(8.660254, 5));
            });
        });
        describe("with out object", function () {
            var outObj = { len: 0, radians: 0 };
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(8.660254, 5);
                polar = vecA.toPolar(outObj);
            });
            it("should return the polar form", function () {
                chai_1.expect(outObj).property("len").to.closeTo(10, EPSILON);
                chai_1.expect(outObj).property("radians").to.closeTo(Math.PI / 6, EPSILON);
                chai_1.expect(polar).equal(outObj);
            });
        });
    });
    describe("clampMax", function () {
        beforeEach(function () {
            vecA = new Vector2D_1.Vector2D(100, 0);
            vecB = new Vector2D_1.Vector2D(0, 200);
            vecA.clampMax(5);
            vecB.clampMax(300);
        });
        it("should return clamped vector ", function () {
            chai_1.expect(vecA).deep.equal(new Vector2D_1.Vector2D(5, 0));
            chai_1.expect(vecA.length).equal(5);
            chai_1.expect(vecB.length).equal(200);
        });
    });
    describe("rotate", function () {
        describe("with a separate output vector", function () {
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(10, 0);
                result = vecA.rotate(Math.PI / 2, out);
            });
            it("should place values into out", function () {
                chai_1.expect(out).have.property("x").closeTo(0, EPSILON);
                chai_1.expect(out).have.property("y").closeTo(10, EPSILON);
            });
            it("should return out", function () { chai_1.expect(result).to.equal(out); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(10, 0)); });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(10, 0);
                result = vecA.rotate(Math.PI / 2, vecA);
            });
            it("should place values into vecA", function () {
                chai_1.expect(result).have.property("x").closeTo(0, EPSILON);
                chai_1.expect(result).have.property("y").closeTo(10, EPSILON);
            });
            it("should return vecA", function () { chai_1.expect(result).to.equal(vecA); });
        });
        describe("without output vector", function () {
            beforeEach(function () {
                result = vecA.rotate(Math.PI / 2);
            });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should return a new vector", function () {
                chai_1.expect(result).have.property("x").closeTo(new Vector2D_1.Vector2D(1, 2).leftHandNormal().x, EPSILON);
                chai_1.expect(result).have.property("y").closeTo(new Vector2D_1.Vector2D(1, 2).leftHandNormal().y, EPSILON);
            });
        });
    });
    describe("rotateAbout", function () {
        describe("without out vector", function () {
            beforeEach(function () {
                out = vecA.rotateAbout(Math.PI / 3, new Vector2D_1.Vector2D());
            });
            it("should equal to rotate method", function () {
                chai_1.expect(out).deep.equal(new Vector2D_1.Vector2D(1, 2).rotate(Math.PI / 3));
            });
            it("should not modify vecA", function () {
                chai_1.expect(vecA).deep.equal(new Vector2D_1.Vector2D(1, 2));
            });
        });
        describe("with a separate out vector", function () {
            beforeEach(function () {
                result = vecA.rotateAbout(2.5, new Vector2D_1.Vector2D(), out);
            });
            it("should equal to rotate method", function () {
                chai_1.expect(out).deep.equal(new Vector2D_1.Vector2D(1, 2).rotate(2.5));
            });
            it("should not modify vecA", function () {
                chai_1.expect(vecA).deep.equal(new Vector2D_1.Vector2D(1, 2));
            });
            it("should return out", function () {
                chai_1.expect(result).equal(out);
            });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () {
                result = vecA.rotateAbout(2.5, new Vector2D_1.Vector2D(), vecA);
            });
            it("should equal to rotate method", function () {
                chai_1.expect(result).deep.equal(new Vector2D_1.Vector2D(1, 2).rotate(2.5));
            });
            it("should return vecA", function () {
                chai_1.expect(result).equal(vecA);
            });
        });
    });
    describe("rotateByVector", function () {
        describe("with a separate output vector", function () {
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(10, 0);
                result = vecA.rotateByVector(new Vector2D_1.Vector2D(0, 1), out);
            });
            it("should place values into out", function () {
                chai_1.expect(out).have.property("x").closeTo(0, EPSILON);
                chai_1.expect(out).have.property("y").closeTo(10, EPSILON);
            });
            it("should return out", function () { chai_1.expect(result).to.equal(out); });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(10, 0)); });
        });
        describe("when vecA is the output vector", function () {
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(10, 0);
                result = vecA.rotateByVector(new Vector2D_1.Vector2D(0, 1), vecA);
            });
            it("should place values into vecA", function () {
                chai_1.expect(result).have.property("x").closeTo(0, EPSILON);
                chai_1.expect(result).have.property("y").closeTo(10, EPSILON);
            });
            it("should return vecA", function () { chai_1.expect(result).to.equal(vecA); });
        });
        describe("without output vector", function () {
            beforeEach(function () {
                result = vecA.rotateByVector(new Vector2D_1.Vector2D(0, 1));
            });
            it("should not modify vecA", function () { chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2)); });
            it("should return a new vector", function () {
                chai_1.expect(result).have.property("x").closeTo(new Vector2D_1.Vector2D(1, 2).leftHandNormal().x, EPSILON);
                chai_1.expect(result).have.property("y").closeTo(new Vector2D_1.Vector2D(1, 2).leftHandNormal().y, EPSILON);
            });
        });
    });
    describe("getProjV", function () {
        describe("with a separate out vector", function () {
            beforeEach(function () {
                result = vecA.getProjV(new Vector2D_1.Vector2D(100, 0), out);
            });
            it("should return project vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(1, 0));
                chai_1.expect(result).to.equal(out);
                chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2));
            });
        });
        describe("with vecA as out vector", function () {
            beforeEach(function () {
                result = vecA.getProjV(new Vector2D_1.Vector2D(100, 0), vecA);
            });
            it("should return project vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(1, 0));
                chai_1.expect(result).to.equal(vecA);
            });
        });
        describe("without out vector", function () {
            beforeEach(function () {
                result = vecA.getProjV(new Vector2D_1.Vector2D(100, 0));
            });
            it("should return project vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(1, 0));
                chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2));
            });
        });
    });
    describe("getPerpV", function () {
        describe("with a separate out vector", function () {
            beforeEach(function () {
                result = vecA.getPerpV(new Vector2D_1.Vector2D(100, 0), out);
            });
            it("should return project vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(0, 2));
                chai_1.expect(result).to.equal(out);
                chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2));
            });
        });
        describe("with vecA as out vector", function () {
            beforeEach(function () {
                result = vecA.getPerpV(new Vector2D_1.Vector2D(100, 0), vecA);
            });
            it("should return project vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(0, 2));
                chai_1.expect(result).to.equal(vecA);
            });
        });
        describe("without out vector", function () {
            beforeEach(function () {
                result = vecA.getPerpV(new Vector2D_1.Vector2D(100, 0));
            });
            it("should return project vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(0, 2));
                chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, 2));
            });
        });
    });
    describe("getProjV && getPerpV", function () {
        beforeEach(function () {
            result = vecA.getProjV(vecB).add(vecA.getPerpV(vecB, out), out);
        });
        it("should return vecA", function () {
            chai_1.expect(result).to.deep.equal(vecA);
            chai_1.expect(result).to.equal(out);
        });
    });
    describe("reflect", function () {
        describe("with a separate out vector", function () {
            beforeEach(function () {
                result = vecA.reflect(new Vector2D_1.Vector2D(0, 1), out);
            });
            it("should get reflect vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(1, -2));
                chai_1.expect(result).to.equal(out);
            });
        });
        describe("without out vector", function () {
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(1, -2);
                result = vecA.reflect(new Vector2D_1.Vector2D(0, 1));
            });
            it("should get reflect vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(1, 2));
                chai_1.expect(vecA).to.deep.equal(new Vector2D_1.Vector2D(1, -2));
            });
        });
        describe("with vecA as output vector", function () {
            beforeEach(function () {
                vecA = new Vector2D_1.Vector2D(1, -2);
                result = vecA.reflect(new Vector2D_1.Vector2D(0, 1), vecA);
            });
            it("should get reflect vector", function () {
                chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(1, 2));
                chai_1.expect(vecA).to.equal(result);
            });
        });
    });
    describe("copyFrom", function () {
        beforeEach(function () {
            result = vecA.copyFrom(vecB);
        });
        it("should copy values from vecB", function () {
            chai_1.expect(vecA).to.deep.equal(vecB);
        });
        it("should return vecA", function () {
            chai_1.expect(result).to.equal(vecA);
        });
    });
    describe("copyTo", function () {
        beforeEach(function () { vecB.copyTo(out); });
        it("should place values into out", function () {
            chai_1.expect(out).to.deep.equal(vecB);
        });
        it("should not be vecB", function () {
            chai_1.expect(out).to.not.equal(vecB);
        });
    });
    describe("reset", function () {
        it("should reset x y components to the values passed", function () {
            result = vecB.reset(1, 2);
            chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D(1, 2));
        });
        it("should reset x y both to 0", function () {
            result = vecB.reset();
            chai_1.expect(result).to.deep.equal(new Vector2D_1.Vector2D());
        });
    });
    describe("clone", function () {
        it("should return a 2 element array initialized to the values in vecA", function () {
            chai_1.expect(vecA.clone()).to.deep.equal(vecA);
        });
        it("should not return vecA", function () {
            chai_1.expect(vecA.clone()).to.not.equal(vecA);
        });
    });
    describe("toString", function () {
        beforeEach(function () { result = vecA.add(vecB); });
        it("should return a string representation of the vector", function () { chai_1.expect(result.toString()).to.equal("[Vector2D] (x:4 ,y:6)"); });
    });
});
//# sourceMappingURL=Vector2D.test.js.map