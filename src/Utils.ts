import { Matrix2D } from './Matrix2D';

let temp9Float: Float32Array = new Float32Array(9);
export function uploadMatrix2D(gl: WebGLRenderingContext, uniformLocation: WebGLUniformLocation, matrix: Matrix2D) {
    matrix.toArray(true, temp9Float);
    gl.uniformMatrix3fv(uniformLocation, false, temp9Float);
}


/**
 *  弧度值转角度值乘以此参数 
 * 
 * @static
 * @type {Number}
 */
export let RAD_2_DEG: number = 180 / Math.PI;

/**
 * 角度值转弧度值乘以此参数
 * 
 * @type {Number}
 */
export let DEG_2_RAD: number = Math.PI / 180;

/**
 * 产生一个最小值与最大值之间的随机数
 * 
 * @static
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function rndMinMax(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

/**
 * 产生一个最小值与最大值之间的随机整数
 * 
 * @static
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function rndMinMaxInt(min: number, max: number): number {
    return Math.round(min + Math.random() * (max - min));
}

/**
 * 产生一个0~1之间的随机数
 * 
 * @static
 * @returns {number}
 */
export function rnd0_1(): number {
    return Math.random();
}

/**
 *  产生一个-1 ~ 1之间的随机数 
 * 
 * @static
 * @returns {number}
 */
export function rndMinus1_1(): number {
    return Math.random() - Math.random();
}

/**
 * 
 * 
 * @export
 * @param {number} t
 * @returns {number}
 */
export function sin0_1(t: number): number {
    return 0.5 + Math.sin(t) * 0.5;
}


