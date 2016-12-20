import { expect } from 'chai';

import { Vector2D } from '../src/Vector2D';

// some tests are based on glmatrix
describe("Vector2D test", () => {

    let vecA: Vector2D;
    let vecB: Vector2D;
    let out: Vector2D;
    let result: Vector2D;
    let EPSILON: number;

    beforeEach(() => {
        vecA = new Vector2D(1, 2);
        vecB = new Vector2D(3, 4);
        out = new Vector2D();
        EPSILON = 0.000001;
    });

    // static methods

    describe("Lerp", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => { result = Vector2D.Lerp(vecA, vecB, 0.5, out); });

            it("should place values into out", () => { expect(out).to.deep.equal(new Vector2D(2, 3)); }); // deep equal
            it("should return out", () => { expect(result).to.equal(out); }); // same ref
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => { result = Vector2D.Lerp(vecA, vecB, 0.5, vecA); });

            it("should place values into vecA", () => { expect(vecA).to.deep.equal(new Vector2D(2, 3)); });
            it("should return vecA", () => { expect(result).to.equal(vecA); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        });

        describe("when vecB is the output vector", () => {
            beforeEach(() => { result = Vector2D.Lerp(vecA, vecB, 0.5, vecB); });

            it("should place values into vecB", () => { expect(vecB).to.deep.equal(new Vector2D(2, 3)); });
            it("should return vecB", () => { expect(result).to.equal(vecB); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
        });
        describe("without output vector", () => {
            beforeEach(() => { result = Vector2D.Lerp(vecA, vecB, 0.5); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
            it("should return a new vector", () => {
                expect(result).to.deep.equal(new Vector2D(2, 3));
            });
        });
    });

    describe("Random", () => {
        describe("without out", () => {
            describe("with no scale", () => {
                beforeEach(() => { result = Vector2D.Random(); });
                it("should result in a unit length vector", () => { expect(result.length).to.be.closeTo(1.0, EPSILON); });
            });

            describe("with a scale", () => {
                beforeEach(() => { result = Vector2D.Random(5.0); });
                it("should result in a 5 length vector", () => { expect(result.length).to.be.closeTo(5.0, EPSILON); });
            });
        });

        describe("with out", () => {
            describe("with no scale", () => {
                beforeEach(() => { result = Vector2D.Random(1, out); });

                it("should result in a unit length vector", () => { expect(out.length).to.be.closeTo(1.0, EPSILON); });
                it("should return out", () => { expect(result).to.equal(out); });
            });

            describe("with a scale", () => {
                beforeEach(() => { result = Vector2D.Random(5.0, out); });

                it("should result in a 5 length vector", () => { expect(out.length).to.be.closeTo(5.0, EPSILON); });
                it("should return out", () => { expect(result).to.equal(out); });
            });
        });

    });


    describe("Anglebetween", () => {
        let num: number;
        describe("with CCW", () => {
            beforeEach(() => {
                vecA = new Vector2D(4, 4);
                vecB = new Vector2D(0, 10);
                num = Vector2D.AngleBetween(vecA, vecB);
            });
            it("it should return +45 degrees ", () => {
                expect(num).to.equal(Math.PI / 4);
            });
        });

        describe("with CW", () => {
            beforeEach(() => {
                vecA = new Vector2D(0, 10);
                vecB = new Vector2D(4, 4);
                num = Vector2D.AngleBetween(vecA, vecB);
            });
            it("it should return -45 degrees ", () => {
                expect(num).to.equal(-Math.PI / 4);
            });
        });


        describe("with CW", () => {
            beforeEach(() => {
                vecA = new Vector2D(4, -4);
                vecB = new Vector2D(-100, -100);
                num = Vector2D.AngleBetween(vecA, vecB);
            });
            it("it should return -90 degrees ", () => {
                expect(num).to.equal(- Math.PI / 2);
            });
        });

    });

    describe("fromPolar", () => {
        it("it should return yaxis", () => {
            expect(Vector2D.fromPolar(1, 0).x).to.closeTo(new Vector2D(1, 0).x, EPSILON);
            expect(Vector2D.fromPolar(1, 0).y).to.closeTo(new Vector2D(1, 0).y, EPSILON);

        })
        it("it should return xaxis", () => {
            expect(Vector2D.fromPolar(1, Math.PI / 2).x).to.closeTo(new Vector2D(0, 1).x, EPSILON);
            expect(Vector2D.fromPolar(1, Math.PI / 2).y).to.closeTo(new Vector2D(0, 1).y, EPSILON);
        })
    })


    // getter

    describe("length", () => {

        beforeEach(() => {
            vecB.length = vecA.length;
        });

        it("should return the length", () => { expect(vecA.length).to.closeTo(Math.sqrt(vecA.x * vecA.x + vecA.y * vecA.y), EPSILON); });
        it("should set vecB length equal to vecA", () => { expect(vecA.length).to.closeTo(vecB.length, EPSILON); });
    });

    describe("lengthSquared", () => {
        it("should return the squared length", () => { expect(vecA.squaredLength).to.equal(5); });
    });

    describe("isZero", () => {
        it("should be true", () => {
            expect(new Vector2D().isZero).to.be.true;
        });
        it("should be false", () => {
            expect(vecA.isZero).to.be.false;
        });
    });

    // public methods

    describe("add", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vecA.add(vecB, out);
            });

            it("should place values into out", () => { expect(out).to.deep.equal(new Vector2D(4, 6)); });
            it("should return out", () => { expect(result).to.equal(out); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });

        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => { result = vecA.add(vecB, vecA); });

            it("should place values into vecA", () => { expect(vecA).to.deep.equal(new Vector2D(4, 6)); });
            it("should return vecA", () => { expect(result).to.equal(vecA); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        });

        describe("when vecB is the output vector", () => {
            beforeEach(() => { result = vecA.add(vecB, vecB); });

            it("should place values into vecB", () => { expect(vecB).to.deep.equal(new Vector2D(4, 6)); });
            it("should return vecB", () => { expect(result).to.equal(vecB); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
        });

        describe("without output vector", () => {
            beforeEach(() => { result = vecA.add(vecB); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
            it("should return a new vector", () => {
                expect(result).to.deep.equal(new Vector2D(4, 6));
            });
        });


    });

    describe("subtract", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vecA.subtract(vecB, out);
            });

            it("should place values into out", () => { expect(out).to.deep.equal(new Vector2D(-2, -2)); });
            it("should return out", () => { expect(result).to.equal(out); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });

        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => { result = vecA.subtract(vecB, vecA); });

            it("should place values into vecA", () => { expect(vecA).to.deep.equal(new Vector2D(-2, -2)); });
            it("should return vecA", () => { expect(result).to.equal(vecA); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        });

        describe("when vecB is the output vector", () => {
            beforeEach(() => { result = vecA.subtract(vecB, vecB); });

            it("should place values into vecB", () => { expect(vecB).to.deep.equal(new Vector2D(-2, -2)); });
            it("should return vecB", () => { expect(result).to.equal(vecB); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
        });

        describe("without output vector", () => {
            beforeEach(() => { result = vecA.subtract(vecB); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
            it("should return a new vector", () => {
                expect(result).to.deep.equal(new Vector2D(-2, -2));
            });
        });
    });

    describe("multiply", () => {

        describe("with a separate output vector", () => {
            beforeEach(() => { result = vecA.multiply(vecB, out); });

            it("should place values into out", () => { expect(out).to.deep.equal(new Vector2D(3, 8)); });
            it("should return out", () => { expect(result).to.equal(out); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => { result = vecA.multiply(vecB, vecA); });

            it("should place values into vecA", () => { expect(vecA).to.deep.equal(new Vector2D(3, 8)); });
            it("should return vecA", () => { expect(result).to.equal(vecA); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        });

        describe("when vecB is the output vector", () => {
            beforeEach(() => { result = vecA.multiply(vecB, vecB); });

            it("should place values into vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 8)); });
            it("should return vecB", () => { expect(result).to.equal(vecB); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
        });

        describe("without output vector", () => {
            beforeEach(() => { result = vecA.multiply(vecB); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
            it("should return a new vector", () => {
                expect(result).to.deep.equal(new Vector2D(3, 8));
            });
        });
    });

    describe("divide", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => { result = vecA.divide(vecB, out); });

            it("should place values into out", () => {
                expect(out).to.have.property("x").closeTo(0.3333333, EPSILON);
                expect(out).to.have.property("y").closeTo(0.5, EPSILON);
            });
            it("should return out", () => { expect(result).to.equal(out); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => { result = vecA.divide(vecB, vecA); });

            it("should place values into vecA", () => {
                expect(vecA).to.have.property("x").closeTo(0.3333333, EPSILON);
                expect(vecA).to.have.property("y").closeTo(0.5, EPSILON);
            });
            it("should return vecA", () => { expect(result).to.equal(vecA); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        });

        describe("when vecB is the output vector", () => {
            beforeEach(() => { result = vecA.divide(vecB, vecB); });

            it("should place values into vecB", () => {
                expect(vecB).to.have.property("x").closeTo(0.3333333, EPSILON);
                expect(vecB).to.have.property("y").closeTo(0.5, EPSILON);
            });
            it("should return vecB", () => { expect(result).to.equal(vecB); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
        });

        describe("without output vector", () => {
            beforeEach(() => { result = vecA.divide(vecB); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
            it("should return a new vector", () => {
                expect(result).to.have.property("x").closeTo(0.3333333, EPSILON);
                expect(result).to.have.property("y").closeTo(0.5, EPSILON);
            });
        });
    });

    describe("scale", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vecA.scale(2, out);
            });

            it("should place values into out", () => { expect(out).to.deep.equal(new Vector2D(2, 4)); });
            it("should return out", () => { expect(result).to.equal(out); });
            it("should not modify vecA", () => { expect(vecA).deep.equal(new Vector2D(1, 2)); });
        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => { result = vecA.scale(2, vecA); });

            it("should place values into vecA", () => { expect(vecA).to.deep.equal(new Vector2D(2, 4)); });
            it("should return vecA", () => { expect(result).to.equal(vecA); });
        });

        describe("without output vector", () => {
            beforeEach(() => { result = vecA.scale(2); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should return a new vector", () => {
                expect(result).to.deep.equal(new Vector2D(2, 4));
            });
        });

    });

    describe("scaleAbout", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vecA.scaleAbout(new Vector2D(), 2, 2, out);
            });

            it("should place values into out", () => { expect(out).to.deep.equal(new Vector2D(2, 4)); });
            it("should return out", () => { expect(result).to.equal(out); });
            it("should not modify vecA", () => { expect(vecA).deep.equal(new Vector2D(1, 2)); });
        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => { result = vecA.scaleAbout(new Vector2D(), 2, 2, vecA); });

            it("should place values into vecA", () => { expect(vecA).to.deep.equal(new Vector2D(2, 4)); });
            it("should return vecA", () => { expect(result).to.equal(vecA); });
        });

        describe("without output vector", () => {
            beforeEach(() => { result = vecA.scaleAbout(new Vector2D(), 2, 2); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should return a new vector", () => {
                expect(result).to.deep.equal(new Vector2D(2, 4));
            });
        });
    });

    describe("scaleAndAdd", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => { result = vecA.scaleAndAdd(vecB, 0.5, out); });

            it("should place values into out", () => {
                expect(out).to.deep.equal(new Vector2D(2.5, 4));
            });
            it("should return out", () => { expect(result).to.equal(out); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => { result = vecA.scaleAndAdd(vecB, 0.5, vecA); });

            it("should place values into vecA", () => {
                expect(vecA).to.deep.equal(new Vector2D(2.5, 4));
            });
            it("should return vecA", () => { expect(result).to.equal(vecA); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        });

        describe("when vecB is the output vector", () => {
            beforeEach(() => { result = vecA.scaleAndAdd(vecB, 0.5, vecB); });

            it("should place values into vecB", () => {
                expect(vecB).to.deep.equal(new Vector2D(2.5, 4));
            });
            it("should return vecB", () => { expect(result).to.equal(vecB); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
        });

        describe("without output vector", () => {
            beforeEach(() => { result = vecA.scaleAndAdd(vecB, 0.5); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
            it("should return a new vector", () => {
                expect(result).to.deep.equal(new Vector2D(2.5, 4));
            });
        });
    });

    describe("distanceTo", () => {
        let dis: number;
        beforeEach(() => { dis = vecA.distanceTo(vecB); });
        it("should return the distance", () => { expect(dis).to.closeTo(2.828427, EPSILON); });
    });

    describe("squaredDistanceTo", () => {
        let dis: number;
        beforeEach(() => { dis = vecA.squaredDistanceTo(vecB); });
        it("should return the squared distance", () => { expect(dis).to.equal(8); });
    });

    describe("negate", () => {
        let x: number, y: number;
        beforeEach(() => {
            x = - vecA.x;
            y = - vecA.y;
            vecA.negate();
        })

        it("should negate x", () => {
            expect(vecA.x).to.equal(x);
        });
        it("should negate y", () => {
            expect(vecA.y).to.equal(y);
        })
    })

    describe("normalize", () => {
        beforeEach(() => {
            vecA = new Vector2D(5, 0);
            vecB = new Vector2D(0, 5);
            vecA.normalize();
            vecB.normalize();
        })
        it("should normalize vectorA", () => {
            expect(vecA).deep.equal(new Vector2D(1, 0));
        })

        it("should normalize vectorB", () => {
            expect(vecB).deep.equal(new Vector2D(0, 1));
        })

    })

    describe("dot", () => {
        let dotResult: number;
        beforeEach(() => {
            dotResult = vecA.dot(vecB);
        });
        it("should return the dot product", () => {
            expect(dotResult).to.equal(11);
        });
        it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
        it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
    });


    describe("cross", () => {
        let crossResult: number;
        beforeEach(() => {
            crossResult = vecA.cross(vecB);
        });
        it("should return the cross product", () => {
            expect(crossResult).to.equal(vecA.x * vecB.y - vecA.y * vecB.x);
        });
        it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
        it("should not modify vecB", () => { expect(vecB).to.deep.equal(new Vector2D(3, 4)); });
        it("should < 0 , because vecA on the left size of vecB", () => {
            expect(crossResult).to.lessThan(0);
        })
    });

    describe("leftHandNormal", () => {

        describe("with out", () => {
            beforeEach(() => {
                result = vecA.leftHandNormal(out);
            });
            it("should return left normal", () => {
                expect(out).deep.equal(new Vector2D(-2, 1));
            });
            it("should return out", () => {
                expect(result).equal(out);
            });
            it("should not modify vecA", () => {
                expect(vecA).to.deep.equal(new Vector2D(1, 2));
            });
        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vecA.leftHandNormal(vecA);
            });
            it("should return left normal", () => {
                expect(result).deep.equal(new Vector2D(-2, 1));
            });
            it("should return vecA", () => {
                expect(result).equal(vecA);
            });
        });

        describe("without out", () => {
            beforeEach(() => {
                result = vecB.leftHandNormal();
            });
            it("should return left normal", () => {
                expect(result).deep.equal(new Vector2D(-4, 3));
            });
            it("should not modify vecB", () => {
                expect(vecB).to.deep.equal(new Vector2D(3, 4));
            });
        });

    });


    describe("rightHandNormal", () => {

        describe("with out", () => {
            beforeEach(() => {
                result = vecA.rightHandNormal(out);
            });
            it("should return right normal", () => {
                expect(out).deep.equal(new Vector2D(2, -1));
            });
            it("should return out", () => {
                expect(result).equal(out);
            });
            it("should not modify vecA", () => {
                expect(vecA).to.deep.equal(new Vector2D(1, 2));
            });
        });

        describe("when vecA is out vector", () => {
            beforeEach(() => {
                result = vecA.rightHandNormal(vecA);
            });
            it("should return right normal", () => {
                expect(result).deep.equal(new Vector2D(2, -1));
            });
            it("should return vecA", () => {
                expect(result).equal(vecA);
            });
        });

        describe("without out", () => {
            beforeEach(() => {
                result = vecB.rightHandNormal();
            });
            it("should return right normal", () => {
                expect(result).deep.equal(new Vector2D(4, -3));
            });
            it("should not modify vecB", () => {
                expect(vecB).to.deep.equal(new Vector2D(3, 4));
            });
        });

    });


    describe("fromPolar", () => {
        let result2: Vector2D;
        beforeEach(() => {
            result = vecA.fromPolar(10, Math.PI / 6); // 30 degrees
            result2 = vecB.fromPolar(10, 0);
        });
        it("should return the vector form", () => {
            expect(result.x).to.closeTo(10 * Math.cos(Math.PI / 6), EPSILON);
            expect(result.y).to.closeTo(10 * Math.sin(Math.PI / 6), EPSILON);
            expect(result2.x).to.closeTo(10, EPSILON);
            expect(result2.y).to.closeTo(0, EPSILON);
        });

        it("should return vecA", () => {
            expect(result).equal(vecA);
        });
    });


    describe("toPolar", () => {
        let polar: { len: number, radians: number };
        describe("without out object", () => {
            beforeEach(() => {
                vecA = new Vector2D(8.660254, 5);
                polar = vecA.toPolar();
            });
            it("should return the polar form", () => {
                expect(polar).property("len").to.closeTo(10, EPSILON);
                expect(polar).property("radians").to.closeTo(Math.PI / 6, EPSILON);
                expect(vecA).to.deep.equal(new Vector2D(8.660254, 5));
            });
        });
        describe("with out object", () => {
            let outObj: { len: number, radians: number } = { len: 0, radians: 0 };
            beforeEach(() => {
                vecA = new Vector2D(8.660254, 5);
                polar = vecA.toPolar(outObj);
            });
            it("should return the polar form", () => {
                expect(outObj).property("len").to.closeTo(10, EPSILON);
                expect(outObj).property("radians").to.closeTo(Math.PI / 6, EPSILON);
                expect(polar).equal(outObj);
            });
        });

    });

    describe("clampMax", () => {
        beforeEach(() => {
            vecA = new Vector2D(100, 0);
            vecB = new Vector2D(0, 200);
            vecA.clampMax(5);
            vecB.clampMax(300);
        });

        it("should return clamped vector ", () => {
            expect(vecA).deep.equal(new Vector2D(5, 0));
            expect(vecA.length).equal(5);
            expect(vecB.length).equal(200);
        });
    });

    describe("rotate", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                vecA = new Vector2D(10, 0);
                result = vecA.rotate(Math.PI / 2, out);
            });

            it("should place values into out", () => {
                expect(out).have.property("x").closeTo(0, EPSILON);
                expect(out).have.property("y").closeTo(10, EPSILON);
            });
            it("should return out", () => { expect(result).to.equal(out); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(10, 0)); });
        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                vecA = new Vector2D(10, 0);
                result = vecA.rotate(Math.PI / 2, vecA);
            });

            it("should place values into vecA", () => {
                expect(result).have.property("x").closeTo(0, EPSILON);
                expect(result).have.property("y").closeTo(10, EPSILON);
            });
            it("should return vecA", () => { expect(result).to.equal(vecA); });
        });

        describe("without output vector", () => {
            beforeEach(() => {
                result = vecA.rotate(Math.PI / 2);
            });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should return a new vector", () => {
                expect(result).have.property("x").closeTo(new Vector2D(1, 2).leftHandNormal().x, EPSILON);
                expect(result).have.property("y").closeTo(new Vector2D(1, 2).leftHandNormal().y, EPSILON);
            });
        });

    });

    describe("rotateAbout", () => {
        describe("without out vector", () => {
            beforeEach(() => {
                out = vecA.rotateAbout(Math.PI / 3, new Vector2D());
            });
            it("should equal to rotate method", () => {
                expect(out).deep.equal(new Vector2D(1, 2).rotate(Math.PI / 3));
            });
            it("should not modify vecA", () => {
                expect(vecA).deep.equal(new Vector2D(1, 2));
            });

        });
        describe("with a separate out vector", () => {
            beforeEach(() => {
                result = vecA.rotateAbout(2.5, new Vector2D(), out);
            });
            it("should equal to rotate method", () => {
                expect(out).deep.equal(new Vector2D(1, 2).rotate(2.5));
            });
            it("should not modify vecA", () => {
                expect(vecA).deep.equal(new Vector2D(1, 2));
            });
            it("should return out", () => {
                expect(result).equal(out);
            });
        });
        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vecA.rotateAbout(2.5, new Vector2D(), vecA);
            });
            it("should equal to rotate method", () => {
                expect(result).deep.equal(new Vector2D(1, 2).rotate(2.5));
            });
            it("should return vecA", () => {
                expect(result).equal(vecA);
            });
        });
    });

    describe("rotateByVector", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                vecA = new Vector2D(10, 0);
                result = vecA.rotateByVector(new Vector2D(0, 1), out);
            });

            it("should place values into out", () => {
                expect(out).have.property("x").closeTo(0, EPSILON);
                expect(out).have.property("y").closeTo(10, EPSILON);
            });
            it("should return out", () => { expect(result).to.equal(out); });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(10, 0)); });
        });

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                vecA = new Vector2D(10, 0);
                result = vecA.rotateByVector(new Vector2D(0, 1), vecA);
            });

            it("should place values into vecA", () => {
                expect(result).have.property("x").closeTo(0, EPSILON);
                expect(result).have.property("y").closeTo(10, EPSILON);
            });
            it("should return vecA", () => { expect(result).to.equal(vecA); });
        });

        describe("without output vector", () => {
            beforeEach(() => {
                result = vecA.rotateByVector(new Vector2D(0, 1));
            });
            it("should not modify vecA", () => { expect(vecA).to.deep.equal(new Vector2D(1, 2)); });
            it("should return a new vector", () => {
                expect(result).have.property("x").closeTo(new Vector2D(1, 2).leftHandNormal().x, EPSILON);
                expect(result).have.property("y").closeTo(new Vector2D(1, 2).leftHandNormal().y, EPSILON);
            });
        });

    });

    describe("getProjV", () => {
        describe("with a separate out vector", () => {
            beforeEach(() => {
                result = vecA.getProjV(new Vector2D(100, 0), out);
            });
            it("should return project vector", () => {
                expect(result).to.deep.equal(new Vector2D(1, 0));
                expect(result).to.equal(out);
                expect(vecA).to.deep.equal(new Vector2D(1, 2));
            });
        });
        describe("with vecA as out vector", () => {
            beforeEach(() => {
                result = vecA.getProjV(new Vector2D(100, 0), vecA);
            });
            it("should return project vector", () => {
                expect(result).to.deep.equal(new Vector2D(1, 0));
                expect(result).to.equal(vecA);
            });
        });
        describe("without out vector", () => {
            beforeEach(() => {
                result = vecA.getProjV(new Vector2D(100, 0));
            });
            it("should return project vector", () => {
                expect(result).to.deep.equal(new Vector2D(1, 0));
                expect(vecA).to.deep.equal(new Vector2D(1, 2));
            });
        });

    });

    describe("getPerpV", () => {
        describe("with a separate out vector", () => {
            beforeEach(() => {
                result = vecA.getPerpV(new Vector2D(100, 0), out);
            });
            it("should return project vector", () => {
                expect(result).to.deep.equal(new Vector2D(0, 2));
                expect(result).to.equal(out);
                expect(vecA).to.deep.equal(new Vector2D(1, 2));
            });
        });
        describe("with vecA as out vector", () => {
            beforeEach(() => {
                result = vecA.getPerpV(new Vector2D(100, 0), vecA);
            });
            it("should return project vector", () => {
                expect(result).to.deep.equal(new Vector2D(0, 2));
                expect(result).to.equal(vecA);
            });
        });
        describe("without out vector", () => {
            beforeEach(() => {
                result = vecA.getPerpV(new Vector2D(100, 0));
            });
            it("should return project vector", () => {
                expect(result).to.deep.equal(new Vector2D(0, 2));
                expect(vecA).to.deep.equal(new Vector2D(1, 2));
            });
        });

    });

    describe("getProjV && getPerpV", () => {
        beforeEach(() => {
            result = vecA.getProjV(vecB).add(vecA.getPerpV(vecB, out), out);
        });
        it("should return vecA", () => {
            expect(result).to.deep.equal(vecA);
            expect(result).to.equal(out);
        });
    });

    describe("reflect", () => {
        describe("with a separate out vector", () => {
            beforeEach(() => {
                result = vecA.reflect(new Vector2D(0, 1), out);
            });
            it("should get reflect vector", () => {
                expect(result).to.deep.equal(new Vector2D(1, -2));
                expect(result).to.equal(out);
            });
        });
        describe("without out vector", () => {
            beforeEach(() => {
                vecA = new Vector2D(1, -2);
                result = vecA.reflect(new Vector2D(0, 1));
            });
            it("should get reflect vector", () => {
                expect(result).to.deep.equal(new Vector2D(1, 2));
                expect(vecA).to.deep.equal(new Vector2D(1, -2));
            });
        });

        describe("with vecA as output vector", () => {
            beforeEach(() => {
                vecA = new Vector2D(1, -2);
                result = vecA.reflect(new Vector2D(0, 1), vecA);
            });
            it("should get reflect vector", () => {
                expect(result).to.deep.equal(new Vector2D(1, 2));
                expect(vecA).to.equal(result);
            });
        });
    });

    describe("copyFrom", () => {
        beforeEach(() => {
            result = vecA.copyFrom(vecB);
        });
        it("should copy values from vecB", () => {
            expect(vecA).to.deep.equal(vecB);
        });

        it("should return vecA", () => {
            expect(result).to.equal(vecA);
        });
    });

    describe("copyTo", () => {
        beforeEach(() => { vecB.copyTo(out); });
        it("should place values into out", () => {
            expect(out).to.deep.equal(vecB);
        });
        it("should not be vecB", () => {
            expect(out).to.not.equal(vecB);
        });
    });

    describe("reset", () => {
        it("should reset x y components to the values passed", () => {
            result = vecB.reset(1, 2);
            expect(result).to.deep.equal(new Vector2D(1, 2));
        });
        it("should reset x y both to 0", () => {
            result = vecB.reset();
            expect(result).to.deep.equal(new Vector2D());
        });
    });

    describe("clone", () => {
        it("should return a 2 element array initialized to the values in vecA", () => {
            expect(vecA.clone()).to.deep.equal(vecA);
        });
        it("should not return vecA", () => {
            expect(vecA.clone()).to.not.equal(vecA);
        });
    });

    describe("toString", () => {
        beforeEach(() => { result = vecA.add(vecB); });
        it("should return a string representation of the vector", () => { expect(result.toString()).to.equal("[Vector2D] (x:4 ,y:6)"); });
    });

});
