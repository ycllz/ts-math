"use strict";
var temp9Float = new Float32Array(9);
function uploadMatrix2D(gl, uniformLocation, matrix) {
    matrix.toArray(true, temp9Float);
    gl.uniformMatrix3fv(uniformLocation, false, temp9Float);
}
exports.uploadMatrix2D = uploadMatrix2D;
/**
 *  弧度值转角度值乘以此参数
 *
 * @static
 * @type {Number}
 */
exports.RAD_2_DEG = 180 / Math.PI;
/**
 * 角度值转弧度值乘以此参数
 *
 * @type {Number}
 */
exports.DEG_2_RAD = Math.PI / 180;
/**
 * 产生一个最小值与最大值之间的随机数
 *
 * @static
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function rndMinMax(min, max) {
    return min + Math.random() * (max - min);
}
exports.rndMinMax = rndMinMax;
/**
 * 产生一个最小值与最大值之间的随机整数
 *
 * @static
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function rndMinMaxInt(min, max) {
    return Math.round(min + Math.random() * (max - min));
}
exports.rndMinMaxInt = rndMinMaxInt;
/**
 * 产生一个0~1之间的随机数
 *
 * @static
 * @returns {number}
 */
function rnd0_1() {
    return Math.random();
}
exports.rnd0_1 = rnd0_1;
/**
 *  产生一个-1 ~ 1之间的随机数
 *
 * @static
 * @returns {number}
 */
function rndMinus1_1() {
    return Math.random() - Math.random();
}
exports.rndMinus1_1 = rndMinus1_1;
/**
 *
 *
 * @export
 * @param {number} t
 * @returns {number}
 */
function sin0_1(t) {
    return 0.5 + Math.sin(t) * 0.5;
}
exports.sin0_1 = sin0_1;
//# sourceMappingURL=Utils.js.map