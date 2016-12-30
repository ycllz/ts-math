import { Matrix2D } from './Matrix2D';
export declare function uploadMatrix2D(gl: WebGLRenderingContext, uniformLocation: WebGLUniformLocation, matrix: Matrix2D): void;
/**
 *  弧度值转角度值乘以此参数
 *
 * @static
 * @type {Number}
 */
export declare let RAD_2_DEG: number;
/**
 * 角度值转弧度值乘以此参数
 *
 * @type {Number}
 */
export declare let DEG_2_RAD: number;
/**
 * 产生一个最小值与最大值之间的随机数
 *
 * @static
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export declare function rndMinMax(min: number, max: number): number;
/**
 * 产生一个最小值与最大值之间的随机整数
 *
 * @static
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export declare function rndMinMaxInt(min: number, max: number): number;
/**
 * 产生一个0~1之间的随机数
 *
 * @static
 * @returns {number}
 */
export declare function rnd0_1(): number;
/**
 *  产生一个-1 ~ 1之间的随机数
 *
 * @static
 * @returns {number}
 */
export declare function rndMinus1_1(): number;
/**
 *
 *
 * @export
 * @param {number} t
 * @returns {number}
 */
export declare function sin0_1(t: number): number;
